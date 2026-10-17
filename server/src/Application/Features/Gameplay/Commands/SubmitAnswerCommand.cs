using MediatR;
using Application.Features.Gameplay.DTOs;

namespace Application.Features.Gameplay.Commands.SubmitAnswer;
public record SubmitAnswerCommand(
    int UserId, 
    int QuestionId, 
    string SelectedAnswer, 
    int TimeTaken) : IRequest<GameplayResultDto>;