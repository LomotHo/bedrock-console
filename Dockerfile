FROM node:dubnium-buster-slim

ENV NODE_ENV=production \
  SERVER_PATH="/server" 

WORKDIR $SERVER_PATH

COPY package*.json ./
RUN npm install --only=production

COPY ./ $SERVER_PATH

EXPOSE 3000
# RUN 
CMD ["node","app.js"]
