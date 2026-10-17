namespace Domain.Entities;

public class Question
{
    public int Id { get; private set; }
    public int? ContestId { get; private set; }
    public string Category { get; private set; } = string.Empty;
    public string Difficulty { get; private set; } = string.Empty;
    public string Type { get; private set; } = "multiple";
    public string QuestionText { get; private set; } = string.Empty;
    public string CorrectAnswer { get; private set; } = string.Empty;
    
    private List<string> _incorrectAnswers = new();
    public IReadOnlyCollection<string> IncorrectAnswers => _incorrectAnswers.AsReadOnly();
    
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
    public Contest? Contest { get; private set; }

    private Question() { } // For EF Core

    public static Question Create(string category, string difficulty, string type, string questionText, string correctAnswer, List<string>? incorrectAnswers)
    {
        if (string.IsNullOrWhiteSpace(questionText)) throw new ArgumentException("Question text is required.");
        
        return new Question
        {
            Category = category,
            Difficulty = difficulty,
            Type = type,
            QuestionText = questionText,
            CorrectAnswer = correctAnswer,
            _incorrectAnswers = incorrectAnswers ?? new List<string>()
        };
    }

    public bool CheckAnswer(string selectedAnswer)
    {
        return string.Equals(CorrectAnswer, selectedAnswer, StringComparison.OrdinalIgnoreCase);
    }

    public void AssignToContest(int? contestId) => ContestId = contestId;

    public void Update(string category, string difficulty, string type, string questionText, string correctAnswer, List<string> incorrectAnswers)
    {
        Category = category;
        Difficulty = difficulty;
        Type = type;
        QuestionText = questionText;
        CorrectAnswer = correctAnswer;
        _incorrectAnswers = incorrectAnswers ?? new List<string>();
    }
}