namespace Melodiy.AppHost;

/// <summary>
/// Extension methods for container resource configuration.
/// </summary>
public static class ContainerResourceExtensions
{
    private const string ProjectName = "melodiy-aspire"; // Using melodiy-aspire to avoid conflicts with development & production testing using docker-compose files.

    /// <summary>
    /// Adds a Docker Compose project label to group this container with other project containers.
    /// Reference: https://github.com/microsoft/aspire/issues/4425 for a potential rework built in to aspire
    /// </summary>
    /// <remarks>
    /// <para>
    /// Aspire runs containers directly via the Docker API rather than Docker Compose, so containers
    /// appear ungrouped in container management tools. This method adds the standard
    /// <c>com.docker.compose.project</c> label that Docker Compose normally sets automatically.
    /// </para>
    /// <para>
    /// Container management tools that recognise this label for grouping include:
    /// OrbStack, Docker Desktop, Podman Desktop, Lazydocker, and Portainer.
    /// </para>
    /// </remarks>
    /// <typeparam name="T">The container resource type.</typeparam>
    /// <param name="builder">The container resource builder.</param>
    /// <summary>
    /// Adds Docker Compose labels to the container runtime arguments so the container is grouped under the "melodiy-aspire" project and the "cache" service.
    /// </summary>
    /// <returns>The updated resource builder with the added runtime arguments for container grouping.</returns>
    public static IResourceBuilder<T> WithContainerGrouping<T>(this IResourceBuilder<T> builder)
        where T : ContainerResource
    {
        return builder.WithContainerRuntimeArgs(
            "--label", $"com.docker.compose.project={ProjectName}",
            "--label", "com.docker.compose.service=cache"
        );
    }
}