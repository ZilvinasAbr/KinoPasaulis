using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Services
{
    public interface ICinemaStudioService
    {
        IEnumerable<Movie> SearchMovies(string movieTitle);
    }
}
