FROM node:18-alpine
WORKDIR /app
COPY react-app/package.json react-app/package-lock.json* ./
RUN npm install --legacy-peer-deps


COPY react-app/. .

EXPOSE 3000
CMD ["npm", "start"]