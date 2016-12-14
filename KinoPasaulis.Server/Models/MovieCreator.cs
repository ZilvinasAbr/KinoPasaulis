using System;
using System.Collections.Generic;

namespace KinoPasaulis.Server.Models
{
    public class MovieCreator
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public DateTime BirthDate { get; set; }

        public string Description { get; set; }

        public DateTime RegisterDate { get; set; }

        public DateTime LastEditDate { get; set; }

        public List<Image> Images { get; set; }
        public List<MovieCreatorMovie> MovieCreatorMovies { get; set; }
    }
}
