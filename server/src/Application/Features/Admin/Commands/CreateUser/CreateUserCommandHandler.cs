using Application.Common.Interfaces;
using Application.Features.Admin.DTOs;
using Domain.Entities;
using Domain.Enums;
using Domain.ValueObjects;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Admin.Commands.CreateUser;

public class CreateUserCommandHandler(IApplicationDbContext ctx, IPasswordHasher hasher) : IRequestHandler<CreateUserCommand, UserSummaryDto>
{
    public async Task<UserSummaryDto> Handle(CreateUserCommand req, CancellationToken ct)
    {
        if (await ctx.Users.AnyAsync(u => u.Username.Value == req.Dto.Username || u.Email == req.Dto.Email, ct))
            throw new InvalidOperationException("Username or email already exists");

        var hashedPassword = hasher.Hash(req.Dto.Password);
        var username = Username.Create(req.Dto.Username);
        var user = User.CreateLocalUser(username, hashedPassword);
        user.UpdateProfile(username, req.Dto.Email, Enum.Parse<UserRole>(req.Dto.Role ?? "User"));
        
        ctx.Users.Add(user);
        await ctx.SaveChangesAsync(ct);
        
        
        return new UserSummaryDto(user.Id, user.Username.Value, user.Email, user.Role.ToString(), user.Provider.ToString(), user.CreatedAt, 0, 0);
    }
}