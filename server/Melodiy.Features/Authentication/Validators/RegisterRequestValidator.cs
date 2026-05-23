namespace Melodiy.Features.Authentication.Validators;

using FluentValidation;

using Melodiy.Features.Authentication.Contracts.Requests;

using Microsoft.Extensions.Hosting;

public sealed class RegisterRequestValidator : AbstractValidator<RegisterRequest>
{
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