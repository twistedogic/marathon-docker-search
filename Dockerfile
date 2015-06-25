FROM google/nodejs:latest

WORKDIR /app
ONBUILD ADD package.json /app/
ONBUILD RUN npm install
ONBUILD ADD . /app

ENTRYPOINT ["/nodejs/bin/node", "app,js]