FROM node:12.14.1

# Create app directory
WORKDIR /restapi

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

#In this case, the mongodb in memory dependency is quite heavy so we avoid it for the docker image
RUN npm install

#By default this is the address of the mongo container. If we are deploying to heroku we will get
#a mongo_uri here direct from github secrets (check .github/worflow/radarin.yml)
ARG FIREBASE_URI="https://radarines5a-3b110-default-rtdb.europe-west1.firebasedatabase.app/"
ENV FIREBASE_URI=$FIREBASE_URI

# Bundle app source
COPY server.js ubicaciones.js ./
#ADD models ./models

CMD [ "npm", "start" ]