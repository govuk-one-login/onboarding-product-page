# Use a slim lts-supported version.
FROM node:20.18.0-alpine3.20@sha256:c13b26e7e602ef2f1074aef304ce6e9b7dd284c419b35d89fcf3cc8e44a8def9 AS production

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
