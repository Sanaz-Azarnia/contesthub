namespace Application.Features.UserDashboard.DTOs;

public record ContestHistoryDto(
    string Category, 
    DateTime Date, 
    int Score, 
    int QuestionsAnswered, 
    int CorrectCount);