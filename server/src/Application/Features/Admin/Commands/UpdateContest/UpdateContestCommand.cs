using Application.Features.Admin.DTOs;
using MediatR;

namespace Application.Features.Admin.Commands.UpdateContest;

public record UpdateContestCommand(int Id, AdminUpdateContestDto Dto) : IRequest<AdminContestDto>;