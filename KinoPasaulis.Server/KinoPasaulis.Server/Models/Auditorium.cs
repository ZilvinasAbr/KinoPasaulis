using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KinoPasaulis.Server.Models
{
    public class Auditorium
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }
        public int Seats { get; set; }
        public string Name { get; set; }
        public Theather Theather { get; set; }
    }
}
