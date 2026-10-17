using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Features.Contests.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Admin.Queries.GetContests;

public class GetContestsQueryHandler : IRequestHandler<GetContestsQuery, PagedResult<ContestDto>>
{
    private readonly IApplicationDbContext _context;
    public GetContestsQueryHandler(IApplicationDbContext context) => _context = context;

    public async Task<PagedResult<ContestDto>> Handle(GetContestsQuery req, CancellationToken ct)
    {
        var query = _context.Contests.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(req.Category))
        {
            query = query.Where(c => c.Category != null && c.Category.ToLower() == req.Category.ToLower());
        }

        var totalCount = await query.CountAsync(ct);

        var items = await query
            .OrderByDescending(c => c.CreatedAt)
            .Skip((req.Page - 1) * req.PageSize)
            .Take(req.PageSize)
            .Select(c => new ContestDto(
                c.Id, 
                c.Title, 
                c.Description, 
                c.Category ?? string.Empty, 
                c.Difficulty ?? string.Empty, 
                c.StartDate, 
                c.EndDate, 
                c.IsActive
            ))
            .ToListAsync(ct);

        // ✅ استفاده از Object Initializer به جای Constructor
        return new PagedResult<ContestDto>
        {
            Items = items,
            TotalCount = totalCount,
            Page = req.Page,
            PageSize = req.PageSize
        };
    }
}