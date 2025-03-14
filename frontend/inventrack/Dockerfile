FROM node:latest AS builder
WORKDIR /app

# Check if group exists, if not, create it
RUN getent group app || groupadd app

# Create user "user" and add to existing or newly created "app" group
RUN useradd -m -g app user && chown -R user:app /app
USER user

COPY --chown=user:app package*.json .

RUN npm -v
RUN npm install
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
COPY --chown=user:app . .
RUN npm run build

FROM nginx:latest
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
