namespace Application.Features.Auth.DTOs;

public record AuthResponseDto(
    string Token,
    int UserId,
    string Username,
    string? Email,
    string Role,
    string? AvatarUrl
);