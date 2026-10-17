using Application.Common.Models;
using Application.Features.Admin.DTOs;
using MediatR;

namespace Application.Features.Admin.Queries.GetAdminQuestions;

public record GetAdminQuestionsQuery(int Page = 1, int PageSize = 50) : IRequest<PagedResult<AdminQuestionDto>>;