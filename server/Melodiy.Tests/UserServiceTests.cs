
using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Application.Services.UserService;
using Melodiy.Domain.Entities;
using Melodiy.Infrastructure.Persistance;
using Melodiy.Tests.Fixtures;
using Moq;

namespace Tests;

public class UserServiceTests : IClassFixture<DataContextFixture>
{
    private readonly UserService _sut;
    private readonly DataContext _context;

    public UserServiceTests(DataContextFixture fixture)
    {
        _context = fixture.Context;
        _sut = new UserService(fixture.Context);
    }

    private async Task<User> CreateSeedUser()
    {
        var userId = new Random().Next(100);
        var user = new User()
        {
            Id = userId,
            Username = "Bob",
            Password = "HashedPassword"
        };
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return user;
    }

    [Fact]
    public async Task Create_ShouldReturnUser_WhenUserDoesntExists()
    {
        //Arrange
        var user = new User()
        {
            Username = "Bob",
            Password = "HashedPassword"
        };

        //Act
        var createdUser = await _sut.Create(user.Username, user.Password);

        //Assert
        Assert.NotNull(createdUser);
        Assert.Equal(createdUser.Username, user.Username);
    }

    [Fact]
    public async Task Create_ShouldReturnNull_WhenUserExists()
    {
        //Arrange
        var dbUser = await CreateSeedUser();

        //Act
        var createdUser = await _sut.Create(dbUser.Username, dbUser.Password);

        //Assert
        Assert.Null(createdUser);
    }

    [Fact]
    public async Task GetById_ShouldReturnUser_WhenUserExists()
    {

        //Arrange
        var dbUser = await CreateSeedUser();

        //Act
        var user = await _sut.GetById(dbUser.Id);

        //Assert
        Assert.NotNull(user);
        Assert.Equal(dbUser.Id, user.Id);
    }

    [Fact]
    public async Task GetById_ShouldReturnNull_WhenUserDoesntExist()
    {
        //Arrange

        //Act
        var user = await _sut.GetById(1);

        //Assert
        Assert.Null(user);
    }
}