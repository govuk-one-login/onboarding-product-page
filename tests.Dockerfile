# checkov:skip=CKV_DOCKER_7: Ensure the base image uses a non latest version tag
# checkov:skip=CKV_DOCKER_2: Ensure that HEALTHCHECK instructions have been added to container images
# checkov:skip=CKV_DOCKER_3: Ensure that a user for the container has been created
# Use an official Node.js runtime as a parent image
#FROM amazoncorretto:17
FROM amazonlinux:latest

ARG WORKDIR=/app
ARG USER=testrunner

# Set the working directory in the container
WORKDIR /app

COPY . /

# Install packages
RUN yum install -y awscli shadow-utils

RUN yum install -y java-17-amazon-corretto-devel

RUN yum install -y gcc-c++ make
RUN curl -sL https://rpm.nodesource.com/setup_lts.x | bash -
RUN yum install -y nodejs
RUN npm install yarn -g
RUN npm install mocha -g

# Install project dependencies
ENV PUPPETEER_SKIP_DOWNLOAD true
RUN npm install && npm run build

RUN pwd
RUN ls
RUN chmod 005 /run-tests.sh

ENV WORKDIR $WORKDIR
ENTRYPOINT ["/run-tests.sh"]

