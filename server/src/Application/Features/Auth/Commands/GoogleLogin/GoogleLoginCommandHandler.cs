using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Features.Auth.DTOs;
using Domain.Entities;
using Domain.ValueObjects;  
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Auth.Commands.GoogleLogin;

public class GoogleLoginCommandHandler : IRequestHandler<GoogleLoginCommand, AuthResponseDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IGoogleAuthService _googleAuthService;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public GoogleLoginCommandHandler(
        IApplicationDbContext context,
        IGoogleAuthService googleAuthService,
        IJwtTokenGenerator jwtTokenGenerator)
    {
        _context = context;
        _googleAuthService = googleAuthService;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<AuthResponseDto> Handle(GoogleLoginCommand request, CancellationToken cancellationToken)
    {
        var googleUser = await _googleAuthService.ValidateTokenAndGetInfoAsync(request.IdToken);

        if (googleUser == null || string.IsNullOrEmpty(googleUser.Sub))
            throw new ExternalAuthException("Invalid Google token");

        var user = await _context.Users.FirstOrDefaultAsync(
            u => u.Provider == Domain.Enums.AuthProvider.Google && u.ProviderId == googleUser.Sub, 
            cancellationToken);

        if (user == null)
        {
            var existingEmailUser = await _context.Users.FirstOrDefaultAsync(
                u => u.Email == googleUser.Email, cancellationToken);

            if (existingEmailUser != null)
                throw new ExternalAuthException("Email already registered with password. Please login normally.");

            var rawUsername = googleUser.Email.Split('@')[0];
            
             
            if (await _context.Users.AnyAsync(u => u.Username.Value == rawUsername, cancellationToken))
            {
                rawUsername += "_" + Guid.NewGuid().ToString().Substring(0, 5);
            }

           
            var usernameVO = Username.Create(rawUsername);

            user = User.CreateLocalUser(usernameVO, string.Empty); 
            user.UpdateGoogleProfile(googleUser.Email, googleUser.Sub, googleUser.Picture);
            
            _context.Users.Add(user);
            await _context.SaveChangesAsync(cancellationToken);
        }

        var token = _jwtTokenGenerator.GenerateToken(user);

        return new AuthResponseDto(
            token, 
            user.Id, 
            user.Username.Value,  
            user.Email, 
            user.Role.ToString(), 
            user.AvatarUrl
        );
    }
}