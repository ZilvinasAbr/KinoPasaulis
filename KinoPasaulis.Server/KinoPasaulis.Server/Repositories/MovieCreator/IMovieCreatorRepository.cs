using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinoPasaulis.Server.Repositories.MovieCreator
{
    public interface IMovieCreatorRepository
    {
        Models.MovieCreator GetMovieCreatorById(int movieCreatorId);
    }
}
