# 1. Start with a lightweight Linux image that has Node.js 18 pre-installed
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /usr/src/app

# 3. Copy ONLY the package files first. This makes future builds much faster.
COPY package*.json ./

# 4. Install the dependencies inside the container
RUN npm install

# 5. Copy the rest of our application code
COPY . .

# 6. Expose the port our app runs on
EXPOSE 3000

# 7. The command to start the app
CMD ["npm", "start"]