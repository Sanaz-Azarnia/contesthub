using Application.Features.Admin.DTOs;
using Application.Features.Admin.Commands.CreateUser;
using Application.Features.Admin.Commands.UpdateUser;
using Application.Features.Admin.Commands.DeleteUser;
using Application.Features.Admin.Commands.CreateQuestion;
using Application.Features.Admin.Commands.UpdateQuestion;
using Application.Features.Admin.Commands.DeleteQuestion;
using Application.Features.Admin.Commands.CreateContest;
using Application.Features.Admin.Commands.UpdateContest;
using Application.Features.Admin.Commands.DeleteContest;
using Application.Features.Admin.Queries.GetUsers;
using Application.Features.Admin.Queries.GetAdminQuestions;
using Application.Features.Admin.Queries.GetContests;
using Application.Features.Admin.Queries.GetStats;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/admin")]
[Authorize(Policy = "Admin")]
public class AdminController(IMediator mediator) : ControllerBase
{
    // --- Users ---
    [HttpGet("users")] 
    public async Task<IActionResult> GetUsers() => Ok(await mediator.Send(new GetUsersQuery()));
    
    [HttpPost("users")] 
    public async Task<IActionResult> CreateUser([FromBody] AdminCreateUserDto dto) => Ok(await mediator.Send(new CreateUserCommand(dto)));
    
    [HttpPut("users/{id}")] 
    public async Task<IActionResult> UpdateUser(int id, [FromBody] AdminUpdateUserDto dto) => Ok(await mediator.Send(new UpdateUserCommand(id, dto)));
    
    [HttpDelete("users/{id}")] 
    public async Task<IActionResult> DeleteUser(int id) => Ok(await mediator.Send(new DeleteUserCommand(id)));

    // --- Questions ---
    [HttpGet("questions")] 
    public async Task<IActionResult> GetQuestions([FromQuery] int page = 1, [FromQuery] int pageSize = 50) 
        => Ok(await mediator.Send(new GetAdminQuestionsQuery(page, pageSize)));
        
    [HttpPost("questions")] 
    public async Task<IActionResult> CreateQuestion([FromBody] AdminCreateQuestionDto dto) 
        => Ok(await mediator.Send(new CreateQuestionCommand(dto)));
        
    [HttpPut("questions/{id}")] 
    public async Task<IActionResult> UpdateQuestion(int id, [FromBody] AdminUpdateQuestionDto dto) 
        => Ok(await mediator.Send(new UpdateQuestionCommand(id, dto)));
        
    [HttpDelete("questions/{id}")] 
    public async Task<IActionResult> DeleteQuestion(int id) 
        => Ok(await mediator.Send(new DeleteQuestionCommand(id)));

    // --- Contests ---
    [HttpGet("contests")] 
    public async Task<IActionResult> GetContests() => Ok(await mediator.Send(new GetContestsQuery()));
    
    [HttpPost("contests")] 
    public async Task<IActionResult> CreateContest([FromBody] AdminCreateContestDto dto) 
        => Ok(await mediator.Send(new CreateContestCommand(dto)));
        
    [HttpPut("contests/{id}")] 
    public async Task<IActionResult> UpdateContest(int id, [FromBody] AdminUpdateContestDto dto) 
        => Ok(await mediator.Send(new UpdateContestCommand(id, dto)));
        
    [HttpDelete("contests/{id}")] 
    public async Task<IActionResult> DeleteContest(int id) 
        => Ok(await mediator.Send(new DeleteContestCommand(id)));

    // --- Stats ---
    [HttpGet("stats")] 
    public async Task<IActionResult> GetStats() => Ok(await mediator.Send(new GetStatsQuery()));
}