# Use an image that contains node and npm
FROM node:10-alpine

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

# Install browserify globally
RUN sudo npm install browserify -g

ENV PORT=8080
ENV DBPORT=8112
ENV DBHOST=83.212.77.11


# Copy application
COPY --chown=node:node . .

# Expose the port that serves the application
EXPOSE ${PORT}

# Start the server
CMD ["npm, "start"]
