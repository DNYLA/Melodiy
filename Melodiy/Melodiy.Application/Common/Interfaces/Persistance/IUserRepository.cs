using Melodiy.Domain.Entities;

namespace Melodiy.Application.Common.Interfaces.Persistance;

public interface IUserRepository
{
    User? GetById(int id);
    User? GetByUsername(string username);
    void Add(User user);
}