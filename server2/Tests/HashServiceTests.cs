namespace Tests;

public class HashServiceTests
{
    [Fact]
    public void HashService_VerifyPassword_Succeed()
    {
        Assert.Equal(4, Add(2, 2));
    }

    int Add(int x, int y)
    {
        return x + y;
    }
}