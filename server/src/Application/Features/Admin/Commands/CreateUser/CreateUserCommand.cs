using Application.Features.Admin.DTOs;
using MediatR;

namespace Application.Features.Admin.Commands.CreateUser;

public record CreateUserCommand(AdminCreateUserDto Dto) : IRequest<UserSummaryDto>;