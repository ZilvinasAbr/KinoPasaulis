using System.ComponentModel.DataAnnotations;

namespace KinoPasaulis.Server.Models
{
    public class JobAdvertisement
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Title { get; set; }

        [MaxLength(255)]
        public string Description { get; set; }

        public int Duration { get; set; }

        public decimal PayRate { get; set; }

        public int MovieId { get; set; }
        public Movie Movie { get; set; }

        public int SpecialtyId { get; set; }
        public Specialty Specialty { get; set; }
    }
}
