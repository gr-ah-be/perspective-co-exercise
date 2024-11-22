# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project into the working directory
COPY . .

# Expose the application port
EXPOSE 3111

# Define the default command to start the application
CMD ["npm", "start"]
