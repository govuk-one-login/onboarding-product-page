# Use a slim lts-supported version.
FROM node:24.0.1-alpine3.20@sha256:3b48d62b0e3a6c31784bafefc95baedf56987c6ee8ba891c924a529e5301fe1c AS production

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
