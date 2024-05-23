# checkov:skip=CKV_DOCKER_7: Ensure the base image uses a non latest version tag
# checkov:skip=CKV_DOCKER_2: Ensure that HEALTHCHECK instructions have been added to container images
# checkov:skip=CKV_DOCKER_3: Ensure that a user for the container has been created
# Use an official Node.js runtime as a parent image
FROM amazoncorretto:17

# Set the working directory in the container
WORKDIR /app

# Install packages
RUN yum install -y awscli shadow-utils

# set permissions and switch to the 'test' user
COPY ../../run-tests.sh /
RUN chmod 005 /run-tests.sh

USER test
ENV WORKDIR $WORKDIR
ENTRYPOINT ["/run-tests.sh"]
