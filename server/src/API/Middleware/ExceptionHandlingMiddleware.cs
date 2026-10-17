using Application.Common.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging; 
using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;  
namespace API.Middleware;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(
        RequestDelegate next,
        ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred");
            await HandleExceptionAsync(context, ex);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";

        var (statusCode, response) = exception switch
        {
            ValidationException validationEx => (
                (int)HttpStatusCode.BadRequest,
                (object)new  
                {
                    type = "https://tools.ietf.org/html/rfc7231#section-6.5.1",
                    title = "One or more validation errors occurred.",
                    status = 400,
                    errors = validationEx.Errors
                }),
                
            UserAlreadyExistsException => (
                (int)HttpStatusCode.Conflict,
                (object)new { message = exception.Message }),  

            InvalidCredentialsException => (
                (int)HttpStatusCode.Unauthorized,
                (object)new { message = exception.Message }),  

            ExternalAuthException => (
                (int)HttpStatusCode.BadRequest,
                (object)new { message = exception.Message }),  

            NotFoundException notFoundEx => (
                (int)HttpStatusCode.NotFound,
                (object)new { message = notFoundEx.Message }),  

            _ => (
                (int)HttpStatusCode.InternalServerError,
                (object)new { message = "An internal server error occurred." })  
        };

        context.Response.StatusCode = statusCode;
        await context.Response.WriteAsync(JsonSerializer.Serialize(response));
    }
}