# checkov:skip=CKV_DOCKER_7: Ensure the base image uses a non latest version tag
# checkov:skip=CKV_DOCKER_2: Ensure that HEALTHCHECK instructions have been added to container images
# checkov:skip=CKV_DOCKER_3: Ensure that a user for the container has been created
# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Expose any necessary ports (if your application requires it)
ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT

# Set the working directory in the container
WORKDIR /app

# Copy the application code, see .dockerignore for exclusions
COPY . .
COPY run-tests.sh ./

# Copy the .env.example file to .env @TODO questionable at best
#COPY .env.example .env

# Install packages
RUN apk upgrade && apk update; apk add --no-cache aws-cli bash
RUN aws --version


# Install project dependencies
ENV PUPPETEER_SKIP_DOWNLOAD true
RUN apk upgrade && apk add --no-cache chromium
RUN npm install && npm run build

USER $USER
ENV WORKDIR $WORKDIR
ENTRYPOINT ["/run-tests.sh"]
