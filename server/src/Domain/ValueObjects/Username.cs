using Domain.Exceptions;

namespace Domain.ValueObjects;

public record Username
{
    public string Value { get; }

    private Username(string value) => Value = value;

    public static Username Create(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new InvalidUsernameException("Username cannot be empty.");
            
        if (value.Length > 50)
            throw new InvalidUsernameException("Username cannot exceed 50 characters.");
        
        return new Username(value);
    }
}