#打包系统镜像

FROM registry.ekuaibao.com/tmc/node:server

MAINTAINER chronosW

VOLUME /JDM

WORKDIR /JDM

COPY ./dist/ /JDM/

EXPOSE 8400

CMD s -port 8400 -domain jdmanagement
