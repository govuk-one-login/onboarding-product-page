# checkov:skip=CKV_DOCKER_7: Ensure the base image uses a non latest version tag
# checkov:skip=CKV_DOCKER_2: Ensure that HEALTHCHECK instructions have been added to container images
# checkov:skip=CKV_DOCKER_3: Ensure that a user for the container has been created
# Use an official Node.js runtime as a parent image
FROM amazonlinux:latest

ARG WORKDIR=/app
ARG USER=testrunner

# Set the working directory in the container
WORKDIR /app

COPY ../. /

# Install packages
RUN yum update && yum install -y \
    awscli shadow-utils \
    java-17-amazon-corretto-devel \
    gcc-c++ \
    make \
    nodejs

RUN curl -sL https://rpm.nodesource.com/setup_lts.x | bash -

# Install project dependencies
ENV PUPPETEER_SKIP_DOWNLOAD true
RUN npm ci && npm run build

RUN chmod 005 /run-tests.sh

ENV WORKDIR $WORKDIR
ENTRYPOINT ["/run-tests.sh"]
