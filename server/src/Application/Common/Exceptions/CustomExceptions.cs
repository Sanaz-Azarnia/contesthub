namespace Application.Common.Exceptions;

public class UserAlreadyExistsException : Exception
{
    public UserAlreadyExistsException(string username) 
        : base($"User with username '{username}' already exists.") { }
}

public class InvalidCredentialsException : Exception
{
    public InvalidCredentialsException() 
        : base("Invalid username or password.") { }
}

public class ExternalAuthException : Exception
{
    public ExternalAuthException(string message) : base(message) { }
}