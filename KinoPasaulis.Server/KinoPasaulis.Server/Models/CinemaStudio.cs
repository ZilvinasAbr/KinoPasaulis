﻿using System.Collections.Generic;

namespace KinoPasaulis.Server.Models
{
    public class CinemaStudio
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public string Address { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public List<Movie> Movies { get; set; }
    }
}