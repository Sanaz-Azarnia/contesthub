using Application.Features.UserDashboard.DTOs;
using MediatR;

namespace Application.Features.UserDashboard.Queries.GetProfile;

public record GetProfileQuery(int UserId) : IRequest<UserProfileDto>;