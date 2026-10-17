using Application.Common.Interfaces;
using Application.Features.Admin.DTOs;
using MediatR;

namespace Application.Features.Admin.Commands.UpdateQuestion;

public class UpdateQuestionCommandHandler(IApplicationDbContext ctx) : IRequestHandler<UpdateQuestionCommand, int>
{
    public async Task<int> Handle(UpdateQuestionCommand req, CancellationToken ct)
    {
        var q = await ctx.Questions.FindAsync(new object[] { req.Id }, ct) ?? throw new KeyNotFoundException("Question not found");
        q.Update(req.Dto.Category, req.Dto.Difficulty, req.Dto.Type, req.Dto.QuestionText, req.Dto.CorrectAnswer, req.Dto.IncorrectAnswers);
        await ctx.SaveChangesAsync(ct);
        return q.Id;
    }
}