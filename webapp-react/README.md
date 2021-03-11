## The webapp
In this case we are using React for the webapp. Lets create the app in the directory webapp with the following command (make sure you have npm installed in your system):
```
npx create-react-app webapp
```
At this point we can already run the app with:
```
cd webapp
npm start
```
The app will launch and it will be listening in port 3000. At this point this app is a Hello World app in React.

Lets make some modifications to the app, we will create an app that asks the name and email to the user and send it to an api rest. The webapp will list all the register users in the site.

```
npm install react-bootstrap bootstrap
```

Basically the app should be able to get the name and email of a user, send it to the api, and then refresh the list of the users from the api. You can check the relevant code in the components [EmailForm.js](webapp/src/components/EmailForm.js) and [UserList.js](webapp/src/components/UserList.js). The [App.js](webapp/src/App.js) component acts as the coordinator for the other components. Obviously there are other more advanced alternatives, for instance using [React Redux](https://react-redux.js.org/).

### The documentation
The idea here is to have the documentation along with the webapp in /docs. We are going to use [AsciiDoc](https://asciidoc.org/) and [PlantUML](https://plantuml.com). The template for the docs will live in webapp/docs. Lets install the required software to generate the htmls from these asciidoc files:

```
apt-get install ruby openjdk-8-jre
gem install asciidoctor asciidoctor-diagram
npm install shx --save-dev
```
After installing these tools we can generate the documentation. Note that we have added a new line in package.json in order to be able to run:
```
npm run docs
```
The documentation will be generated under the `build` directory. When we use docker, we are going to configure it so the doc is generated inside the container and deployed with the webapp.

### Testing the webapp

#### Unit tests
Basically these tests make sure that each component work isolated. It is important to check that they render properly. These tests are done using jest and you can execute them with `npm run test`. A code coverage analysis is generated every time we run the tests. If properly configured, this can be exploited by tools like [CodeCov](https://about.codecov.io/) to create reports of code coverage (check the bag in the radarin_0 repository).

### Docker image for the web app
The `Dockerfile` for the webapp is pretty simple. Just copy the app, install the dependencies, build the production version an then run a basic webserver to launch it. 

In order to run the app, we need a server. npm start is not good for production so we are going to use [Express](https://expressjs.com/es/). Check [server.js](webapp/server.js) in the webapp to understand the configuration. As we will run it in port 3000 (in localhost), we have to bind this port with the port in our local machine.

<mark>Note: You can see that in some places of the application the running port is configured as `var port =  process.env.PORT || 3000`. This is necessary for deploying the app to services like Heroku. Heroku do not let us choose in which port our application is going to run so we have to get it using the `PORT` environment variable.</mark>

<mark>Important: As you can see, this docker image takes a long time to build. The problem is installing all the software for building the doc inside the docker image. This obviously is not a good solution as this should be a production image. I leave for future work changing this for avoiding generating the doc inside the production docker image.</mark>

## Launching everything at the same time (docker-compose)
All the containers will be launched in order using docker compose. Check the file [docker-compose.yaml](docker-compose.yaml) to see the definition of the containers and their launch process. Here are the commands to launch the system and to turn it down:
```
docker-compose up
```
```
docker-compose down
```
<mark>Note: if you change something in the code you should rebuild the images using the `--build` flag</mark>

## Continous integration
In this step we are going to setup GitHub Actions in order to have CI in our system. The idea is that, every time we make a push to master, build the system (restapi and webapp), run the tests, and if everything is ok, build the docker images and upload them to Heroku to have our application deployed.

The workflow for this is in [radarin.yml](.github/workflow/radarin.yml). In this file you can see that there are two jobs, one for the restapi, one for the webapp. Jobs are executed in pararel so this will speed up our build.

So, the first to jobs in this file build the webapp and the restapi (in pararel). If everything goes well, check the e2e tests (later in this document) and if these acceptance tests pass ok, start deployment. For that we are going to use [Heroku](heroku.com). Heroku allows as to deploy docker containers. For the database we are going to use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) which will provide a free mongodb database in the cloud that will be enough for our application.
One important thing here is that we need to change the connection string to the database depending if we are running our application (locally, launching it with npm start or with docker-compose, it doesn't matter). For that we are going to use one environment variable in Heroku. In our code (check both server.js files), if we find this variable we will connect to MongoDB Atlas, if not, we are connecting to our local MongoDB.
In Heroku we need to create two apps, one for the restapi the other for the webapp. Each job is deploying one part of our project. 
Also it is important to know that Heroku doesn't allow us to chose the port of our application. For that we have to use the environment variable `PORT` in both the webapp and the restapi.
Another important point is the api end point. In react it will be hardcoded compiled in the application, so we need to configure this in the Dockerfile, prior to building the app. Using arguments we can differentiate when we are deploying locally with docker-compose or when we are doing it with github actions, so we can use the local restapi or the one deployed in Heroku.

## E2E testing
Integration tests is maybe the most difficult part to integratein our system. We have to test the system as a whole. The idea here is to deploy the system and make the tests using [jest-puppeteer](https://github.com/smooth-code/jest-puppeteer) (browser automatization) and [jest-cucumber](https://www.npmjs.com/package/jest-cucumber) (user stories). We will also be using [expect-puppeteer](https://www.npmjs.com/package/expect-puppeteer) to make easier the test writing. All the structure needed is under the `webapp/e2e` directory. This tests can be run locally using `npm run test:e2e` and they will be run also in GitHub Actions, just after the unitary tests. Let me explain each part, and how the pieces work together:
 - `features`. This directory is for writing the user stories, using Gherkin.
 - `steps`. Each feature is divided in parts. Here we implement the steps to complete each part in the test. We have to iterate with the browser so we will have to find elements by id, fill elements in forms, click buttons, etc.
 - `custom-environment.js`. Launchs the browsers (by default chromium). We can choose if we want it to be headless (good for github actions) or with graphical interface, to see what is actually happening. Just change the `headless` parameter.
 - `global-setup.js`. Defines how to launch our system. In our case we need, the database, the restapi and the webapp.
 - `global-teardown.js`. Clean resources once tests finish.
 - `jest-config.js`. This file links everything. Is the entry point for jest to load the e2e tests.
 - `start-db.js`. Launchs the in-memory database. Uses a script from the restapi directory. It is used by `global-setup.js`.
 - `start-restapi.js`. Launchs the rest api. Uses a script from the restapi directory. It is used by `global-setup.js`.

## Load testing (Gatling)
This part will be carried out using [Gatling](https://gatling.io/). Gatling will simulate load in our system making petitions to the webapp.

In order to use Gatling for doing the load tests in our application we need to [download](https://gatling.io/open-source/start-testing/) it. Basically, the program has two parts, a [recorder](https://gatling.io/docs/current/http/recorder) to capture the actions that we want to test and a program to run this actions and get the results. Gatling will take care of capture all the response times in our requests and presenting them in quite useful graphics for its posterior analysis.

Once we have downloaded Gatling we need to start the [recorder](https://gatling.io/docs/current/http/recorder). This works as a proxy that intercepts all the actions that we make in our browser. That means that we have to configure our browser to use a proxy. We have to follow this steps:

1. Configure the recorder in **HTTP proxy mode**.
2. Configure the **HTTPs mode** to Certificate Authority.
3. Generate a **CA certificate** and key. For this, press the Generate CA button. You will have to choose a folder to generate the certificates. Two pem files will be generated.
4. Configure Firefox to use this **CA certificate** (Preferences>Certificates, import the generated certificate).
5. Configure Firefox to use a **proxy** (Preferences>Network configuration). The proxy will be localhost:8000.
6. Configure Firefox so it uses this proxy even if the call is to a local address. In order to do this, we need to set the property `network.proxy.allow_hijacking_localhost` to `true` in `about:config`. 

Once we have the recorder configured, and the application running (in Heroku for instance), we can start recording our first test. We must specify a package and class name. This is just for test organization. Package will be a folder and Class name the name of the test. In my case I have used `GetUsersList` without package name. After pressing start the recorder will start capturing our actions in the browser. So here you should perform all the the actions that you want to record. In my case I just browsed to the Heroku deployed webapp. Once we stop recording the simulation will be stored under the `user-files/simulations` directory, written in [Scala](https://www.scala-lang.org/) language. I have copied the generated file under `webapp/loadtestexample` just in case you want to see how a test file in gatling looks like.

We can modify our load test for instance to inject 20 users at the same time:
```
setUp(scn.inject(atOnceUsers(20))).protocols(httpProtocol)
```
changing it in the scala file.
In order to execute the test we have to execute:
```
gatling.sh -s GetUsersExample
```

In the console, we will get an overview of the results and in the results directory we will have the full report in web format.

It is important to note that we could also dockerize this load tests using this [image](https://hub.docker.com/r/denvazh/gatling). It is just a matter of telling the docker file where your gatling configuration and scala files are and the image will do the rest.