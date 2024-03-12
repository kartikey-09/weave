# Use an official Node.js runtime as a base image
FROM node:20.11.0

# Set the working directory in the container
WORKDIR /app/server

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the backend application code to the container
COPY . .

# Expose the port on which your backend server is running
EXPOSE 9000

# Define the command to start your backend server
CMD ["npm", "start"]
