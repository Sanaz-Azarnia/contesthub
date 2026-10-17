namespace Application.Features.Gameplay.DTOs;
public record SubmitAnswerDto(
    int QuestionId, 
    string SelectedAnswer, 
    int TimeTaken);