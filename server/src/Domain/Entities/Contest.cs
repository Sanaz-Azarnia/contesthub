namespace Domain.Entities;

public class Contest
{
    public int Id { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public string? Category { get; private set; }
    public string? Difficulty { get; private set; }
    public DateTime? StartDate { get; private set; }
    public DateTime? EndDate { get; private set; }
    public bool IsActive { get; private set; } = true;
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

    private readonly List<Question> _questions = new();
    public IReadOnlyCollection<Question> Questions => _questions.AsReadOnly();

    private Contest() { }

    public static Contest Create(string title, string? description, string? category, string? difficulty, DateTime? startDate, DateTime? endDate)
    {
        return new Contest
        {
            Title = title,
            Description = description,
            Category = category,
            Difficulty = difficulty,
            StartDate = startDate,
            EndDate = endDate
        };
    }
    public void SetIsActive(bool isActive) => IsActive = isActive;

    public void Update(string title, string? description, string? category, string? difficulty, DateTime? startDate, DateTime? endDate)
    {
       Title = title;
       Description = description;
       Category = category;
       Difficulty = difficulty;
       StartDate = startDate;
       EndDate = endDate;
    }
}