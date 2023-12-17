FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 5041

ENV ASPNETCORE_URLS=http://+:5041

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
ARG configuration=Release
WORKDIR /src

COPY ../*.sln .
COPY ../Melodiy.Api/*.csproj ./Melodiy.Api/
COPY ../Melodiy.Application/*.csproj ./Melodiy.Application/
COPY ../Melodiy.Contracts/*.csproj ./Melodiy.Contracts/
COPY ../Melodiy.Domain/*.csproj ./Melodiy.Domain/
COPY ../Melodiy.Infrastructure/*.csproj ./Melodiy.Infrastructure/

WORKDIR /src/Melodiy.Api/
RUN dotnet restore "Melodiy.Api.csproj"

WORKDIR /src/
COPY ../Melodiy.Api ./Melodiy.Api/
COPY ../Melodiy.Application/. ./Melodiy.Application/
COPY ../Melodiy.Contracts/. ./Melodiy.Contracts/
COPY ../Melodiy.Domain/. ./Melodiy.Domain/
COPY ../Melodiy.Infrastructure/. ./Melodiy.Infrastructure/

WORKDIR /src/Melodiy.Api/.
RUN dotnet build "Melodiy.Api.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "Melodiy.Api.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Melodiy.Api.dll"]
