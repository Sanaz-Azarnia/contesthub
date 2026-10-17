using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Question.Queries.GetDifficulties;

public class GetDifficultiesQueryHandler : IRequestHandler<GetDifficultiesQuery, List<string>>
{
    private readonly IApplicationDbContext _context;
    public GetDifficultiesQueryHandler(IApplicationDbContext context) => _context = context;

    public async Task<List<string>> Handle(GetDifficultiesQuery request, CancellationToken cancellationToken)
    {
        return await _context.Questions
            .AsNoTracking()
            .Select(q => q.Difficulty)
            .Distinct()
            .OrderBy(d => d)
            .ToListAsync(cancellationToken);
    }
}