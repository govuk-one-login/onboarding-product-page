FROM node:current-alpine

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
CMD STUB_API=${STUB_API:-false} npm start
#CMD [ "npm", "run", "local" ]
HEALTHCHECK CMD wget --spider http://localhost:$PORT
