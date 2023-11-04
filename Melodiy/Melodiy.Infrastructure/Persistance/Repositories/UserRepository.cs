using Melodiy.Application.Common.Interfaces.Persistance;
using Melodiy.Domain.Entities;

namespace Melodiy.Infrastructure.Persistance;

public class UserRepository : IUserRepository
{
    public void Add(User user)
    {
        throw new NotImplementedException();
    }

    public User? GetById(int id)
    {
        throw new NotImplementedException();
    }

    public User? GetByName(string username)
    {
        throw new NotImplementedException();
    }

    public void Remove(User user)
    {
        throw new NotImplementedException();
    }

    public void SaveAsync()
    {
        throw new NotImplementedException();
    }
}