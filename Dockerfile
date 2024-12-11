# Use a slim lts-supported version.
FROM node:23.4.0-alpine3.20@sha256:7bcf3a9f2f894ff2a9f699f93a969a58a0f26ad9471e40080d77ca76cd5cfe7e AS production

# Expose any necessary ports (if your application requires it)
ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT

# Set the working directory in the container
WORKDIR /app

# Copy the application code, see .dockerignore for exclusions
COPY . .

# Install project dependencies
RUN npm install && npm run build

# Add the Dynatrace OneAgent
COPY --from=khw46367.live.dynatrace.com/linux/oneagent-codemodules-musl:nodejs / /
ENV LD_PRELOAD=/opt/dynatrace/oneagent/agent/lib64/liboneagentproc.so

USER node
CMD npm start

HEALTHCHECK CMD wget --spider http://localhost:$PORT
