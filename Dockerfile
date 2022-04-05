FROM node

WORKDIR /home
 
ADD . .


RUN ["npm", "install"]

ENTRYPOINT ["npm", "start"]