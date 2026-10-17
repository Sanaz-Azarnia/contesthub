using Application.Features.Leaderboard.DTOs;
using MediatR;

namespace Application.Features.Leaderboard.Queries.GetLeaderboard;

public record GetLeaderboardQuery(
    string? Category, 
    string? Period) : IRequest<List<LeaderboardEntryDto>>;