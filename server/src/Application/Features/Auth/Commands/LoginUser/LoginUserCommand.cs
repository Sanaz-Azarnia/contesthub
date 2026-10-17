using Application.Features.Auth.DTOs;
using MediatR;

namespace Application.Features.Auth.Commands.LoginUser;

public record LoginUserCommand(string Username, string Password) : IRequest<AuthResponseDto>;