namespace Application.Features.Question.DTOs;
// ✅ تبدیل از record به class برای Model Binding صحیح
public class QuestionFilterDto
{
    public string? Category { get; set; }
    public string? Difficulty { get; set; }
    public string? Type { get; set; }
    public string? Search { get; set; }
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 20;
}