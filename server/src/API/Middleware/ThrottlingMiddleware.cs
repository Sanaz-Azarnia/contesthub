using System.Collections.Concurrent;
using Microsoft.Extensions.Options;

namespace API.Middleware;

public class ThrottlingMiddleware(RequestDelegate next, IOptions<ThrottlingOptions> options)
{
    private static readonly ConcurrentDictionary<string, RequestLog> _clients = new();
    private readonly int _requestLimit = options.Value.RequestLimit;
    private readonly TimeSpan _timeWindow = TimeSpan.FromSeconds(options.Value.TimeWindowSeconds);

    public async Task InvokeAsync(HttpContext context)
    {
        var clientId = $"{context.Connection.RemoteIpAddress}:{context.Request.Headers.UserAgent.GetHashCode()}";
        var log = _clients.GetOrAdd(clientId, _ => new RequestLog());

        lock (log)
        {
            log.Requests.RemoveAll(r => DateTime.UtcNow - r > _timeWindow);
            if (log.Requests.Count >= _requestLimit)
            {
                context.Response.StatusCode = StatusCodes.Status429TooManyRequests;
                return;
            }
            log.Requests.Add(DateTime.UtcNow);
        }
        await next(context);
    }
}
public class RequestLog 
{ 
    public List<DateTime> Requests { get; set; } = new(); 
}
public class ThrottlingOptions 
{ 
    public int RequestLimit { get; set; } = 100; 
    public int TimeWindowSeconds { get; set; } = 60; 
}