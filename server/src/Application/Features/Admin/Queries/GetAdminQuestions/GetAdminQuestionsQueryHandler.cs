using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Features.Admin.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Admin.Queries.GetAdminQuestions;

public class GetAdminQuestionsQueryHandler : IRequestHandler<GetAdminQuestionsQuery, PagedResult<AdminQuestionDto>>
{
    private readonly IApplicationDbContext _context;
    public GetAdminQuestionsQueryHandler(IApplicationDbContext context) => _context = context;

    public async Task<PagedResult<AdminQuestionDto>> Handle(GetAdminQuestionsQuery req, CancellationToken ct)
    {
        var query = _context.Questions.AsNoTracking();
        var total = await query.CountAsync(ct);
        
        var rawItems = await query.OrderBy(q => q.Id)
            .Skip((req.Page - 1) * req.PageSize)
            .Take(req.PageSize)
            .ToListAsync(ct);
            
        var items = rawItems.Select(q => new AdminQuestionDto(
            q.Id, q.Category, q.Difficulty, q.Type, 
            q.QuestionText, q.CorrectAnswer, q.IncorrectAnswers.ToList()
        )).ToList();
        
         
        return new PagedResult<AdminQuestionDto>
        {
            Items = items,
            TotalCount = total,
            Page = req.Page,
            PageSize = req.PageSize
        };
    }
}