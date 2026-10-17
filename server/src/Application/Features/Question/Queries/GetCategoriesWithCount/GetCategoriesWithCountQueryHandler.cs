using Application.Common.Interfaces;
using Application.Features.Question.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Question.Queries.GetCategoriesWithCount;

public class GetCategoriesWithCountQueryHandler : IRequestHandler<GetCategoriesWithCountQuery, List<CategoryWithCountDto>>
{
    private readonly IApplicationDbContext _context;
    public GetCategoriesWithCountQueryHandler(IApplicationDbContext context) => _context = context;

    public async Task<List<CategoryWithCountDto>> Handle(GetCategoriesWithCountQuery request, CancellationToken cancellationToken)
    {
        return await _context.Questions
            .AsNoTracking()
            .GroupBy(q => q.Category)
            .Select(g => new CategoryWithCountDto
            {
                Name = g.Key,
                Count = g.Count()
            })
            .OrderBy(c => c.Name)
            .ToListAsync(cancellationToken);
    }
}