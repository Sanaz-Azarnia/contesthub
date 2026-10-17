namespace Application.Features.Admin.DTOs;

 

public record AdminContestDto(
    int Id, string Title, 
    string? Description, 
    string Category, 
    string Difficulty , 
    DateTime? StartDate, 
    DateTime? EndDate, 
    bool IsActive, 
    List<int> QuestionIds);
 