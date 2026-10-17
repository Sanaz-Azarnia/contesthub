namespace Application.Features.Admin.DTOs;

public record AdminQuestionDto(
    int Id, 
    string Category, 
    string Difficulty, 
    string Type, 
    string QuestionText, 
    string CorrectAnswer, 
    List<string> IncorrectAnswers);
 