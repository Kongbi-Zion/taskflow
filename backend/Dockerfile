# Dockerfile for Express.js

FROM --platform=linux/amd64 node:20

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./

RUN npm install

RUN npm install typescript

# Copy the rest of your Express.js API code
COPY . .

# Build the
RUN npm run build


# Expose the port the Express.js server will run on
EXPOSE 5000

# Start the Express.js server
CMD ["node", "server.js"]
