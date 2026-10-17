using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Question.Queries.GetCategories;

public class GetCategoriesQueryHandler : IRequestHandler<GetCategoriesQuery, List<string>>
{
    private readonly IApplicationDbContext _context;
    public GetCategoriesQueryHandler(IApplicationDbContext context) => _context = context;

    public async Task<List<string>> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
    {
        return await _context.Questions
            .AsNoTracking()
            .Select(q => q.Category)
            .Distinct()
            .OrderBy(c => c)
            .ToListAsync(cancellationToken);
    }
}