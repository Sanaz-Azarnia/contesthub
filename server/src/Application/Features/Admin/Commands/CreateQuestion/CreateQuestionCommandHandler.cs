using Application.Common.Interfaces;
using Application.Features.Admin.DTOs;
using MediatR;

namespace Application.Features.Admin.Commands.CreateQuestion;

public class CreateQuestionCommandHandler(IApplicationDbContext ctx) : IRequestHandler<CreateQuestionCommand, int>
{
    public async Task<int> Handle(CreateQuestionCommand req, CancellationToken ct)
    {
        
        var q = Domain.Entities.Question.Create(
            req.Dto.Category, 
            req.Dto.Difficulty, 
            req.Dto.Type, 
            req.Dto.QuestionText, 
            req.Dto.CorrectAnswer, 
            req.Dto.IncorrectAnswers
        );
        
        ctx.Questions.Add(q);
        await ctx.SaveChangesAsync(ct);
        return q.Id;
    }
}