namespace Application.Features.Admin.DTOs;

public record AdminCreateQuestionDto(
    string Category, 
    string Difficulty, 
    string Type, 
    string QuestionText, 
    string CorrectAnswer, 
    List<string> IncorrectAnswers);
 