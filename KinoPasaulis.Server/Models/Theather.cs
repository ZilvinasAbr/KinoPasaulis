using System.Collections.Generic;

namespace KinoPasaulis.Server.Models
{
    public class Theather
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public List<Event> Events { get; set; }
        public List<Auditorium> Auditoriums { get; set; }
    }
}
