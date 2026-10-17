namespace Application.Features.Leaderboard.DTOs;

public record LeaderboardEntryDto(
    int Rank,
    int UserId,
    string Username,
    int TotalScore,
    int CorrectAnswers,
    int TotalAnswers,
    double Accuracy
);