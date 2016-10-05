using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinoPasaulis.Server.Models
{
    public class Company
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public string Address { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }
    }
}
