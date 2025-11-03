using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using SwoledBrosBE.Models;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add controllers
builder.Services.AddControllers();

//  Use connection string from appsettings.json directly
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new InvalidOperationException("DefaultConnection not found in appsettings.json.");
}

//  Configure DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString, o =>
        o.EnableRetryOnFailure(3, TimeSpan.FromSeconds(5), null))
);

//  Configure CORS (for React frontend)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

//  Bind Render-assigned port (Render sets PORT=8080 by default)
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
app.Urls.Add($"http://0.0.0.0:{port}");

// Enable Swagger in both Dev and Production
if (app.Environment.IsDevelopment() || app.Environment.EnvironmentName == "Production")
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Middleware setup
app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

//Add DB connection test endpoint
app.MapGet("/debug/db", async (AppDbContext db) =>
{
    try
    {
        var canConnect = await db.Database.CanConnectAsync();
        return Results.Ok(canConnect ? "DB Connection Successful " : "DB Connection Failed ");
    }
    catch (Exception ex)
    {
        return Results.Problem($"DB Error: {ex.Message}");
    }
});

// Test database connection during startup
try
{
    using (var scope = app.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        db.Database.CanConnect();
        Console.WriteLine("Connected to PostgreSQL successfully!");
    }
}
catch (Exception ex)
{
    Console.WriteLine("Database connection failed: " + ex.Message);
}

//  Run the app
app.Run();
