using Application.Features.Auth.DTOs;
using MediatR;

namespace Application.Features.Auth.Commands.RegisterUser;

public record RegisterUserCommand(string Username, string Password) : IRequest<AuthResponseDto>;