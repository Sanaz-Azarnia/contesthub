using MediatR;

namespace Application.Features.Admin.Commands.DeleteQuestion;

public record DeleteQuestionCommand(int Id) : IRequest<string>;