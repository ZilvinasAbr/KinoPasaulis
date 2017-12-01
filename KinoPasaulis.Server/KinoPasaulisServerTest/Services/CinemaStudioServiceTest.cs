using KinoPasaulis.Server.Services;
using KinoPasaulisServerTest.Repositories.CinemaStudio;
using Microsoft.AspNetCore.Hosting.Internal;
using Xunit;

namespace KinoPasaulisServerTest.Services
{
    public class CinemaStudioServiceTest
    {
        [Fact]
        public void Test()
        {
            var movieRepositoryMock = new MovieRepositoryMock();
            var cinemaStudioService = new CinemaStudioService(movieRepositoryMock, null, new HostingEnvironment());

            Assert.True(cinemaStudioService != null);
        }
    }
}
