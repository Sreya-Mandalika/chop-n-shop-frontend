# Build Stage
FROM node:16-alpine AS builder

# Set working directory
WORKDIR /chop-n-shop-frontend

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend files
COPY . .

# Build the application
RUN npm run build

# Runtime Stage
FROM nginx:alpine

# Copy built files from builder
COPY --from=builder /chop-n-shop-frontend/build /usr/share/nginx/html

# Set default PORT if not provided
ENV PORT 8080  

# Configure NGINX to read PORT from environment variable
RUN printf 'server {\n\
    listen 8080;\n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        index index.html;\n\
        try_files $uri /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
