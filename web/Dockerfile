# Use an official Node.js runtime as a parent image
FROM node:20-bullseye

USER root

RUN apt update
RUN apt install sudo
RUN npm install -g pnpm

CMD ["sleep", "infinity"]