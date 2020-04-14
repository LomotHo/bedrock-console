##################  build vue  #########################
FROM node:12-buster-slim as builder

ENV VUE_HOME="/vue"
COPY ./vue $VUE_HOME
WORKDIR $VUE_HOME
RUN npm install
RUN npm run build


##################  build image  #######################
FROM node:12-buster-slim as production

ENV NODE_ENV=production \
  SERVER_PATH="/server" \
  PUBLIC_PATH="/server/vue-dist"

WORKDIR $SERVER_PATH

RUN apt-get update && \
 apt-get -y install libcurl4 && \
 apt-get -y autoremove && \
 apt-get clean

# install npm package
COPY package*.json $SERVER_PATH/
RUN npm install --only=production

# copy server file
COPY ./ $SERVER_PATH/
COPY --from=builder /vue-dist $PUBLIC_PATH

EXPOSE 3000
# RUN 
CMD ["node","app.js"]
