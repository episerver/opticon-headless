FROM mcr.microsoft.com/dotnet/aspnet:6.0-bullseye-slim AS base
WORKDIR /app
EXPOSE 5000
FROM mcr.microsoft.com/dotnet/sdk:6.0-bullseye-slim AS build
WORKDIR /src

COPY src/backend/Optimizely.Server Optimizely.Server
COPY src/backend/Nuget.config Nuget.config
COPY src/backend/nuget nuget
COPY src/backend/Optimizely.Server.sln Optimizely.Server.sln
RUN dotnet restore "Optimizely.Server/Optimizely.Server.csproj" --configfile Nuget.config
RUN dotnet build "Optimizely.Server/Optimizely.Server.csproj" -c Release -o /app/build --no-restore

FROM build AS publish
RUN dotnet publish "Optimizely.Server/Optimizely.Server.csproj" -c Release -o /app/publish --no-restore

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Optimizely.Server.dll"]


