using Application.Common.Interfaces;
using MediatR;

namespace Application.Features.Admin.Commands.DeleteQuestion;

public class DeleteQuestionCommandHandler(IApplicationDbContext ctx) : IRequestHandler<DeleteQuestionCommand, string>
{
    public async Task<string> Handle(DeleteQuestionCommand req, CancellationToken ct)
    {
        var q = await ctx.Questions.FindAsync(new object[] { req.Id }, ct) ?? throw new KeyNotFoundException("Question not found");
        ctx.Questions.Remove(q);
        await ctx.SaveChangesAsync(ct);
        return "Question deleted";
    }
}