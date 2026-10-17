using MediatR;
using Application.Features.Gameplay.DTOs;

namespace Application.Features.Gameplay.Queries.GetGameplayQuestions;
public record GetGameplayQuestionsQuery(
    string? Category, 
    string? Difficulty, 
    int Count) : IRequest<List<GameplayQuestionDto>>;