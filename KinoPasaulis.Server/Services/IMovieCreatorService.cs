using System.Collections.Generic;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Services
{
    public interface IMovieCreatorService
    {
        IEnumerable<MovieCreator> GetMovieCreators();
    }
}
