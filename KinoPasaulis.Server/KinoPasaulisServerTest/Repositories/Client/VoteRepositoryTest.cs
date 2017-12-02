using System;
using System.Collections.Generic;
using System.Linq;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Repositories.Client;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace KinoPasaulisServerTest.Repositories.Client
{
    public class VoteRepositoryTest
    {
        [Fact]
        public void GetsVoteById()
        {
            var mockContext = GetApplicationDbContextMock();

            var voteRepository = new VoteRepository(mockContext.Object);

            var vote = voteRepository.GetVoteById(2);

            Assert.NotNull(vote);
            Assert.Equal(2, vote.Id);
        }

        [Fact]
        public void InsertsVote()
        {
            var mockContext = GetApplicationDbContextMock();
            var dateTimeNow = DateTime.Now;

            var voteRepository = new VoteRepository(mockContext.Object);

            var vote = new Vote {Id = 4, VotedOn = dateTimeNow};

            voteRepository.InsertVote(vote);

            Assert.Equal(4, mockContext.Object.Votes.Count());
            Assert.Equal(dateTimeNow, mockContext.Object.Votes.SingleOrDefault(v => v.Id == vote.Id).VotedOn);
        }

        [Fact]
        public void UpdatesVote()
        {
            var mockContext = GetApplicationDbContextMock();
            var dateTimeNow = DateTime.Now;

            var voteRepository = new VoteRepository(mockContext.Object);

            var vote = voteRepository.GetVoteById(2);
            vote.VotedOn = dateTimeNow + TimeSpan.FromDays(2);

            voteRepository.UpdateVote(vote);
            Assert.Equal(dateTimeNow + TimeSpan.FromDays(2),
                mockContext.Object.Votes.SingleOrDefault(v => v.Id == 2).VotedOn);
        }

        private static Mock<ApplicationDbContext> GetApplicationDbContextMock()
        {
            var data = new List<Vote>
            {
                new Vote{Id = 1, VotedOn = DateTime.Now},
                new Vote{Id = 2, VotedOn = DateTime.Now},
                new Vote{Id = 3, VotedOn = DateTime.Now}
            };

            var dataQueryable = data.AsQueryable();

            var mockSet = new Mock<DbSet<Vote>>();
            mockSet.As<IQueryable<Vote>>().Setup(m => m.Provider).Returns(dataQueryable.Provider);
            mockSet.As<IQueryable<Vote>>().Setup(m => m.Expression).Returns(dataQueryable.Expression);
            mockSet.As<IQueryable<Vote>>().Setup(m => m.ElementType).Returns(dataQueryable.ElementType);
            mockSet.As<IQueryable<Vote>>().Setup(m => m.GetEnumerator()).Returns(dataQueryable.GetEnumerator());
            mockSet.Setup(m => m.Add(It.IsAny<Vote>())).Callback<Vote>(s => data.Add(s));
            mockSet.Setup(m => m.Remove(It.IsAny<Vote>())).Callback<Vote>(s => data.Remove(s));
            mockSet.Setup(m => m.Update(It.IsAny<Vote>())).Callback<Vote>(s =>
            {
                var index = data.FindIndex(m => m.Id == s.Id);
                data[index] = s;
            });

            var mockContext = new Mock<ApplicationDbContext>();
            mockContext.Setup(c => c.Votes).Returns(mockSet.Object);

            return mockContext;
        }
    }
}
