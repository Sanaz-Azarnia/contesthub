using Application.Common.Interfaces;
using Application.Features.UserDashboard.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.UserDashboard.Queries.GetStats;

public class GetStatsQueryHandler(IApplicationDbContext ctx) : IRequestHandler<GetStatsQuery, UserStatsDto>
{
    public async Task<UserStatsDto> Handle(GetStatsQuery req, CancellationToken ct)
    {
        var scores = await ctx.Scores.AsNoTracking().Where(s => s.UserId == req.UserId).ToListAsync(ct);
        
        var totalContests = scores.Select(s => s.ContestId).Distinct().Count();
        var totalScore = scores.Sum(s => s.Points);
        var totalQuestions = scores.Count;
        var correctAnswers = scores.Count(s => s.IsCorrect);
        var accuracy = totalQuestions > 0 ? Math.Round((double)correctAnswers / totalQuestions * 100, 1) : 0;
        
        return new UserStatsDto(totalContests, totalScore, totalQuestions, correctAnswers, accuracy);
    }
}