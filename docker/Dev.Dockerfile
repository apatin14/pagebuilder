# set a image for project
FROM node:15.6.0-alpine

# Set workdir for your app
WORKDIR /usr/src/backend

# in this case, i need install dependencies but you dont need make it for asterisk
RUN npm i --save-dev
RUN npm i @types/node
RUN npm install -g @nestjs/cli nestjs

#ENV PATH "$PATH:${APP_WORKDIR}/node_modules/.bin"

COPY ./entrypoint.sh /usr/local/bin/entrypoint.sh
# Windows host compatibility
RUN dos2unix /usr/local/bin/entrypoint.sh

RUN chmod a+x /usr/local/bin/entrypoint.sh

# set PORT for expose backend
EXPOSE 4001
