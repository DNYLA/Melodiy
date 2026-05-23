namespace Melodiy.Features.Authentication.Validators;

using FluentValidation;

public static class AuthenticationValidationRules
{
    extension<T>(IRuleBuilder<T, string> ruleBuilder)
    {
        public IRuleBuilderOptions<T, string> ApplyPasswordRules()
        {
            return ruleBuilder
                .NotEmpty()
                .MinimumLength(8)
                .Matches("[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
                .Matches("[0-9]").WithMessage("Password must contain at least one number.")
                .Matches("[^a-zA-Z0-9]").WithMessage("Password must contain at least one special character.");
        }

        public IRuleBuilderOptions<T, string> ApplyUsernameRules()
        {
            return ruleBuilder
                .NotEmpty()
                .Length(3, 30);
        }
    }
}
