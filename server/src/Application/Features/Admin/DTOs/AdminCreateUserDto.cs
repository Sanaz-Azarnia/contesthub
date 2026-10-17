namespace Application.Features.Admin.DTOs;

public record AdminCreateUserDto(
    string Username, 
    string Email, 
    string Password, 
    string? Role);
 