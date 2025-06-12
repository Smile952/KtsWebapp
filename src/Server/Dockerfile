FROM mcr.microsoft.com/dotnet/sdk:latest AS build
WORKDIR /App

COPY build .

EXPOSE 8080

ENTRYPOINT ["dotnet", "Interface.dll"]
