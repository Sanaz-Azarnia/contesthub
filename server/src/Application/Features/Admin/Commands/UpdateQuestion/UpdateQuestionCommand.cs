using Application.Features.Admin.DTOs;
using MediatR;

namespace Application.Features.Admin.Commands.UpdateQuestion;

public record UpdateQuestionCommand(int Id, AdminUpdateQuestionDto Dto) : IRequest<int>;