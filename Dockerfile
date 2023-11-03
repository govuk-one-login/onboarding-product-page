# Use an official Node.js runtime as a parent image
FROM node:latest

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

# Expose any necessary ports (if your application requires it)
# EXPOSE 3000

# Define the command to run your application
CMD [ "npm", "run", "local" ]

