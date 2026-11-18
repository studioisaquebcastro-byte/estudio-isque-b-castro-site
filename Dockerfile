# Static site served by nginx on port 8080. Build: docker build -t estudio-ibc .   Run: docker run -p 8080:8080 estudio-ibc
FROM nginx:1.27-alpine
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/site.conf
COPY index.html config.js favicon.svg favicon-32.png apple-touch-icon.png robots.txt sitemap.xml site.webmanifest /usr/share/nginx/html/
COPY css    /usr/share/nginx/html/css
COPY js     /usr/share/nginx/html/js
COPY vendor /usr/share/nginx/html/vendor
COPY assets /usr/share/nginx/html/assets
EXPOSE 8080
