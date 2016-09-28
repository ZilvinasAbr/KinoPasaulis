using System.Collections.Generic;

namespace KinoPasaulis.Server.Models
{
    public class Theather
    {
        public int Id { get; set; }
        public List<Event> Events { get; set; }
        public List<Auditorium> Auditoriums { get; set; }
    }
}
