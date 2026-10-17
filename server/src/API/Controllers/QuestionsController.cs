using Application.Features.Question.DTOs;
using Application.Features.Question.Queries.GetCategories;
using Application.Features.Question.Queries.GetCategoriesWithCount;
using Application.Features.Question.Queries.GetDifficulties;
using Application.Features.Question.Queries.GetQuestions;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuestionsController : ControllerBase
{
    private readonly IMediator _mediator;
    public QuestionsController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> GetQuestions([FromQuery] QuestionFilterDto filter)
    {
        var result = await _mediator.Send(new GetQuestionsQuery(filter));
        return Ok(result);
    }

    [HttpGet("categories")]
    public async Task<IActionResult> GetCategories()
    {
        var result = await _mediator.Send(new GetCategoriesQuery());
        return Ok(result);
    }

    // ✅ Endpoint جدید برای صفحه Home
    [HttpGet("categories-with-count")]
    public async Task<IActionResult> GetCategoriesWithCount()
    {
        var result = await _mediator.Send(new GetCategoriesWithCountQuery());
        return Ok(result);
    }

    [HttpGet("difficulties")]
    public async Task<IActionResult> GetDifficulties()
    {
        var result = await _mediator.Send(new GetDifficultiesQuery());
        return Ok(result);
    }
}