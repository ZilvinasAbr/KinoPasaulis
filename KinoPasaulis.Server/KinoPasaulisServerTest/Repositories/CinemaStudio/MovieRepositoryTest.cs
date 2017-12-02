using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Repositories.CinemaStudio;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;
using Xunit.Abstractions;

namespace KinoPasaulisServerTest.Repositories.CinemaStudio
{
    public class MovieRepositoryTest
    {
        private readonly ITestOutputHelper _output;

        public MovieRepositoryTest(ITestOutputHelper output)
        {
            _output = output;
        }

        [Fact]
        public void GetsAllMovies()
        {
            var mockContext = GetApplicationDbContextMock();

            var movieRepository = new MovieRepository(mockContext.Object);

            var movies = movieRepository.GetMovies().ToList();

            Assert.Equal(4, movies.Count);
            Assert.Equal("Movie 1", movies[0].Title);
            Assert.Equal("Movie 2", movies[1].Title);
            Assert.Equal("Movie 3", movies[2].Title);
            Assert.Equal("Another One", movies[3].Title);
        }

        [Fact]
        public void GetsMovieById()
        {
            var mockContext = GetApplicationDbContextMock();

            var movieRepository = new MovieRepository(mockContext.Object);

            var movie = movieRepository.GetMovieById(2);

            Assert.NotNull(movie);
            Assert.Equal(2, movie.Id);
            Assert.Equal("Movie 2", movie.Title);
        }

        [Fact]
        public void GetsMoviesByTitle()
        {
            var mockContext = GetApplicationDbContextMock();

            var movieRepository = new MovieRepository(mockContext.Object);

            var movies = movieRepository.GetMoviesByTitle("Movie").ToList();

            Assert.Equal(3, movies.Count);
            Assert.Equal("Movie 1", movies[0].Title);
            Assert.Equal("Movie 2", movies[1].Title);
            Assert.Equal("Movie 3", movies[2].Title);
        }

        [Fact]
        public void GetsMoviesByEmptyTitle()
        {
            var mockContext = GetApplicationDbContextMock();

            var movieRepository = new MovieRepository(mockContext.Object);

            var movies = movieRepository.GetMoviesByTitle("").ToList();

            Assert.Equal(4, movies.Count);
            Assert.Equal("Movie 1", movies[0].Title);
            Assert.Equal("Movie 2", movies[1].Title);
            Assert.Equal("Movie 3", movies[2].Title);
            Assert.Equal("Another One", movies[3].Title);
        }

        [Fact]
        public void InsertsAMovie()
        {
            var mockContext = GetApplicationDbContextMock();

            var movieRepository = new MovieRepository(mockContext.Object);

            var movie = new Movie {Title = "Movie to be inserted"};

            movieRepository.InsertMovie(movie);

            Assert.Equal(5, mockContext.Object.Movies.Count());
            Assert.Equal("Movie to be inserted",
                mockContext.Object.Movies.SingleOrDefault(m => m.Title == "Movie to be inserted").Title);
        }

        [Fact]
        public void DeletesAMovie()
        {
            var mockContext = GetApplicationDbContextMock();

            var movieRepository = new MovieRepository(mockContext.Object);
            
            var result = movieRepository.DeleteMovie(2);

            Assert.True(result);
            Assert.Null(mockContext.Object.Movies.SingleOrDefault(m => m.Id == 2));
            Assert.Equal(3, mockContext.Object.Movies.Count());
        }

        [Fact]
        public void DoesNotDeleteWhenNotFound()
        {
            var mockContext = GetApplicationDbContextMock();

            var movieRepository = new MovieRepository(mockContext.Object);

            var result = movieRepository.DeleteMovie(10);

            Assert.False(result);
            Assert.Equal(4, mockContext.Object.Movies.Count());
        }

        [Fact]
        public void UpdatesAMovie()
        {
            var mockContext = GetApplicationDbContextMock();

            var movieRepository = new MovieRepository(mockContext.Object);

            var movie = movieRepository.GetMovieById(1);
            movie.Title = "Updated Title";

            movieRepository.UpdateMovie(movie);
            Assert.Equal("Updated Title", mockContext.Object.Movies.SingleOrDefault(m => m.Id == 1).Title);
        }

        private static Mock<ApplicationDbContext> GetApplicationDbContextMock()
        {
            var data = new List<Movie>
            {
                new Movie {Id = 1, Title = "Movie 1"},
                new Movie {Id = 2, Title = "Movie 2"},
                new Movie {Id = 3, Title = "Movie 3"},
                new Movie {Id = 4, Title = "Another One"}
            };

            var dataQueryable = data.AsQueryable();

            var mockSet = new Mock<DbSet<Movie>>();
            mockSet.As<IQueryable<Movie>>().Setup(m => m.Provider).Returns(dataQueryable.Provider);
            mockSet.As<IQueryable<Movie>>().Setup(m => m.Expression).Returns(dataQueryable.Expression);
            mockSet.As<IQueryable<Movie>>().Setup(m => m.ElementType).Returns(dataQueryable.ElementType);
            mockSet.As<IQueryable<Movie>>().Setup(m => m.GetEnumerator()).Returns(dataQueryable.GetEnumerator());
            mockSet.Setup(m => m.Add(It.IsAny<Movie>())).Callback<Movie>(s => data.Add(s));
            mockSet.Setup(m => m.Remove(It.IsAny<Movie>())).Callback<Movie>(s => data.Remove(s));
            mockSet.Setup(m => m.Update(It.IsAny<Movie>())).Callback<Movie>(s =>
            {
                var index = data.FindIndex(m => m.Id == s.Id);
                data[index] = s;
            });

            var mockContext = new Mock<ApplicationDbContext>();
            mockContext.Setup(c => c.Movies).Returns(mockSet.Object);

            return mockContext;
        }
    }
}
