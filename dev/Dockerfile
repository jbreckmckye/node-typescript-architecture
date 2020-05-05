FROM      node:10
WORKDIR   /app

COPY      src ./src
COPY      package.json yarn.lock tsconfig.json ./
RUN       yarn

CMD       yarn run ts-node -r tsconfig-paths/register src/apps/webapp/index.ts
