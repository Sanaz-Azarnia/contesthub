using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Features.Question.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Question.Queries.GetQuestions;

public class GetQuestionsQueryHandler : IRequestHandler<GetQuestionsQuery, PagedResult<QuestionDto>>
{
    private readonly IApplicationDbContext _context;
    public GetQuestionsQueryHandler(IApplicationDbContext context) => _context = context;

    public async Task<PagedResult<QuestionDto>> Handle(GetQuestionsQuery request, CancellationToken cancellationToken)
    {
        var filter = request.Filter;
        var page = filter.Page < 1 ? 1 : filter.Page;
        var pageSize = filter.PageSize < 1 ? 20 : filter.PageSize;

        var query = _context.Questions.AsNoTracking().AsQueryable();

        // ✅ به جای ILike، از ToLower() استفاده می‌کنیم
        // این روش در تمام دیتابیس‌ها کار می‌کند
        if (!string.IsNullOrWhiteSpace(filter.Category))
            query = query.Where(q => q.Category.ToLower() == filter.Category.ToLower());

        if (!string.IsNullOrWhiteSpace(filter.Difficulty))
            query = query.Where(q => q.Difficulty.ToLower() == filter.Difficulty.ToLower());

        if (!string.IsNullOrWhiteSpace(filter.Type))
            query = query.Where(q => q.Type == filter.Type);

        // ✅ جستجو هم با ToLower()
        if (!string.IsNullOrWhiteSpace(filter.Search))
            query = query.Where(q => q.QuestionText.ToLower().Contains(filter.Search.ToLower()));

        var totalCount = await query.CountAsync(cancellationToken);

        var rawItems = await query
            .OrderBy(q => q.Id)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        var items = rawItems.Select(q => new QuestionDto
        {
            Id = q.Id,
            Category = q.Category,
            Difficulty = q.Difficulty,
            Type = q.Type,
            QuestionText = q.QuestionText,
            Options = ShuffleOptions(q.IncorrectAnswers.ToList(), q.CorrectAnswer)
        }).ToList();

        return new PagedResult<QuestionDto>
        {
            Items = items,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        };
    }

    private static List<string> ShuffleOptions(List<string> incorrectAnswers, string correctAnswer)
    {
        var options = new List<string>(incorrectAnswers);
        if (!string.IsNullOrEmpty(correctAnswer))
            options.Add(correctAnswer);

        var rng = new Random();
        int n = options.Count;
        while (n > 1)
        {
            n--;
            int k = rng.Next(n + 1);
            (options[k], options[n]) = (options[n], options[k]);
        }
        return options;
    }
}