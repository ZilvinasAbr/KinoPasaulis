using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinoPasaulis.Server.Models
{
    public class Creator
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public DateTime BirthDate { get; set; }
    }
}
