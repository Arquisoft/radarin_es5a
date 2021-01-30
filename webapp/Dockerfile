FROM node:12.14.1
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install --production
#Create an enviroment variable to set where the api is (check src/api/api.js). 
#When we deploy to heroku this will take a different value. Check .github/workflows/radarin.yml
ARG API_URI="http://localhost:5000/api"
ENV REACT_APP_API_URI=$API_URI
#Create an optimized version of the webapp
RUN npm run build
#Install software neccesary for generating the doc
RUN apt-get update && apt-get -y install ruby openjdk-8-jre
RUN gem install asciidoctor asciidoctor-diagram
RUN npm install shx --save-dev
#Generate the doc
RUN npm run docs
CMD [ "node", "server.js" ]