using Application.Common.Interfaces;
using Application.Features.Gameplay.Commands.SubmitAnswer;
using Domain.Entities;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Xunit;
using Infrastructure.Persistence;

namespace Application.UnitTests.Features.Gameplay.Commands;

public class SubmitAnswerCommandHandlerTests : IDisposable
{
    private readonly AppDbContext _context;
    private readonly SubmitAnswerCommandHandler _handler;
    private readonly int _userId = 1;
    private int _questionId;

    public SubmitAnswerCommandHandlerTests()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        _context = new AppDbContext(options);
        _handler = new SubmitAnswerCommandHandler(_context);

        // Seed Data (ایجاد یک سوال تستی)
        var question = Question.Create("Math", "Easy", "multiple", "2+2=?", "4", new List<string> { "1", "3", "5" });
        _context.Questions.Add(question);
        _context.SaveChanges(); // ذخیره می‌کنیم تا Id تولید شود
        
        _questionId = question.Id;
    }

    [Fact]
    public async Task Handle_CorrectAnswer_ShouldCalculatePointsAndSaveScore()
    {
        // Arrange
        var timeTaken = 5; // ثانیه
        var command = new SubmitAnswerCommand(_userId, _questionId, "4", timeTaken);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.IsCorrect.Should().BeTrue();
        result.CorrectAnswer.Should().Be("4");
        
        // فرمول شما: Math.Max(15 - TimeTaken / 2, 1) => 15 - 2 = 13
        result.Points.Should().Be(13); 

        var scoreInDb = await _context.Scores.FirstOrDefaultAsync();
        scoreInDb.Should().NotBeNull();
        scoreInDb!.IsCorrect.Should().BeTrue();
        scoreInDb.Points.Should().Be(13);
        scoreInDb.UserId.Should().Be(_userId);
    }

    [Fact]
    public async Task Handle_WrongAnswer_ShouldReturnZeroPointsAndFalse()
    {
        // Arrange
        var command = new SubmitAnswerCommand(_userId, _questionId, "3", 5);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.IsCorrect.Should().BeFalse();
        result.Points.Should().Be(0);

        var scoreInDb = await _context.Scores.FirstOrDefaultAsync();
        scoreInDb.Should().NotBeNull();
        scoreInDb!.IsCorrect.Should().BeFalse();
        scoreInDb.Points.Should().Be(0);
    }

    [Fact]
    public async Task Handle_QuestionNotFound_ShouldThrowException()
    {
        // Arrange
        var command = new SubmitAnswerCommand(_userId, 9999, "4", 5);

        // Act & Assert
        var act = () => _handler.Handle(command, CancellationToken.None);
        await act.Should().ThrowAsync<Exception>().WithMessage("*Question not found*");
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}