###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine as development

# Create app directory
WORKDIR /app

# Add node_modules/.bin to PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Install react-scripts package globally
RUN npm install react-scripts@5.0.1 -g

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package*.json /app/

RUN npm ci
COPY . /app
RUN npm run build

###################
# PRODUCTION
###################

FROM nginx:1.25.1-alpine as production
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]