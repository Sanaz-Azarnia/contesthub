using Application.Common.Models;
using Application.Features.Question.DTOs;
using MediatR;

namespace Application.Features.Question.Queries.GetQuestions;

public record GetQuestionsQuery(QuestionFilterDto Filter) : IRequest<PagedResult<QuestionDto>>;