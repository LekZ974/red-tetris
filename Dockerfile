FROM node:9

RUN mkdir /.npm /.config /.yarn  /.cache && chmod o+w -R /.npm /.config /.yarn  /.cache

WORKDIR /app

EXPOSE 3004 8080
