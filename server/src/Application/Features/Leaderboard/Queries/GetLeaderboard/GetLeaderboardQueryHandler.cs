using Application.Common.Interfaces;
using Application.Features.Leaderboard.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Leaderboard.Queries.GetLeaderboard;

public class GetLeaderboardQueryHandler(IApplicationDbContext context) : IRequestHandler<GetLeaderboardQuery, List<LeaderboardEntryDto>>
{
    public async Task<List<LeaderboardEntryDto>> Handle(GetLeaderboardQuery request, CancellationToken cancellationToken)
    {
        // قدم 1: فیلترهای زمانی را روی Queryable اعمال می‌کنیم (قابل ترجمه به SQL)
        var query = context.Scores.AsNoTracking().AsQueryable();

        if (request.Period == "week")
            query = query.Where(s => s.AnsweredAt >= DateTime.UtcNow.AddDays(-7));
        else if (request.Period == "month")
            query = query.Where(s => s.AnsweredAt >= DateTime.UtcNow.AddDays(-30));

        // قدم 2: داده‌های مورد نیاز را با Projection به حافظه می‌آوریم
        // این کار باعث می‌شود EF Core فقط ستون‌های لازم را از دیتابیس بخواند
        var scoreData = await query
            .Select(s => new
            {
                s.UserId,
                Username = s.User.Username.Value, // استخراج مقدار Value Object در Select (قابل ترجمه)
                s.Points,
                s.IsCorrect,
                QuestionCategory = s.Question != null ? s.Question.Category : null
            })
            .ToListAsync(cancellationToken); // ⭐ اینجا به حافظه می‌آید

        // قدم 3: حالا در حافظه فیلتر Category و GroupBy را انجام می‌دهیم
        var filteredData = scoreData.AsEnumerable();
        
        if (!string.IsNullOrWhiteSpace(request.Category))
            filteredData = filteredData.Where(s => s.QuestionCategory == request.Category);

        var leaderboard = filteredData
            .GroupBy(s => new { s.UserId, s.Username })
            .Select(g => new LeaderboardEntryDto(
                0, // Rank بعداً پر می‌شود
                g.Key.UserId,
                g.Key.Username,
                g.Sum(s => s.Points),
                g.Count(s => s.IsCorrect),
                g.Count(),
                g.Count() > 0 ? Math.Round((double)g.Count(s => s.IsCorrect) / g.Count() * 100, 1) : 0
            ))
            .OrderByDescending(l => l.TotalScore)
            .Take(100)
            .ToList();

        // قدم 4: اضافه کردن Rank
        for (int i = 0; i < leaderboard.Count; i++)
            leaderboard[i] = leaderboard[i] with { Rank = i + 1 };

        return leaderboard;
    }
}