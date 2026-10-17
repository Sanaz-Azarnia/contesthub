using Application.Features.UserDashboard.Queries.GetProfile;
using Application.Features.UserDashboard.Queries.GetStats;
using Application.Features.UserDashboard.Queries.GetContestHistory;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers;

[ApiController]
[Route("api/user")]
[Authorize]
public class UserDashboardController(IMediator mediator) : ControllerBase
{
    private int GetUserId() => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

    [HttpGet("profile")] 
    public async Task<IActionResult> GetProfile() 
        => Ok(await mediator.Send(new GetProfileQuery(GetUserId())));
        
    [HttpGet("stats")] 
    public async Task<IActionResult> GetStats() 
        => Ok(await mediator.Send(new GetStatsQuery(GetUserId())));
        
    [HttpGet("contests")] 
    public async Task<IActionResult> GetContestHistory() 
        => Ok(await mediator.Send(new GetContestHistoryQuery(GetUserId())));
}