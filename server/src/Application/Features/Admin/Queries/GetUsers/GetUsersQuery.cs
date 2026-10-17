using Application.Features.Admin.DTOs;
using MediatR;

namespace Application.Features.Admin.Queries.GetUsers;

public record GetUsersQuery : IRequest<List<UserSummaryDto>>;