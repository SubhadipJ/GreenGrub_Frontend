FROM node:18-alpine as angular

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

FROM httpd:alpine3.15

# Copy Angular build
COPY --from=angular /app/dist/green-grub-ui/ /usr/local/apache2/htdocs/

# Add Angular SPA routing config (no override of httpd.conf)
COPY ./angular.conf /usr/local/apache2/conf.d/angular.conf

EXPOSE 80
CMD ["httpd", "-D", "FOREGROUND"]
