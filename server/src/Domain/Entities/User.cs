 using Domain.Enums;
using Domain.ValueObjects;

namespace Domain.Entities;

public class User
{
    public int Id { get; private set; }
    
    // تغییر به Value Object
    public Username Username { get; private set; } = null!; 
    
    public string? Email { get; private set; }
    public string? PasswordHash { get; private set; }
    public AuthProvider Provider { get; private set; } = AuthProvider.Local;
    public string? ProviderId { get; private set; }
    public UserRole Role { get; private set; } = UserRole.User;
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
    public string? AvatarUrl { get; private set; }

    private User() { } // For EF Core

    public static User CreateLocalUser(Username username, string passwordHash)
    {
        return new User
        {
            Username = username,
            PasswordHash = passwordHash,
            Provider = AuthProvider.Local,
            Role = UserRole.User
        };
    }

    // Method to update Google Profile (Rich Model Behavior)
    public void UpdateGoogleProfile(string email, string providerId, string? avatarUrl)
    {
        Email = email;
        ProviderId = providerId;
        Provider = AuthProvider.Google;
        AvatarUrl = avatarUrl;
    }
    
    // Setters for other properties if needed
    public void SetRole(UserRole role) => Role = role;

    public void UpdateProfile(Username username, string? email, UserRole role)
    {
    Username = username;
    Email = email;
    Role = role;
    }
   public void UpdatePassword(string hashedPassword) => PasswordHash = hashedPassword;
    
    
}


 