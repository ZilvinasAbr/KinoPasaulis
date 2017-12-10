using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Repositories.MovieCreator;
using KinoPasaulis.Server.Repositories.Theather;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace KinoPasaulisServerTest.Repositories.MovieCreator
{
    public class MovieCreatorRepositoryTest : IDisposable
    {
        private readonly DbContextOptions<ApplicationDbContext> _options;

        public MovieCreatorRepositoryTest()
        {
            _options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("Database for tests")
                .Options;
        }

        [Fact]
        public void GetsMovieCreatorById()
        {
            var dateTime = DateTime.Now;

            var mockMovieCreators = new List<KinoPasaulis.Server.Models.MovieCreator>
            {
                new KinoPasaulis.Server.Models.MovieCreator { Id = 1},
                new KinoPasaulis.Server.Models.MovieCreator { Id = 2},
                new KinoPasaulis.Server.Models.MovieCreator { Id = 3}
            };

            using (var context = new ApplicationDbContext(_options))
            {
                context.MovieCreators.AddRange(mockMovieCreators);
                context.SaveChanges();
            }

            using (var context = new ApplicationDbContext(_options))
            {
                var movieCreatoRepository = new MovieCreatorRepository(context);
                var result = movieCreatoRepository.GetMovieCreatorById(1);

                Assert.NotNull(result);
                Assert.Equal(1, result.Id);
            }
        }

        public void Dispose()
        {
            using (var context = new ApplicationDbContext(_options))
            {
                context.Database.EnsureDeleted();
            }
        }
    }
}
