# Use an image that contains node and npm
FROM node:12-alpine

# Install browserify globally
RUN npm install browserify -g

# Install git 
RUN apk --no-cache add git

# Create the node_modules folder
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Set the working directory
WORKDIR /home/node/app

# Copy the package.json files so that we can do npm intall later
COPY package*.json ./

# Create a user
USER node

# Install dependencies for the project
RUN npm install

# Copy application
COPY --chown=node:node . .

# Used when outside of docker compose

# # Set the enviromental variables
# ENV PORT=??
# ENV DBPORT=??
# ENV DBHOST=??

# # Expose the port that serves the application
# EXPOSE ${PORT}

# # Start the server
# CMD ["npm, "start"]
