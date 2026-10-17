using Application.Features.Question.DTOs;
using MediatR;

namespace Application.Features.Question.Queries.GetCategoriesWithCount;

public record GetCategoriesWithCountQuery : IRequest<List<CategoryWithCountDto>>;