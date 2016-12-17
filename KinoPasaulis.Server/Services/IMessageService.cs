using System.Collections.Generic;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Services
{
    public interface IMessageService
    {
        IEnumerable<Message> GetMovieCreatorMessages(string userId);
        IEnumerable<Message> GetCinemaStudioMessages(string userId);
        bool AddMessage(Message message, string userId, int cinemaStudioId);
    }
}
