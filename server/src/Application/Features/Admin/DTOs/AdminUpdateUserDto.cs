namespace Application.Features.Admin.DTOs;

 public record AdminUpdateUserDto(
    string Username, 
    string Email, 
    string? Password, 
    string Role);

 