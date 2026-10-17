using Application.Features.Admin.DTOs;
using MediatR;

namespace Application.Features.Admin.Queries.GetStats;

public record GetStatsQuery : IRequest<AdminStatsDto>;