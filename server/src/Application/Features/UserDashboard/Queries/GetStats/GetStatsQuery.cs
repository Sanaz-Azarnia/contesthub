using Application.Features.UserDashboard.DTOs;
using MediatR;

namespace Application.Features.UserDashboard.Queries.GetStats;

public record GetStatsQuery(int UserId) : IRequest<UserStatsDto>;