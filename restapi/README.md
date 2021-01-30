## The rest api
The objective for this part is to make a rest API using Express, Node.js and MongoDB as the database (Mongose for accessing it). We will implement only two functions, one push petition, for registering a new user and a get petition, to list all the users in the system. The webservice will be deployed using docker.

Lets start creating the directory `restapi` and installing the tools to make a nodejs webservice there:
```
mkdir restapi
cd restapi
npm init -y
npm install express mongoose
```
Now lets run the database. Note that for the volume, docker only accepts **absolute paths**.
```
mkdir data
docker run -d -p 27017:27017 -v `pwd`/data:/data/db mongo
```
The code is quite straight forward, the [server.js](restapi/server.js) file launchs the api and connects to the mongo database using mongoose. The [api.js](restapi/api.js) is actually the api, where you will see there two api entry points, one post for creating a new user, and one get to list all the users. The [users.js](restapi/models/users.js) defines the schema of our mongo database.

### Testing the rest api
In this part we will use an in-memory mongodb database, very suitable for testing. Also we need something for making the api requests, in this case we are using [Supertest](https://www.npmjs.com/package/supertest).
```
npm install --save-dev jest mongodb-memory-server
npm install supertest --save-dev
```
<mark>Note: These dependencies are save only for dev mode, we do not need them for production.</mark>
The idea is to use Jest (as in the webapp) as the main testing framework. We are going to use it to launch our in-memory database and run the tests against the api. For making the get or post petitions we are going to use supertest. The [server-for-tests.js](restapi/tests/server-for-tests.js) has the in-memory mongo db server launch and shutdown commands. The [api.test.js](restapi/tests/api.test.js), has the implementation of the tests.

After configuring the tests in the `package.json` we can run them using `npm run test`

### Docker image for the rest api
In this case the web service depends on the mongo database. What we are going to do is create a Dockerfile that will be responsible for loading the ws and then, a general docker-compose that will load everything in order (database, webservice, webapp, and also the monitoring software).

Check the `docker-compose.yaml` to understand how each service is created and loaded.

<mark>With the current configuration is not possible to run each container alone (it also does not make sense, as all the parts are dependent). When we execute everything with docker-compose, a network between containers is created and we can access one from another using the container name. This is how the restapi connects with the mongo server for instance.</mark>

## Monitoring (Prometheus and Grafana)
In this step we are going use [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/) to monitor the restapi. First step is modifying the restapi launch to capture profiling data. In nodejs this is very easy. First install the required packages:

```
npm install prom-client express-prom-bundle
```

Then, modify the `restapi/server.js` in order to capture the profiling data adding:
```
const metricsMiddleware = promBundle({includeMethod: true});
app.use(metricsMiddleware);
```
Now when we launch the api, in [http://localhost:5000/metrics](http://localhost:5000/metrics) we have a metrics endpoint from which get the profiling data. The idea here is to have another piece of software running (called [Prometheus](https://prometheus.io/)) that will get this data, let say, every five seconds. Then, another software called [Grafana](https://grafana.com/) will display this using beautiful charts.

For running Prometheus and Grafana we can use several docker images. Check `docker-compose.yaml` to see how these images are launched. 

<mark>Note: in the `prometheus.yml` we are telling prometheus where is our restapi metrics end point. In Grafana `datasources/datasource.yml` we are telling where to find prometheus data.</mark>

<mark>In both configuration files we need to stablish the uris of restapi metrics and the prometheus datasource. Right now they are configured to work using docker-compose network. If you want to use these individual docker commands, you need to change these uris to point to localhost</mark>

Once launched all the system is launched (see the Quick Start Guide), we can simulate a few petitions to our webservice:

```
sudo apt-get install apache2-utils
ab -m GET -n 10000 -c 100 http://localhost:5000/api/users/list
```
In the Grafana dashboard we can see how the number of petitions increases dramatically after the call.

A good reference with good explanations about monitoring in nodejs can be found [here](https://github.com/coder-society/nodejs-application-monitoring-with-prometheus-and-grafana).