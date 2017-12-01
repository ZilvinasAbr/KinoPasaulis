using System;
using System.ComponentModel.DataAnnotations;

namespace KinoPasaulis.Server.Models
{
    public class Video
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(40)]
        public string Title { get; set; }

        [Required]
        public string Url { get; set; }

        [Required]
        [MaxLength(50)]
        public string Description { get; set; }

        public DateTime CreatedOn { get; set; }

        public int MovieId { get; set; }
        public Movie Movie { get; set; }
    }
}
