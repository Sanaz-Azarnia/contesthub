namespace Application.Features.UserDashboard.DTOs;

public record UserProfileDto(
    int Id, 
    string Username, 
    string? Email, 
    string? AvatarUrl, 
    DateTime CreatedAt, 
    string Role);
 