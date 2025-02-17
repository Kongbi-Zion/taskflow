# Dockerfile for Next.js

# Use an official Node.js image as the base image
FROM --platform=linux/amd64 node:20

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Next.js app for production
RUN npm run build

# Expose port 3000 for the Next.js server
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]
