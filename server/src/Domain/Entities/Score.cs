namespace Domain.Entities;

public class Score
{
    public int Id { get; private set; }
    public int UserId { get; private set; }
    public int? ContestId { get; private set; }
    public int? QuestionId { get; private set; }
    public int Points { get; private set; }
    public int? TimeTaken { get; private set; }
    public bool IsCorrect { get; private set; }
    public DateTime AnsweredAt { get; private set; } = DateTime.UtcNow;

    public User User { get; private set; } = null!;
    public Contest? Contest { get; private set; }
    public Question? Question { get; private set; }

    private Score() { }

    public static Score Create(int userId, int? questionId, int points, int? timeTaken, bool isCorrect, int? contestId = null)
    {
        return new Score
        {
            UserId = userId,
            QuestionId = questionId,
            ContestId = contestId,
            Points = points,
            TimeTaken = timeTaken,
            IsCorrect = isCorrect
        };
    }
}