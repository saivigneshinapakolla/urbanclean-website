# Use Node.js LTS version
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy only necessary files
COPY server.js .
COPY script.js .
COPY styles.css .
COPY index.html .
COPY images/logo.png ./images/
COPY images/clean.png ./images/
COPY images/c1.png ./images/

# Expose the port the app runs on
EXPOSE 3016

# Start the application
CMD ["node", "server.js"] 