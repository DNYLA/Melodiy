
using Melodiy.Api.Filters;
using Melodiy.Api.Middleware;
using Melodiy.Application;
using Melodiy.Infrastructure;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services
        .AddAplication()
        .AddInfrastructure(builder.Configuration);
    // builder.Services.AddControllers(options => options.Filters.Add<ErrorHandlingFilter>());
    builder.Services.AddControllers();

    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
}


var app = builder.Build();
{
    // Configure the HTTP request pipeline.
    // if (app.Environment.IsDevelopment())
    // {
    //     app.UseSwagger();
    //     app.UseSwaggerUI();
    // }

    // app.UseMiddleware<ErrorHandlingMiddleware>();
    app.UseExceptionHandler("/error");
    app.UseHttpsRedirection();
    app.UseAuthentication();
    app.MapControllers();
    app.Run();
}





