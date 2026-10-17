using Application.Common.Models;
using Application.Features.Contests.DTOs; 
using MediatR;

namespace Application.Features.Admin.Queries.GetContests;

public record GetContestsQuery(string? Category = null, int Page = 1, int PageSize = 10) : IRequest<PagedResult<ContestDto>>;