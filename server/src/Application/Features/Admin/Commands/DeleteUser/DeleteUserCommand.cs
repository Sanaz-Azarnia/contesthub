using MediatR;

namespace Application.Features.Admin.Commands.DeleteUser;

public record DeleteUserCommand(int Id) : IRequest<string>;