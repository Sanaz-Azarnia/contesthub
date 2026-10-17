namespace Application.Common.Interfaces;

public record GoogleUserPayload(string Sub, string Email, string? Picture);

public interface IGoogleAuthService
{
    Task<GoogleUserPayload?> ValidateTokenAndGetInfoAsync(string idToken);
}