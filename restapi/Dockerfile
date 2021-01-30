FROM node:12.14.1

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

#In this case, the mongodb in memory dependency is quite heavy so we avoid it for the docker image
RUN npm install --production

#By default this is the address of the mongo container. If we are deploying to heroku we will get
#a mongo_uri here direct from github secrets (check .github/worflow/radarin.yml)
ARG MONGO_URI="mongodb://mongoserver:27017/api"
ENV MONGO_URI=$MONGO_URI

# Bundle app source
COPY server.js api.js ./
ADD models ./models

CMD [ "node", "server.js" ]