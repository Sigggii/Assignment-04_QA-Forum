# Use a multi-stage build for efficiency
FROM node:22-alpine AS builder

WORKDIR /tmp/

# Coping Frontend to tmp directory
COPY frontend/ . frontend/

# Install dependencies for frontend
WORKDIR /tmp/frontend
RUN npm install

# Build frontend
RUN npm install @angular/cli -g
RUN ng build


WORKDIR /usr/src/app
# Copy backend
COPY backend/ .

# Install dependencies for backend
RUN npm install
# Build Backend
RUN npm run build
# Copy static frontent to public folder in backend
RUN mkdir -p ./dist/src/public
RUN cp -a /tmp/frontend/dist/frontend/browser/. ./dist/src/public/
RUN ls -la ./dist/src/public



# Define ENV Variables
ENV ADDRESS=0.0.0.0
ENV PORT=8080
ENV NODE_ENV=production

# Start application \
CMD ["npm", "run", "start-prod"]



