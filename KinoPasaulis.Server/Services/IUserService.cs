using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Services
{
    public interface IUserService
    {
        Theather GetTheatherByUserId(string id);
        Theather GetTheatherByUserIdIncludeEvents(string id);
        Client GetClientById(int id);
        Client GetClientByUserId(string id);
    }
}
