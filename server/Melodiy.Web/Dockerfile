# Use the official .NET Core SDK as a parent image
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