using Application.Common.Interfaces;
using Application.Features.Admin.DTOs;
using Domain.Enums;
using Domain.ValueObjects;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Admin.Commands.UpdateUser;

public class UpdateUserCommandHandler(IApplicationDbContext ctx, IPasswordHasher hasher) : IRequestHandler<UpdateUserCommand, UserSummaryDto>
{
    public async Task<UserSummaryDto> Handle(UpdateUserCommand req, CancellationToken ct)
    {
        var user = await ctx.Users.FindAsync(new object[] { req.Id }, ct) ?? throw new KeyNotFoundException("User not found");
        
         
        if (user.Role == UserRole.Admin && req.Dto.Role != "Admin")
            throw new InvalidOperationException("Cannot change admin role");

        var newUsername = Username.Create(req.Dto.Username);
        user.UpdateProfile(newUsername, req.Dto.Email, Enum.Parse<UserRole>(req.Dto.Role));
        
        if (!string.IsNullOrEmpty(req.Dto.Password)) 
            user.UpdatePassword(hasher.Hash(req.Dto.Password));

        await ctx.SaveChangesAsync(ct);
        
        var totalScore = await ctx.Scores.Where(s => s.UserId == user.Id).SumAsync(s => (int?)s.Points, ct) ?? 0;
        var contestCount = await ctx.Scores.Where(s => s.UserId == user.Id && s.ContestId != null).Select(s => s.ContestId).Distinct().CountAsync(ct);
        
        return new UserSummaryDto(user.Id, user.Username.Value, user.Email, user.Role.ToString(), user.Provider.ToString(), user.CreatedAt, totalScore, contestCount);
    }
}