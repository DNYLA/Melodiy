using Melodiy.Domain.Entities;

namespace Melodiy.Application.Common.Interfaces.Persistance;

public interface IUserRepository
{
    User? GetById(int id);
    User? GetByName(string username);
    void Add(User user);
    void Remove(User user);
    void SaveAsync();
}