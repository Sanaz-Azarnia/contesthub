namespace Application.Features.Gameplay.DTOs;
public record GameplayResultDto(
    bool IsCorrect, 
    int Points, 
    string CorrectAnswer, 
    int TotalScore);
 