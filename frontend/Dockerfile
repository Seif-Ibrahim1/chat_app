# Use an official Node runtime as a base image
FROM node:20.11.1-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining application code to the working directory
COPY . .

# Build the production-ready React app
RUN npm run build

# Expose port 5173
EXPOSE 5173

# Command to run the application on port 5173
CMD ["npm", "run", "dev", "--port", "5173"]
