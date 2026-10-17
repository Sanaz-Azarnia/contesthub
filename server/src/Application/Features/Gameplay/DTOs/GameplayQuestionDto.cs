namespace Application.Features.Gameplay.DTOs;
public record GameplayQuestionDto(
int Id, 
string Category, 
string Difficulty, 
string QuestionText, 
List<string> Options);
 