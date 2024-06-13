# Use an lts-supported version similar to the application image.
# checkov:skip=CKV_DOCKER_2: Ensure that HEALTHCHECK instructions have been added to container images
FROM node:slim as test

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /app

ARG BUILD_DEPS="\
    curl \
    unzip \
    openjdk-17-jre"
RUN apt-get update \
    && apt-get install -y --no-install-recommends --no-upgrade $BUILD_DEPS \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && java -version

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && rm -f awscliv2.zip \
    && ./aws/install --bin-dir /usr/local/bin --install-dir /usr/local/aws-cli --update \
    && aws --version

# Install test dependencies
COPY package.json .
RUN npm install

COPY --chmod=005 run-tests.sh /run-tests.sh

# Copy the test runner code, see tests.Dockerfile.dockerignore for exclusions
COPY --chown=node:node . .

USER node
ENTRYPOINT ["/run-tests.sh"]
