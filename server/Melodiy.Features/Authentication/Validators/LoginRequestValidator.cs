namespace Melodiy.Features.Authentication.Validators;

using FluentValidation;

using Melodiy.Features.Authentication.Contracts.Requests;

using Microsoft.Extensions.Hosting;

public sealed class LoginRequestValidator : AbstractValidator<LoginRequest>
{
    /// <summary>
    /// Initializes a new <see cref="LoginRequestValidator"/> and configures validation rules: username rules are always applied and password rules are applied based on the hosting environment.
    /// </summary>
    /// <param name="env">The host environment used to determine password validation behavior; when in development only a non-empty password is required, otherwise full password rules are applied.</param>
    public LoginRequestValidator(IHostEnvironment env)  
    {
        RuleFor(x => x.Username).ApplyUsernameRules();

        // I'm lazy 
        if (!env.IsDevelopment())
        {
            RuleFor(x => x.Password).ApplyPasswordRules();
        }
        else
        {
            RuleFor(x => x.Password).NotEmpty();
        }
    }
}