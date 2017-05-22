using System.Collections.Generic;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModel;
using KinoPasaulis.Server.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace KinoPasaulis.Server.Services
{
    public interface ICinemaStudioService
    {
        IEnumerable<CinemaStudioStatisticsViewModel> GetCinemaStudiosStatistics();
        IEnumerable<Movie> GetCinemaStudioMovies(string userId);
        IEnumerable<MovieStatisticsViewModel> GetCinemaStudiosMoviesStatistics(string userId);
        object GetCinemaStudioMovie(int movieId, string userId);
        IEnumerable<Specialty> GetSpecialties();
    }
}
