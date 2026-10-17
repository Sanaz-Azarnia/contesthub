using Application.Features.Admin.DTOs;
using MediatR;

namespace Application.Features.Admin.Commands.CreateQuestion;

public record CreateQuestionCommand(AdminCreateQuestionDto Dto) : IRequest<int>;