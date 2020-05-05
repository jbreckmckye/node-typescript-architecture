FROM      node:10
WORKDIR   /app

COPY      package.json yarn.lock tsconfig.json ./
RUN       yarn
COPY      src ./src

CMD       yarn run ts-node -r tsconfig-paths/register src/apps/webapp/index.ts
