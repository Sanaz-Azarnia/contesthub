using Application.Common.Interfaces;
using MediatR;

namespace Application.Features.Admin.Commands.DeleteContest;

public class DeleteContestCommandHandler(IApplicationDbContext ctx) : IRequestHandler<DeleteContestCommand, string>
{
    public async Task<string> Handle(DeleteContestCommand req, CancellationToken ct)
    {
        var contest = await ctx.Contests.FindAsync(new object[] { req.Id }, ct) ?? throw new KeyNotFoundException("Contest not found");
        ctx.Contests.Remove(contest);
        await ctx.SaveChangesAsync(ct);
        return "Contest deleted";
    }
}