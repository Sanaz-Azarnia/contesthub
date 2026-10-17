namespace Application.Features.UserDashboard.DTOs;

 public record UserStatsDto(
    int TotalContests, 
    int TotalScore, 
    int TotalQuestions, 
    int CorrectAnswers, 
    double Accuracy);
