FROM node:10.15.3
RUN mkdir /data
WORKDIR /data
RUN \
npm install yarn -g \
yarn global add nrm && \
nrm use taobao