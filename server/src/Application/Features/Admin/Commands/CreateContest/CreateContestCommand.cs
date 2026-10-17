using Application.Features.Admin.DTOs;
using MediatR;

namespace Application.Features.Admin.Commands.CreateContest;

public record CreateContestCommand(AdminCreateContestDto Dto) : IRequest<AdminContestDto>;