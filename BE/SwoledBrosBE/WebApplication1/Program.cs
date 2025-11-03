using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;

using SwoledBrosBE.Models;

var builder = WebApplication.CreateBuilder(args);

//  Add Controllers
builder.Services.AddControllers();

//  Configure DbContext with PostgreSQL (from environment or appsettings)
var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL")
                       ?? builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new InvalidOperationException("DATABASE_URL or DefaultConnection not set in environment.");
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

//  Configure CORS (Allow Any Origin)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Add Swagger (optional for debugging)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Middleware Pipeline
if (app.Environment.IsDevelopment() || app.Environment.EnvironmentName == "Production")
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseCors("AllowAll");  

app.UseAuthorization();

app.MapControllers();


try
{
    using (var scope = app.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        db.Database.CanConnect();
        Console.WriteLine(" Connected to PostgreSQL successfully!");
    }
}
catch (Exception ex)
{
    Console.WriteLine("Database connection failed: " + ex.Message);
}

app.Run();
