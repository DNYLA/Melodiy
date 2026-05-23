namespace Melodiy.Features.Authentication.Validators;

using FluentValidation;

using Melodiy.Features.Authentication.Contracts.Requests;

using Microsoft.Extensions.Hosting;

public sealed class RegisterRequestValidator : AbstractValidator<RegisterRequest>
{
    /// <summary>
    /// Initializes the validator and configures validation rules for RegisterRequest properties based on the host environment.
    /// </summary>
    /// <param name="env">The host environment used to decide password validation: in Development only a non-empty password is required; otherwise full password rules are applied.</param>
    public RegisterRequestValidator(IHostEnvironment env)
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