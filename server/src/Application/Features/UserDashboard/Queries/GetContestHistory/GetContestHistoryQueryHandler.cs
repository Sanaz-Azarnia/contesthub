using Application.Common.Interfaces;
using Application.Features.UserDashboard.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.UserDashboard.Queries.GetContestHistory;

public class GetContestHistoryQueryHandler(IApplicationDbContext ctx) : IRequestHandler<GetContestHistoryQuery, List<ContestHistoryDto>>
{
    public async Task<List<ContestHistoryDto>> Handle(GetContestHistoryQuery req, CancellationToken ct)
    {
        var scores = await ctx.Scores.AsNoTracking()
            .Where(s => s.UserId == req.UserId)
            .Include(s => s.Question)
            .ToListAsync(ct);

        var history = scores
            .Where(s => s.Question != null)
            .GroupBy(s => new { Category = s.Question!.Category, Date = s.AnsweredAt.Date })
            .Select(g => new ContestHistoryDto(
                g.Key.Category,
                g.Key.Date,
                g.Sum(s => s.Points),
                g.Count(),
                g.Count(s => s.IsCorrect)
            ))
            .OrderByDescending(c => c.Date)
            .ToList();

        return history;
    }
}