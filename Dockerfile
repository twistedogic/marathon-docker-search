FROM google/nodejs:latest

WORKDIR /app
ADD package.json /app/
RUN npm install
ADD . /app

ENTRYPOINT ["/nodejs/bin/node", "app.js"]
