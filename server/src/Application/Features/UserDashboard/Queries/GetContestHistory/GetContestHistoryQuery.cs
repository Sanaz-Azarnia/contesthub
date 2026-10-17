using Application.Features.UserDashboard.DTOs;
using MediatR;

namespace Application.Features.UserDashboard.Queries.GetContestHistory;

public record GetContestHistoryQuery(int UserId) : IRequest<List<ContestHistoryDto>>;