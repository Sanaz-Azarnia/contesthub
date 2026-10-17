using Application.Common.Interfaces;
using Application.Features.Admin.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Admin.Queries.GetStats;

public class GetStatsQueryHandler(IApplicationDbContext ctx) : IRequestHandler<GetStatsQuery, AdminStatsDto>
{
    public async Task<AdminStatsDto> Handle(GetStatsQuery req, CancellationToken ct)
    {
        var today = DateTime.UtcNow.Date;
        return new AdminStatsDto(
            await ctx.Users.CountAsync(ct),
            await ctx.Questions.CountAsync(ct),
            await ctx.Contests.CountAsync(ct),
            await ctx.Scores.CountAsync(ct),
            await ctx.Users.CountAsync(u => u.CreatedAt.Date == today, ct),
            await ctx.Contests.CountAsync(c => c.IsActive, ct)
        );
    }
}