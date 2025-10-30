# -------- BUILD STAGE --------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy everything
COPY . .

# Restore and publish
RUN dotnet restore "WebApplication1.csproj"
RUN dotnet publish "WebApplication1.csproj" -c Release -o /app/publish

# -------- RUNTIME STAGE --------
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy published files from the build stage
COPY --from=build /app/publish .

# Expose port 8080 (Render will map this automatically)
EXPOSE 8080

# Start the app
ENTRYPOINT ["dotnet", "WebApplication1.dll"]
