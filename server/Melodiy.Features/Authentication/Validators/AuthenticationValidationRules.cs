namespace Melodiy.Features.Authentication.Validators;

using FluentValidation;

public static class AuthenticationValidationRules
{
    extension<T>(IRuleBuilder<T, string> ruleBuilder)
    {
        /// <summary>
        /// Applies a standard set of password validation rules to the current string rule builder.
        /// </summary>
        /// <returns>The rule builder options configured to require a non-empty password of at least 8 characters with at least one uppercase letter, one digit, and one special character.</returns>
        public IRuleBuilderOptions<T, string> ApplyPasswordRules()
        {
            return ruleBuilder
                .NotEmpty()
                .MinimumLength(8)
                .Matches("[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
                .Matches("[0-9]").WithMessage("Password must contain at least one number.")
                .Matches("[^a-zA-Z0-9]").WithMessage("Password must contain at least one special character.");
        }

        /// <summary>
        /// Configures validation rules for a username on the wrapped rule builder.
        /// </summary>
        /// <returns>Rule builder options that enforce the string is not empty and has length between 3 and 30 characters (inclusive).</returns>
        public IRuleBuilderOptions<T, string> ApplyUsernameRules()
        {
            return ruleBuilder
                .NotEmpty()
                .Length(3, 30);
        }
    }
}
