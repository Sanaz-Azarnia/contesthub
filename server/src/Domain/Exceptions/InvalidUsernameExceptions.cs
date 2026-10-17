namespace Domain.Exceptions;

public class InvalidUsernameException : DomainException
{
    public InvalidUsernameException(string message) : base(message) { }
}