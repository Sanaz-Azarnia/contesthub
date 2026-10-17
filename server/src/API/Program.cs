using Application;
using Application.Common.Interfaces;
using Infrastructure;
using Infrastructure.Persistence;
using API.Middleware;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.EntityFrameworkCore;

 
Env.Load();

var builder = WebApplication.CreateBuilder(args);

 
builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddEnvironmentVariables();

 
builder.Services.AddApplication();        
builder.Services.AddInfrastructure(builder.Configuration);

 
var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY") 
    ?? builder.Configuration["Jwt:Key"];

if (string.IsNullOrEmpty(jwtKey))
{
    throw new InvalidOperationException(
        "JWT_KEY not found. Please set it in .env file. " +
        "Minimum 32 characters required.");
}

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER") 
                ?? builder.Configuration["Jwt:Issuer"] 
                ?? "ContestPlatform",
            ValidAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") 
                ?? builder.Configuration["Jwt:Audience"] 
                ?? "ContestPlatformUsers",
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey))
        };
    });

// ===== 4. API & Cross-Cutting =====
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHttpContextAccessor();

// Throttling
builder.Services.Configure<ThrottlingOptions>(options =>
{
    options.RequestLimit = 100;
    options.TimeWindowSeconds = 60;
});

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
         policy.WithOrigins(
            "http://localhost:3000",    
            "http://yourdomain.com",     
            "https://yourdomain.com"    
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// Authorization Policies
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Admin", policy => policy.RequireRole("Admin"));
});

var app = builder.Build();

// ===== 5. Database Migration & Seed =====
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var configuration = scope.ServiceProvider.GetRequiredService<IConfiguration>();
    
    await dbContext.Database.MigrateAsync();
    await SeedData.InitializeAsync(dbContext, configuration);
}

// ===== 6. Middleware Pipeline =====
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseMiddleware<ThrottlingMiddleware>();
app.UseHttpsRedirection();
app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();