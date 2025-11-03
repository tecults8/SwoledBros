using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using SwoledBrosBE.Models;

var builder = WebApplication.CreateBuilder(args);

// -------------------- SERVICES --------------------
builder.Services.AddControllers();

// Get connection string from environment or appsettings.json
var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection")
                       ?? builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new InvalidOperationException("Database connection string not set in environment.");
}

// Register PostgreSQL with retry policy
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString, o => o.EnableRetryOnFailure(3, TimeSpan.FromSeconds(5), null)));

// Enable CORS for frontend (React, etc.)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Swagger setup
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// -------------------- APP CONFIGURATION --------------------

// Configure correct Render port
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
app.Urls.Clear(); // Ensure no other bindings (e.g. :10000)
app.Urls.Add($"http://0.0.0.0:{port}");
Console.WriteLine($" Running on port {port}");

// Enable Swagger in Development and Production
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

// -------------------- DEBUG ENDPOINT --------------------
app.MapGet("/debug/db", async (AppDbContext db) =>
{
    try
    {
        var canConnect = await db.Database.CanConnectAsync();
        return Results.Ok(canConnect ? "DB Connection Successful" : " DB Connection Failed");
    }
    catch (Exception ex)
    {
        return Results.Problem($" DB Error: {ex.Message}");
    }
});

// -------------------- DB TEST CONNECTION --------------------
try
{
    using (var scope = app.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        if (db.Database.CanConnect())
            Console.WriteLine(" Connected to PostgreSQL successfully!");
        else
            Console.WriteLine(" Failed to connect to PostgreSQL.");
    }
}
catch (Exception ex)
{
    Console.WriteLine(" Database connection failed: " + ex.Message);
}

app.Run();
