using Microsoft.AspNetCore.Authorization;

namespace API.Attributes;

public class AdminAuthorizationAttribute : AuthorizeAttribute
{
    public AdminAuthorizationAttribute() : base("Admin") { }
}