FROM node:10

WORKDIR /home/app

ADD package*.json /home/app/
RUN npm install
ADD . /home/app/

RUN npm install

CMD ["npm", "start"]

EXPOSE 8081
