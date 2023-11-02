using Melodiy.Data;
using Melodiy.Models;
using Melodiy.Services.UserService;
using Moq;

namespace Tests;

public class UserServiceTests
{
    private readonly UserService _sut;
    private readonly Mock<DataContext> _contextMock = new();

    public UserServiceTests()
    {
        _sut = new UserService(_contextMock.Object);
    }

    [Fact]
    public async Task GetById_ShouldReturnUser_WhenUserExists()
    {
        //Arrange
        var rnd = new Random();
        var userId = rnd.Next(100);
        var userDto = new User()
        {
            Id = userId,
            Username = "Bob",
            Password = "HashedPassword"
        };

        _contextMock.Setup(x => x.Users.FirstOrDefault()).Returns(userDto);

        //Act
        var user = await _sut.GetById(userId);
        Console.WriteLine(user.Id);
        //Assert
        Assert.Equal(userId, user.Id);
    }
}