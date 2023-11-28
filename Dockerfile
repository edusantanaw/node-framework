FROM node:18-alpine
WORKDIR ./
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 3000
CMD [ "yarn", "start" ]