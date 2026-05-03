using Microsoft.Extensions.Hosting;

var builder = DistributedApplication.CreateBuilder(args);

var cache = builder.AddRedis("cache");
var postgres = builder.AddPostgres("melodiy-pg-server")
                      .WithDataVolume("melodiy-postgres-data");
var postgresdb = postgres.AddDatabase("melodiydb");

if (builder.Environment.IsDevelopment())
{
    postgres.WithPgWeb(pgWeb => pgWeb.WithHostPort(5050));
}

builder.AddProject<Projects.Melodiy_Web>("webapi")
       .WithExternalHttpEndpoints()
       .WithHttpHealthCheck("/health")
       .WithReference(postgresdb)
       .WaitFor(postgresdb)
       .WithReference(cache)
       .WaitFor(cache);

builder.Build().Run();