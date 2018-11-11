FROM node:8.12.0-jessie
ADD . /var/code/
WORKDIR /var/code/
RUN npm install
ENTRYPOINT ["node", "index.js"]
