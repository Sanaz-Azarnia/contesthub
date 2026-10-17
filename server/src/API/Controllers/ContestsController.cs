using Application.Features.Admin.Queries.GetContests;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContestsController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetContests(
        [FromQuery] string? category, 
        [FromQuery] int page = 1, 
        [FromQuery] int pageSize = 10)
    {
        var query = new GetContestsQuery(category, page, pageSize);
        return Ok(await mediator.Send(query));
    }
}