using MediatR;

namespace Application.Features.Question.Queries.GetCategories;

public record GetCategoriesQuery : IRequest<List<string>>;