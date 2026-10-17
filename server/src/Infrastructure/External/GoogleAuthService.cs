#nullable enable

using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Infrastructure.External;

public class GoogleAuthService : IGoogleAuthService
{
    private readonly ILogger<GoogleAuthService> _logger;
    private readonly string _clientId;

    public GoogleAuthService(
        ILogger<GoogleAuthService> logger,
        IConfiguration configuration)
    {
        _logger = logger;

        _clientId = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_ID")
            ?? configuration["Google:ClientId"]
            ?? throw new InvalidOperationException(
                "GOOGLE_CLIENT_ID not configured. " +
                "Please set it in .env or appsettings.json");
    }

    public async Task<GoogleUserPayload?> ValidateTokenAndGetInfoAsync(string idToken)
    {
        if (string.IsNullOrWhiteSpace(idToken))
        {
            _logger.LogWarning("Empty Google ID token provided");
            return null;
        }

        try
        {
            var payload = await GoogleJsonWebSignature.ValidateAsync(idToken);

            if (payload is null)
            {
                _logger.LogWarning("Google token validation returned null payload");
                return null;
            }

            if (!IsValidAudience(payload.Audience, _clientId))
            {
                _logger.LogWarning(
                    "Google token audience mismatch. Expected: {Expected}, Got: {Actual}",
                    _clientId,
                    FormatAudience(payload.Audience));

                return null;
            }

            if (!IsTrue(payload.EmailVerified))
            {
                _logger.LogWarning(
                    "Google email not verified for {Email}",
                    AsString(payload.Email));

                return null;
            }

            var subject = AsString(payload.Subject);
            var email = AsString(payload.Email);

            if (subject is null || email is null)
            {
                _logger.LogWarning("Google token missing required subject/email");
                return null;
            }

            if (string.IsNullOrWhiteSpace(subject) || string.IsNullOrWhiteSpace(email))
            {
                _logger.LogWarning("Google token subject/email is empty");
                return null;
            }

            _logger.LogInformation(
                "Google token validated successfully for {Email}",
                email);

            return new GoogleUserPayload(
                Sub: subject,
                Email: email,
                Picture: AsString(payload.Picture) ?? string.Empty
            );
        }
        catch (InvalidJwtException ex)
        {
            _logger.LogWarning(ex, "Invalid Google JWT token");
            return null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error validating Google token");
            return null;
        }
    }

    private static bool IsValidAudience(object? audience, string expectedClientId)
    {
        if (string.IsNullOrWhiteSpace(expectedClientId) || audience is null)
            return false;

         
        if (audience is string audienceString)
        {
            return string.Equals(
                audienceString,
                expectedClientId,
                StringComparison.Ordinal);
        }

         
        if (audience is IEnumerable audienceList)
        {
            foreach (var item in audienceList)
            {
                var audienceItem = item as string ?? item?.ToString();

                if (string.Equals(
                        audienceItem,
                        expectedClientId,
                        StringComparison.Ordinal))
                {
                    return true;
                }
            }

            return false;
        }

         
        return string.Equals(
            audience.ToString(),
            expectedClientId,
            StringComparison.Ordinal);
    }

    private static string FormatAudience(object? audience)
    {
        if (audience is null)
            return "(null)";

        if (audience is string audienceString)
            return audienceString;

        if (audience is IEnumerable audienceList)
        {
            var values = new List<string>();

            foreach (var item in audienceList)
            {
                values.Add(item?.ToString() ?? string.Empty);
            }

            return string.Join(", ", values);
        }

        return audience.ToString() ?? audience.GetType().Name;
    }

    private static string? AsString(object? value)
    {
        if (value is null)
            return null;

        if (value is string s)
            return s;

        return value.ToString();
    }

    private static bool IsTrue(object? value)
    {
        return value switch
        {
            bool b => b,
            string s => bool.TryParse(s, out var parsed) && parsed,
            _ => false
        };
    }
}