using Application.Features.Admin.DTOs;
using MediatR;

namespace Application.Features.Admin.Commands.UpdateUser;

public record UpdateUserCommand(int Id, AdminUpdateUserDto Dto) : IRequest<UserSummaryDto>;