﻿using System.Collections.Generic;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModel;
using KinoPasaulis.Server.ViewModels;

namespace KinoPasaulis.Server.Services
{
    public interface ICinemaStudioService
    {
        IEnumerable<Movie> SearchMovies(string movieTitle);
        bool AddNewMovie(Movie movie, List<string> imageNames, List<Video> videos, List<MovieCreator> movieCreators , string userId);
        bool DeleteMovie(int id, string userId);
        IEnumerable<CinemaStudioStatisticsViewModel> GetCinemaStudiosStatistics();
        IEnumerable<Movie> GetCinemaStudioMovies(string userId);
        IEnumerable<MovieStatisticsViewModel> GetCinemaStudiosMoviesStatistics(string userId);
        bool AddJobAdvertisement(AddJobAdvertisementViewModel model, string userId);
    }
}
