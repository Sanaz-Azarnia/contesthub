using Application.Features.Leaderboard.Queries.GetLeaderboard;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LeaderboardController : ControllerBase
{
    private readonly IMediator _mediator;
    public LeaderboardController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> GetLeaderboard([FromQuery] string? category, [FromQuery] string? period)
    {
        return Ok(await _mediator.Send(new GetLeaderboardQuery(category, period)));
    }
}