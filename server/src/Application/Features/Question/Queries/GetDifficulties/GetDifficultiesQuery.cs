 using MediatR;

namespace Application.Features.Question.Queries.GetDifficulties;

public record GetDifficultiesQuery : IRequest<List<string>>;