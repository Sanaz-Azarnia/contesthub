namespace Application.Features.Admin.DTOs;

public record UserSummaryDto(
    int Id, 
    string Username, 
    string? Email, 
    string Role, 
    string Provider, 
    DateTime CreatedAt, 
    int TotalScore, 
    int ContestCount);
 