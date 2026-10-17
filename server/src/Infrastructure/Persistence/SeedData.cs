using System.Text.Json;
using System.Text.Json.Serialization;
using Domain.Entities;
using Domain.Enums;
using Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Infrastructure.Services;  

namespace Infrastructure.Persistence;

public static class SeedData
{
    public static async Task InitializeAsync(AppDbContext context, IConfiguration configuration)
    {
        var passwordHasher = new PasswordHasher();  

        // 1. Seed Admin
        if (!await context.Users.AnyAsync(u => u.Role == UserRole.Admin))
        {
            var adminPassword = Environment.GetEnvironmentVariable("ADMIN_PASSWORD")
                ?? configuration["Admin:Password"]
                ?? throw new InvalidOperationException(
                    "Admin password not configured. Set ADMIN_PASSWORD in .env file.");

            var adminUsername = Username.Create("admin");
            var admin = User.CreateLocalUser(adminUsername, passwordHasher.Hash(adminPassword));
            admin.UpdateProfile(adminUsername, "admin@contesthub.com", UserRole.Admin);

            context.Users.Add(admin);
            await context.SaveChangesAsync();
            Console.WriteLine("Admin user seeded successfully.");
        }

        // 2. Seed Questions from JSON
        if (!await context.Questions.AnyAsync())
        {
             
            var jsonPath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "questions.json");

            if (File.Exists(jsonPath))
            {
                var json = await File.ReadAllTextAsync(jsonPath);
                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

                List<TriviaQuestionSeed>? triviaQuestions = null;

                try { triviaQuestions = JsonSerializer.Deserialize<List<TriviaQuestionSeed>>(json, options); } catch { }

                if (triviaQuestions == null || triviaQuestions.Count == 0)
                {
                    try
                    {
                        var wrapper = JsonSerializer.Deserialize<TriviaApiResponse>(json, options);
                        triviaQuestions = wrapper?.Results;
                    }
                    catch { }
                }

                if (triviaQuestions != null && triviaQuestions.Count > 0)
                {
                   
                    var questions = triviaQuestions.Select(q => Question.Create(
                        q.Category, 
                        q.Difficulty, 
                        q.Type, 
                        q.Question, 
                        q.CorrectAnswer ?? string.Empty, 
                        q.IncorrectAnswers ?? new List<string>()
                    )).ToList();

                    await context.Questions.AddRangeAsync(questions);
                    await context.SaveChangesAsync();
                    Console.WriteLine($"Seeded {questions.Count} questions.");
                }
                else
                {
                    Console.WriteLine("WARNING: Could not parse questions.json.");
                }
            }
            else
            {
                Console.WriteLine($"questions.json not found at {jsonPath}. Skipping question seed.");
            }
        }

        // 3. Seed Fake Users and Scores
        await SeedFakeDataAsync(context, passwordHasher);
    }

    private static async Task SeedFakeDataAsync(AppDbContext context, PasswordHasher passwordHasher)
    {
        if (await context.Users.AnyAsync(u => u.Role == UserRole.User))
        {
            Console.WriteLine("Fake users already exist. Skipping fake data seed.");
            return;
        }

        var random = new Random();
        var firstNames = new[] { "Alex", "Sarah", "Mike", "Emma", "John", "Lisa", "David", "Anna", 
            "Chris", "Sophie", "Tom", "Julia", "Ryan", "Maria", "James", "Nina", "Kevin", "Laura" };
        var lastNames = new[] { "Chen", "Kim", "Ross", "Watson", "Smith", "Brown", "Davis", "Wilson", 
            "Garcia", "Lee", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris" };

        var questionIds = await context.Questions.Select(q => q.Id).ToListAsync();
        if (!questionIds.Any())
        {
            Console.WriteLine("No questions found. Cannot seed fake scores.");
            return;
        }

        var users = new List<User>();
        var userEntitiesMap = new Dictionary<int, int>(); // Map index to UserId

        for (int i = 0; i < 15; i++)
        {
            var firstName = firstNames[random.Next(firstNames.Length)];
            var lastName = lastNames[random.Next(lastNames.Length)];
            var usernameStr = $"{firstName}{lastName}{random.Next(10, 99)}".ToLower();

            var username = Username.Create(usernameStr);
            var user = User.CreateLocalUser(username, passwordHasher.Hash("password123"));
            user.UpdateProfile(username, $"{usernameStr}@example.com", UserRole.User);
            
            users.Add(user);
        }

        await context.Users.AddRangeAsync(users);
        await context.SaveChangesAsync();  

        var scores = new List<Score>();
        foreach (var user in users)
        {
            var scoreCount = random.Next(5, 11);
            for (int i = 0; i < scoreCount; i++)
            {
                var isCorrect = random.NextDouble() > 0.3; 
                var points = isCorrect ? random.Next(5, 16) : 0;
                var questionId = questionIds[random.Next(questionIds.Count)];

                 
                scores.Add(Score.Create(
                    user.Id, 
                    questionId, 
                    points, 
                    random.Next(5, 31), 
                    isCorrect
                ));
            }
        }

        await context.Scores.AddRangeAsync(scores);
        await context.SaveChangesAsync();
        Console.WriteLine($"Seeded {users.Count} fake users with {scores.Count} scores.");
    }
}

 
public class TriviaApiResponse
{
    [JsonPropertyName("results")]
    public List<TriviaQuestionSeed> Results { get; set; } = new();
}

public class TriviaQuestionSeed
{
    public string Category { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Difficulty { get; set; } = string.Empty;

    [JsonPropertyName("question")]
    public string Question { get; set; } = string.Empty;

    [JsonPropertyName("correct_answer")]
    public string CorrectAnswer { get; set; } = string.Empty;

    [JsonPropertyName("incorrect_answers")]
    public List<string> IncorrectAnswers { get; set; } = new();
}