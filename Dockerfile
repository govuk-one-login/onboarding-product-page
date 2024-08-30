# Use a slim lts-supported version.
FROM node:21.7.3-alpine3.20@sha256:78c45726ea205bbe2f23889470f03b46ac988d14b6d813d095e2e9909f586f93 AS production

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
