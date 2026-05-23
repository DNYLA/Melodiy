namespace Melodiy.Features.Authentication.Validators;

using FluentValidation;

using Melodiy.Features.Authentication.Contracts.Requests;

public sealed class LoginRequestValidator : AbstractValidator<LoginRequest>
{
    public LoginRequestValidator()  
    {
        RuleFor(x => x.Username).ApplyUsernameRules();
        RuleFor(x => x.Password).NotEmpty();
    }
}