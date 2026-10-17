using MediatR;

namespace Application.Features.Admin.Commands.DeleteContest;

public record DeleteContestCommand(int Id) : IRequest<string>;