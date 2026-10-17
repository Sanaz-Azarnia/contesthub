using Application.Common.Interfaces;
using Application.Features.Admin.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Admin.Queries.GetUsers;

public class GetUsersQueryHandler(IApplicationDbContext ctx) : IRequestHandler<GetUsersQuery, List<UserSummaryDto>>
{
    public async Task<List<UserSummaryDto>> Handle(GetUsersQuery req, CancellationToken ct) =>
        await ctx.Users.AsNoTracking().Select(u => new UserSummaryDto(
            u.Id, 
            u.Username.Value, 
            u.Email, 
            u.Role.ToString(), // ✅ استفاده از u.Role
            u.Provider.ToString(), 
            u.CreatedAt,
            ctx.Scores.Where(s => s.UserId == u.Id).Sum(s => (int?)s.Points) ?? 0,
            ctx.Scores.Where(s => s.UserId == u.Id && s.ContestId != null).Select(s => s.ContestId).Distinct().Count()
        )).ToListAsync(ct);
}