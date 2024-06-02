# Use the official .NET Core SDK as a parent image
FROM node:20-alpine as development
RUN addgroup --system web && \
          adduser --system -G web web
WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .
RUN npx nx build web

FROM nginx:alpine as production
WORKDIR /app
ENV HOST=0.0.0.0
ENV PORT=4200

RUN addgroup --system web && \
          adduser --system -G web web

# COPY ../../dist/apps/web web/
# COPY ../../dist/apps/web /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=development /app/dist/apps/web /usr/share/nginx/html

RUN chown -R web:web .

# You can remove this install step if you build with `--bundle` option.
# The bundled output will include external dependencies.
# RUN npm --prefix web --omit=dev -f install

EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS base
WORKDIR /app
EXPOSE 5129

ENV ASPNETCORE_URLS=http://+:5129

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG configuration=Release
WORKDIR /src

COPY ../*.sln .
COPY ../Melodiy.Features/*.csproj ./Melodiy.Features/
COPY ../Melodiy.Infrastructure/*.csproj ./Melodiy.Infrastructure/
COPY ../Melodiy.Integrations/*.csproj ./Melodiy.Integrations/
COPY ../Melodiy.Web/*.csproj ./Melodiy.Web/

WORKDIR /src/Melodiy.Web/
RUN dotnet restore "Melodiy.Web.csproj"

WORKDIR /src/
COPY ../Melodiy.Web/. ./Melodiy.Web/
COPY ../Melodiy.Features ./Melodiy.Features/
COPY ../Melodiy.Infrastructure/. ./Melodiy.Infrastructure/
COPY ../Melodiy.Integrations/. ./Melodiy.Integrations/

WORKDIR /src/Melodiy.Web/.
RUN dotnet build "Melodiy.Web.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "Melodiy.Web.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Melodiy.Web.dll"]