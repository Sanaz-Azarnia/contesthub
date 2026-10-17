using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Features.Auth.Commands.RegisterUser;
using Domain.Entities;
using Domain.ValueObjects;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;
using Infrastructure.Persistence;

namespace Application.UnitTests.Features.Auth.Commands;

public class RegisterUserCommandHandlerTests : IDisposable
{
    private readonly AppDbContext _context;
    private readonly Mock<IPasswordHasher> _hasherMock;
    private readonly Mock<IJwtTokenGenerator> _jwtMock;
    private readonly RegisterUserCommandHandler _handler;

    public RegisterUserCommandHandlerTests()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        _context = new AppDbContext(options);
        _hasherMock = new Mock<IPasswordHasher>();
        _jwtMock = new Mock<IJwtTokenGenerator>();

        _handler = new RegisterUserCommandHandler(_context, _hasherMock.Object, _jwtMock.Object);
    }

    [Fact]
    public async Task Handle_ValidCommand_ShouldCreateUserAndReturnToken()
    {
        // Arrange
        var command = new RegisterUserCommand("testuser", "password123");
        
        _hasherMock.Setup(h => h.Hash(It.IsAny<string>())).Returns("hashed_password");
        _jwtMock.Setup(j => j.GenerateToken(It.IsAny<User>())).Returns("fake_jwt_token");

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.Token.Should().Be("fake_jwt_token");
        result.Username.Should().Be("testuser");

        var userInDb = await _context.Users.FirstOrDefaultAsync(u => u.Username.Value == "testuser");
        userInDb.Should().NotBeNull();
        userInDb!.PasswordHash.Should().Be("hashed_password");
        userInDb.Role.ToString().Should().Be("User");
    }

    [Fact]
    public async Task Handle_ExistingUsername_ShouldThrowUserAlreadyExistsException()
    {
        // Arrange
        var existingUser = User.CreateLocalUser(Username.Create("existinguser"), "hash");
        _context.Users.Add(existingUser);
        await _context.SaveChangesAsync();

        var command = new RegisterUserCommand("existinguser", "password123");

        // Act & Assert
        var act = () => _handler.Handle(command, CancellationToken.None);
        await act.Should().ThrowAsync<UserAlreadyExistsException>()
            .WithMessage("*already exists*");
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}