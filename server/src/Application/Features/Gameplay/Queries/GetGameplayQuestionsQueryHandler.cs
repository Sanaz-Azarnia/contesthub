using Application.Common.Interfaces;
using Application.Features.Gameplay.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Gameplay.Queries.GetGameplayQuestions;

public class GetGameplayQuestionsQueryHandler : IRequestHandler<GetGameplayQuestionsQuery, List<GameplayQuestionDto>>
{
    private readonly IApplicationDbContext _context;

    public GetGameplayQuestionsQueryHandler(IApplicationDbContext context) => _context = context;

    public async Task<List<GameplayQuestionDto>> Handle(GetGameplayQuestionsQuery request, CancellationToken cancellationToken)
    {
        var query = _context.Questions.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(request.Category))
            query = query.Where(q => q.Category == request.Category);
        if (!string.IsNullOrWhiteSpace(request.Difficulty))
            query = query.Where(q => q.Difficulty == request.Difficulty);

        var questions = await query
            .OrderBy(q => EF.Functions.Random()) // مخصوص Postgres
            .Take(request.Count)
            .ToListAsync(cancellationToken);

        return questions.Select(q => 
        {
            var options = new List<string>(q.IncorrectAnswers) { q.CorrectAnswer };
            var rng = new Random();
            int n = options.Count;
            while (n > 1) { n--; int k = rng.Next(n + 1); (options[k], options[n]) = (options[n], options[k]); }

            return new GameplayQuestionDto(q.Id, q.Category, q.Difficulty, q.QuestionText, options);
        }).ToList();
    }
}