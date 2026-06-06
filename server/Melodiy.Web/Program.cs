using FluentValidation;

using Melodiy.Features.Authentication.Validators;
using Melodiy.Features.Common.Filters;
using Melodiy.Web.DependencyServices;
using Melodiy.Web.Middleware;

using Microsoft.AspNetCore.Mvc;

using Scalar.AspNetCore;

using SharpGrip.FluentValidation.AutoValidation.Mvc.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

// Force validation using FluentValidation
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});

builder.Services.AddControllers(options =>
{
    options.Filters.Add<ModelStateValidationFilter>();
});

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services
       .AddProblemDetails()
       .AddExceptionHandler<GlobalExceptionHandler>()
       .AddAuthorization()
       .AddValidatorsFromAssemblyContaining<LoginRequestValidator>() // Register all request validators
       .AddFluentValidationAutoValidation() 
       .AddMelodiyDbContext(builder.Configuration)
       .AddAuthenticationServices(builder.Configuration)
       .AddUserServices();

var app = builder.Build();
app.UseExceptionHandler();
app.MapDefaultEndpoints();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
    app.MapOpenApi();

    // Could make this available in any environment (depends on Orval setup in the frontend)
    app.MapScalarApiReference();
}

// Custom Middleware

// App Initialisation Checks
app.RegisterMigrations();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapWhen(
    context => !context.Request.Path.StartsWithSegments("/api"),
    spa => spa.UseRouting().UseEndpoints(e => e.MapFallbackToFile("index.html"))
);

app.Run();
