using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KinoPasaulis.Server.Models
{
    public class Movie
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Title { get; set; }

        [Required]
        public DateTime ReleaseDate { get; set; }

        public decimal Budget { get; set; }

        [Required]
        public string Description { get; set; }

        public decimal Gross { get; set; }

        [Required]
        [MaxLength(50)]
        public string Language { get; set; }

        [MaxLength(20)]
        public string AgeRequirement { get; set; }
        
        public int CinemaStudioId { get; set; }
        public CinemaStudio CinemaStudio { get; set; }

        public List<Image> Images { get; set; }
        public List<Video> Videos { get; set; }
        public List<MovieCreatorMovie> MovieCreatorMovies { get; set; }
    }
}
