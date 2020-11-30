# Base image
FROM node:14.14.0-alpine
# Inside the container start from this folder or working directory
WORKDIR "/app"
# Copy package json folder to working directory
COPY ./package.json ./
RUN npm install
# Copy everything else
COPY . .
# Run following command  CMD sets default command 
CMD ["npm", "run", "start"]