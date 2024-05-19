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
# Copy static frontent to public folder in backend
RUN cp -r /tmp/frontend/dist/frontend/browser/ public/

# Define ENV Variables
ENV PORT=8080
ENV NODE_ENV=production
ENV JWT_SECRET="juifhaöqadiowjfknkjduzd)(wr2rud_qw289d)0382dfg2f2032823d"
ENV COOKIE_SECRET="ijfwifioe?=2r2jm_w2830ca()2r2fm20990)=ß02ß32942=)893289r28398"
ENV CORS_ALLOWED_ORIGINS="http://localhost:4200"

# Start application \
CMD ["npm", "run", "start-prod"]

# Expose port
EXPOSE 8080

