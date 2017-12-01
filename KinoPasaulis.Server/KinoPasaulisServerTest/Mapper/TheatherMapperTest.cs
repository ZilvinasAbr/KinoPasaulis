using System;
using System.Collections.Generic;
using System.Text;
using KinoPasaulis.Server.Mapper;
using KinoPasaulis.Server.Models;
using Xunit;

namespace KinoPasaulisServerTest.Mapper
{
    public class TheatherMapperTest
    {
        private readonly TheatherMapper _theatherMapper;

        public TheatherMapperTest()
        {
            _theatherMapper = new TheatherMapper();
        }

        [Fact]
        public void MapOneAuditoriumTest()
        {
            var auditorium = new Auditorium
            {
                Id = 1,
                Name = "Test Name",
                Seats = 10
            };

            var result = _theatherMapper.MapOneAuditorium(auditorium);

            Assert.Equal(1, result.Id);
            Assert.Equal("Test Name", result.Name);
            Assert.Equal(10, result.Seats);
        }
    }
}
