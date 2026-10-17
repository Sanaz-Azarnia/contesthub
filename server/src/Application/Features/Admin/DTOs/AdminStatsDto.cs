namespace Application.Features.Admin.DTOs;

 
public record AdminStatsDto(
    int TotalUsers, 
    int TotalQuestions, 
    int TotalContests, 
    int TotalScores, 
    int TodayUsers, 
    int ActiveContests);

 