using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Features.Auth.DTOs;
using Domain.Entities;
using Domain.ValueObjects; // اضافه شدن
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Auth.Commands.RegisterUser;

public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, AuthResponseDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public RegisterUserCommandHandler(
        IApplicationDbContext context, 
        IPasswordHasher passwordHasher, 
        IJwtTokenGenerator jwtTokenGenerator)
    {
        _context = context;
        _passwordHasher = passwordHasher;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<AuthResponseDto> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        // استفاده از .Value برای کوئری زدن در EF Core
        if (await _context.Users.AnyAsync(u => u.Username.Value == request.Username, cancellationToken))
        {
            throw new UserAlreadyExistsException(request.Username);
        }

        var hashedPassword = _passwordHasher.Hash(request.Password);
        
        // ساخت Value Object
        var usernameVO = Username.Create(request.Username);

        // پاس دادن Value Object به Factory Method
        var user = User.CreateLocalUser(usernameVO, hashedPassword);

        _context.Users.Add(user);
        await _context.SaveChangesAsync(cancellationToken);

        var token = _jwtTokenGenerator.GenerateToken(user);

        return new AuthResponseDto(
            token, 
            user.Id, 
            user.Username.Value, // استفاده از .Value برای خروجی DTO
            user.Email, 
            user.Role.ToString(), 
            user.AvatarUrl
        );
    }
}