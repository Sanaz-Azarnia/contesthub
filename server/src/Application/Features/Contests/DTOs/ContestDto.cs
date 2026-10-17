namespace Application.Features.Contests.DTOs; // یا همان Admin.DTOs

public record ContestDto(
    int Id, 
    string Title, 
    string? Description, 
    string Category, 
    string Difficulty, 
    DateTime? StartDate, 
    DateTime? EndDate, 
    bool IsActive
);