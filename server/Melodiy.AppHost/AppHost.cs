using Melodiy.AppHost;

using Microsoft.Extensions.Hosting;

var builder = DistributedApplication.CreateBuilder(args);

var cache = builder.AddRedis("cache")
                   .WithContainerGrouping()
                   .WithLifetime(ContainerLifetime.Persistent)
                   .WithHostPort(6379);
var postgres = builder.AddPostgres("melodiy-pg-server")
                      .WithContainerGrouping()
                      .WithLifetime(ContainerLifetime.Persistent)
                      .WithHostPort(5432)
                      .WithDataVolume("melodiy-postgres-data", isReadOnly: false);
var postgresdb = postgres.AddDatabase("melodiydb");

// TODO: Aspire wouldn't ever be used for production should I remove this?
if (builder.Environment.IsDevelopment())
{
    postgres.WithPgWeb(pgWeb => pgWeb.WithContainerGrouping().WithHostPort(5050));
}

builder.AddProject<Projects.Melodiy_Web>("webapi")
       .WithExternalHttpEndpoints()
       .WithHttpHealthCheck("/health")
       .WithReference(postgresdb)
       .WaitFor(postgresdb)
       .WithReference(cache)
       .WaitFor(cache);

builder.Build().Run();