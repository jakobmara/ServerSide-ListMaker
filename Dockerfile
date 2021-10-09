FROM node:14.15.3

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production 

COPY . .

EXPOSE 3000

CMD ["node", "./build/bundle.js"]