using Application.Common.Interfaces;
using Application.Features.UserDashboard.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.UserDashboard.Queries.GetProfile;

public class GetProfileQueryHandler(IApplicationDbContext ctx) : IRequestHandler<GetProfileQuery, UserProfileDto>
{
    public async Task<UserProfileDto> Handle(GetProfileQuery req, CancellationToken ct)
    {
        var u = await ctx.Users.AsNoTracking().FirstOrDefaultAsync(x => x.Id == req.UserId, ct) 
            ?? throw new KeyNotFoundException("User not found");
            
        return new UserProfileDto(u.Id, u.Username.Value, u.Email, u.AvatarUrl, u.CreatedAt, u.Role.ToString()); // ✅ استفاده از u.Role
    }
}