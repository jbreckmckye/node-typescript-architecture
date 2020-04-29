FROM      node:10
WORKDIR   /app

COPY      src ./src
COPY      package.json .
COPY      yarn.lock .
RUN       yarn

CMD       yarn run ts-node src/apps/webapp/hello.ts
