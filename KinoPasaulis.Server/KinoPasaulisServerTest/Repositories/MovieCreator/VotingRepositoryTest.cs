using System.Collections.Generic;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Repositories.MovieCreator;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace KinoPasaulisServerTest.Repositories.MovieCreator
{
    public class VotingRepositoryTest
    {
        private readonly DbContextOptions<ApplicationDbContext> _options;

        public VotingRepositoryTest()
        {
            _options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("Database for tests")
                .Options;
        }

        [Fact]
        public void GetsVotingById()
        {
            var mockVotings = new List<Voting>
            {
                new Voting { Id = 1},
                new Voting { Id = 2},
                new Voting { Id = 3}
            };

            using (var context = new ApplicationDbContext(_options))
            {
                context.Votings.AddRange(mockVotings);
                context.SaveChanges();
            }

            using (var context = new ApplicationDbContext(_options))
            {
                var votingRepository = new VotingRepository(context);
                var result = votingRepository.GetVotingById(1);

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
