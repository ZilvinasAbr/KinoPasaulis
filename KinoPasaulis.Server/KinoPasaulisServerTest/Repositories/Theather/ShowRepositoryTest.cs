using System;
using System.Collections.Generic;
using System.Linq;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Repositories.Theather;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace KinoPasaulisServerTest.Repositories.Theather
{
    public class ShowRepositoryTest : IDisposable
    {
        private readonly DbContextOptions<ApplicationDbContext> _options;

        public ShowRepositoryTest()
        {
            _options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("Database for tests")
                .Options;
        }

        [Fact]
        public void InsertsShow()
        {
            var dateTime = DateTime.Now;

            using (var context = new ApplicationDbContext(_options))
            {
                var showRepository = new ShowRepository(context);
                showRepository.InsertShow(new Show{StartTime = dateTime });
            }

            using (var context = new ApplicationDbContext(_options))
            {
                Assert.Equal(1, context.Shows.Count());
                Assert.Equal(dateTime, context.Shows.Single().StartTime);
            }
        }

        [Fact]
        public void InsertsShows()
        {
            var dateTime1 = DateTime.Now;
            var dateTime2 = DateTime.Now + TimeSpan.FromDays(7);

            var shows = new List<Show>
            {
                new Show {StartTime = dateTime1},
                new Show {StartTime = dateTime2}
            };

            using (var context = new ApplicationDbContext(_options))
            {
                var showRepository = new ShowRepository(context);
                showRepository.InsertShows(shows);
            }

            using (var context = new ApplicationDbContext(_options))
            {
                Assert.Equal(2, context.Shows.Count());
                Assert.NotNull(context.Shows.SingleOrDefault(s => s.StartTime == dateTime1));
                Assert.NotNull(context.Shows.SingleOrDefault(s => s.StartTime == dateTime2));
            }
        }

        [Fact]
        public void GetsEvents()
        {
            var dateTime1 = DateTime.Now;
            var dateTime2 = DateTime.Now + TimeSpan.FromDays(7);

            var mockEvents = new List<Show>
            {
                new Show{StartTime = dateTime1},
                new Show{StartTime = dateTime2}
            };

            using (var context = new ApplicationDbContext(_options))
            {
                context.Shows.AddRange(mockEvents);
                context.SaveChanges();
            }

            using (var context = new ApplicationDbContext(_options))
            {
                var showRepository = new ShowRepository(context);
                var events = showRepository.GetEvents().ToList();

                Assert.Equal(2, events.Count);
                Assert.NotNull(events.SingleOrDefault(e => e.StartTime == dateTime1));
                Assert.NotNull(events.SingleOrDefault(e => e.StartTime == dateTime2));
            }
        }

        [Fact]
        public void GetsShowById()
        {
            using (var context = new ApplicationDbContext(_options))
            {
                context.Shows.AddRange(
                    new Show{Id = 1},
                    new Show{Id = 2}
                );
                context.SaveChanges();
            }

            using (var context = new ApplicationDbContext(_options))
            {
                var showRepository = new ShowRepository(context);
                var show1 = showRepository.GetShowById(1);
                var show2 = showRepository.GetShowById(2);

                Assert.NotNull(show1);
                Assert.NotNull(show2);
                Assert.Equal(1, show1.Id);
                Assert.Equal(2, show2.Id);
            }
        }

        [Fact]
        public void DeletesShow()
        {
            using (var context = new ApplicationDbContext(_options))
            {
                context.Shows.AddRange(
                    new Show { Id = 1 },
                    new Show { Id = 2 }
                );
                context.SaveChanges();
            }

            using (var context = new ApplicationDbContext(_options))
            {
                var showRepository = new ShowRepository(context);
                showRepository.DeleteShow(1);
            }

            using (var context = new ApplicationDbContext(_options))
            {
                Assert.Equal(1, context.Shows.Count());
                Assert.Null(context.Shows.SingleOrDefault(s => s.Id == 1));
            }
        }

        [Fact]
        public void DeletesAllShowsByEventId()
        {
            var mockEvents = new List<Event>
            {
                new Event{Id = 1},
                new Event{Id = 2}
            };

            var mockShows = new List<Show>
            {
                new Show {Id = 1, Event = mockEvents[0]},
                new Show {Id = 2, Event = mockEvents[0]},
                new Show {Id = 3, Event = mockEvents[1]}
            };

            using (var context = new ApplicationDbContext(_options))
            {
                context.Events.AddRange(mockEvents);
                context.SaveChanges();
                context.Shows.AddRange(mockShows);
                context.SaveChanges();
            }

            using (var context = new ApplicationDbContext(_options))
            {
                var showRepository = new ShowRepository(context);
                showRepository.DeleteAllShowsByEventId(1);
            }

            using (var context = new ApplicationDbContext(_options))
            {
                Assert.Equal(1, context.Shows.Count());
                Assert.Equal(0, context.Shows.Count(s => s.Event.Id == 1));
            }
        }

        [Fact]
        public void UpdatesShow()
        {
            var dateTime = DateTime.Now;
            var dateTime2 = DateTime.Now + TimeSpan.FromDays(7);

            var mockShows = new List<Show>
            {
                new Show {Id = 1, StartTime = dateTime},
                new Show {Id = 2},
                new Show {Id = 3}
            };

            using (var context = new ApplicationDbContext(_options))
            {
                context.Shows.AddRange(mockShows);
                context.SaveChanges();
            }

            using (var context = new ApplicationDbContext(_options))
            {
                var showRepository = new ShowRepository(context);
                var show = mockShows[0];
                show.StartTime = dateTime2;
                showRepository.UpdateShow(show);
            }

            using (var context = new ApplicationDbContext(_options))
            {
                Assert.NotNull(context.Shows.SingleOrDefault(s => s.Id == 1));
                Assert.Equal(dateTime2, context.Shows.Single(s => s.Id == 1).StartTime);
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
