using Application.Common.Interfaces;
using Domain.Enums;
using MediatR;

namespace Application.Features.Admin.Commands.DeleteUser;

public class DeleteUserCommandHandler(IApplicationDbContext ctx) : IRequestHandler<DeleteUserCommand, string>
{
    public async Task<string> Handle(DeleteUserCommand req, CancellationToken ct)
    {
        var user = await ctx.Users.FindAsync(new object[] { req.Id }, ct) ?? throw new KeyNotFoundException("User not found");
        
        // ✅ user.Role == UserRole.Admin
        if (user.Role == UserRole.Admin) throw new InvalidOperationException("Cannot delete admin user");
        
        ctx.Users.Remove(user);
        await ctx.SaveChangesAsync(ct);
        return "User deleted";
    }
}