using System.Net;
using System.Net.Http.Json;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Json.Serialization;

public class TriviaApiResponse 
{
    [JsonPropertyName("response_code")]
    public int ResponseCode { get; set; }

    [JsonPropertyName("results")]
    public List<TriviaQuestion> Results { get; set; } = new();
}

public class TriviaQuestion
{
    [JsonPropertyName("category")] 
    public string Category { get; set; } = string.Empty;

    [JsonPropertyName("type")]
    public string Type { get; set; } = string.Empty;

    [JsonPropertyName("difficulty")]
    public string Difficulty { get; set; } = string.Empty;

    [JsonPropertyName("question")]
    public string Question { get; set; } = string.Empty;

    [JsonPropertyName("correct_answer")]
    public string CorrectAnswer { get; set; } = string.Empty;

    [JsonPropertyName("incorrect_answers")]
    public List<string> IncorrectAnswers { get; set; } = new();
}

public class TokenResponse 
{
    [JsonPropertyName("response_code")]
    public int ResponseCode { get; set; }

    [JsonPropertyName("response_message")]
    public string ResponseMessage { get; set; } = string.Empty;

    [JsonPropertyName("token")]
    public string Token { get; set; } = string.Empty;
}

class Program 
{
    static async Task Main(string[] args)
    {
        using var client = new HttpClient();
        var allQuestions = new List<TriviaQuestion>();
        var seenQuestions = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

        Console.WriteLine("Fetching session token...");
        var tokenRes = await client.GetFromJsonAsync<TokenResponse>(
            "https://opentdb.com/api_token.php?command=request");

        if (tokenRes?.ResponseCode != 0 || string.IsNullOrEmpty(tokenRes.Token))
        {
            Console.WriteLine("Failed to get token. Exiting.");
            return;
        }

        string token = tokenRes.Token;
        Console.WriteLine($"Token received: {token[..10]}...");

        int batchSize = 50;
        int maxExpected = 4000;
        int totalFetched = 0;
        int emptyStreak = 0;

        while (totalFetched < maxExpected && emptyStreak < 3)
        {
            string url = $"https://opentdb.com/api.php?amount={batchSize}&token={token}";
            
            try
            {
                var response = await client.GetFromJsonAsync<TriviaApiResponse>(url);
                
                if (response?.Results == null || response.Results.Count == 0)
                {
                    emptyStreak++;
                    break;
                }

                int newCount = 0;
                foreach (var q in response.Results)
                {
                    q.Question = WebUtility.HtmlDecode(q.Question);
                    q.CorrectAnswer = WebUtility.HtmlDecode(q.CorrectAnswer);
                    q.Category = WebUtility.HtmlDecode(q.Category);
                    for (int i = 0; i < q.IncorrectAnswers.Count; i++)
                        q.IncorrectAnswers[i] = WebUtility.HtmlDecode(q.IncorrectAnswers[i]);

                    if (seenQuestions.Add(q.Question))
                    {
                        allQuestions.Add(q);
                        newCount++;
                    }
                }

                totalFetched += response.Results.Count;
                Console.WriteLine($"Batch: +{response.Results.Count} | New unique: +{newCount} | Total unique: {allQuestions.Count}");

                if (newCount == 0) emptyStreak++;
                else emptyStreak = 0;

                await Task.Delay(6000);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                await Task.Delay(10000);
                emptyStreak++;
            }
        }

        var options = new JsonSerializerOptions
        {
            WriteIndented = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping
        };

        string outputPath = "questions.json";
        await File.WriteAllTextAsync(outputPath, JsonSerializer.Serialize(allQuestions, options));
        
        Console.WriteLine($"\n✅ Done! {allQuestions.Count} unique questions saved to {outputPath}");
        Console.WriteLine($"Categories: {allQuestions.Select(q => q.Category).Distinct().Count()}");
        Console.WriteLine($"Difficulties: {string.Join(", ", allQuestions.Select(q => q.Difficulty).Distinct())}");
    }
}