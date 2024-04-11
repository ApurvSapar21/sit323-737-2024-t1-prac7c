# Use an official Node.js runtime as the base image
FROM node:14

# Create and set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install npm dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV PORT=3000

# Expose the port on which the app will run
EXPOSE 3000

# Specify the command to run when the container starts
CMD ["node", "app.js"]
