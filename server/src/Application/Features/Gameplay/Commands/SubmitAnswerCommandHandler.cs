using Application.Common.Interfaces;
using Application.Features.Gameplay.DTOs;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Gameplay.Commands.SubmitAnswer;

public class SubmitAnswerCommandHandler : IRequestHandler<SubmitAnswerCommand, GameplayResultDto>
{
    private readonly IApplicationDbContext _context;

    public SubmitAnswerCommandHandler(IApplicationDbContext context) => _context = context;

    public async Task<GameplayResultDto> Handle(SubmitAnswerCommand request, CancellationToken cancellationToken)
    {
        var question = await _context.Questions.FirstOrDefaultAsync(q => q.Id == request.QuestionId, cancellationToken);
        if (question == null) throw new Exception("Question not found");

        var isCorrect = question.CheckAnswer(request.SelectedAnswer);
        var points = isCorrect ? Math.Max(15 - request.TimeTaken / 2, 1) : 0;

        var score = Score.Create(request.UserId, request.QuestionId, points, request.TimeTaken, isCorrect);
        _context.Scores.Add(score);
        await _context.SaveChangesAsync(cancellationToken);

        var totalScore = await _context.Scores.Where(s => s.UserId == request.UserId).SumAsync(s => s.Points, cancellationToken);

        return new GameplayResultDto(isCorrect, points, question.CorrectAnswer, totalScore);
    }
}