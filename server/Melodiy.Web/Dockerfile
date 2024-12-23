# Use the official .NET Core SDK as a parent image
FROM node:22-alpine as development
RUN addgroup --system web && \
          adduser --system -G web web
RUN apk add --no-cache bash && npm install -g pnpm

WORKDIR /app

# # Copy the root workspace files for dependency installation
# COPY ./client/pnpm-workspace.yaml ./pnpm-workspace.yaml
# COPY ./client/package.json ./package.json
# COPY ./client/pnpm-lock.yaml ./pnpm-lock.yaml

# Copy the entire monorepo for the build
COPY ./client ./

# debugging
# RUN ls -al /app

# Install all dependencies
RUN pnpm install

# Build the frontend app
RUN pnpm --filter router build && pnpm --filter web build

FROM nginx:alpine as production
WORKDIR /app
ENV HOST=0.0.0.0
ENV PORT=4200

RUN addgroup --system web && \
          adduser --system -G web web

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS base
WORKDIR /app
EXPOSE 5129

ENV ASPNETCORE_URLS=http://+:5129

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG configuration=Release
WORKDIR /src

COPY ./server/*.sln .
COPY ./server/Melodiy.Features/*.csproj ./Melodiy.Features/
COPY ./server/Melodiy.Infrastructure/*.csproj ./Melodiy.Infrastructure/
COPY ./server/Melodiy.Integrations/*.csproj ./Melodiy.Integrations/
COPY ./server/Melodiy.Web/*.csproj ./Melodiy.Web/
COPY --from=development /app/apps/web/dist/ ./Melodiy.Web/wwwroot/


WORKDIR /src/Melodiy.Web/
RUN dotnet restore "Melodiy.Web.csproj"

WORKDIR /src/
COPY ./server/Melodiy.Web/. ./Melodiy.Web/
COPY ./server/Melodiy.Features ./Melodiy.Features/
COPY ./server/Melodiy.Infrastructure/. ./Melodiy.Infrastructure/
COPY ./server/Melodiy.Integrations/. ./Melodiy.Integrations/

WORKDIR /src/Melodiy.Web/.
RUN dotnet build "Melodiy.Web.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "Melodiy.Web.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Melodiy.Web.dll"]