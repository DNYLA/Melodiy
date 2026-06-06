# Client
FROM node:22-alpine AS frontend-build
WORKDIR /client

RUN corepack enable

COPY client/ .
RUN pnpm install --frozen-lockfile
RUN pnpm turbo build --filter=@melodiy/web

# Server
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS backend-build
WORKDIR /src

# Copy .csproj first to restore NuGet packages
COPY server/Melodiy.Web/Melodiy.Web.csproj Melodiy.Web/
COPY server/Melodiy.Features/Melodiy.Features.csproj Melodiy.Features/
COPY server/Melodiy.ServiceDefaults/Melodiy.ServiceDefaults.csproj Melodiy.ServiceDefaults/

RUN dotnet restore Melodiy.Web/Melodiy.Web.csproj

COPY server/ .
RUN dotnet publish Melodiy.Web/Melodiy.Web.csproj \
    -c Release \
    -o /app/publish \
    --no-restore \
    --no-self-contained

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app


COPY --from=backend-build /app/publish .
COPY --from=frontend-build /client/apps/web/dist ./wwwroot

USER $APP_UID

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "Melodiy.Web.dll"]