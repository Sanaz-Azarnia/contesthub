using Application.Features.Gameplay.Commands.SubmitAnswer;
using Application.Features.Gameplay.Queries.GetGameplayQuestions;
using Application.Features.Gameplay.DTOs;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class GameplayController : ControllerBase
{
    private readonly IMediator _mediator;
    public GameplayController(IMediator mediator) => _mediator = mediator;

    [HttpGet("questions")]
    public async Task<IActionResult> GetQuestions([FromQuery] string? category, [FromQuery] string? difficulty, [FromQuery] int count = 10)
    {
        var query = new GetGameplayQuestionsQuery(category, difficulty, count);
        return Ok(await _mediator.Send(query));
    }

    [HttpPost("submit")]
    public async Task<IActionResult> SubmitAnswer([FromBody] SubmitAnswerDto dto)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
        var command = new SubmitAnswerCommand(userId, dto.QuestionId, dto.SelectedAnswer, dto.TimeTaken);
        return Ok(await _mediator.Send(command));
    }
}