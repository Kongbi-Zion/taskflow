# Use Node.js official image
FROM --platform=linux/amd64 node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies, including devDependencies
RUN npm install --include=dev

# Copy the entire project
COPY . .

# Run TypeScript build
RUN npm run build

# Expose the port
EXPOSE 5000

# Start the server from the compiled dist folder
CMD ["node", "server.js"]
