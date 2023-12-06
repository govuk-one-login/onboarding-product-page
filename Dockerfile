# checkov:skip=CKV_DOCKER_7: Ensure the base image uses a non latest version tag
# checkov:skip=CKV_DOCKER_2: Ensure that HEALTHCHECK instructions have been added to container images
# checkov:skip=CKV_DOCKER_3: Ensure that a user for the container has been created
# Use an official Node.js runtime as a parent image
FROM node:latest

ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY *.json ./

# Install project dependencies
ENV PUPPETEER_SKIP_DOWNLOAD true
RUN apt-get update && apt-get install -y chromium
RUN npm install

# Copy the .env.example file to .env
COPY .env.example .env

# Copy the rest of your application code to the container
COPY . .

USER node

# Define the command to run your application
CMD [ "npm", "run", "local" ]
HEALTHCHECK CMD wget --spider http://localhost:$PORT
