using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KinoPasaulis.Server.Models.ViewModel
{
    public class AddMovieViewModel
    {
        [Required]
        [MaxLength(50)]
        public string Title { get; set; }

        [Required]
        [Range(0, 23)]
        public int Hours { get; set; }

        [Required]
        [Range(0, 59)]
        public int Minutes { get; set; }

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

        public List<string> ImageNames{ get; set; }
        public List<Video> Videos { get; set; }
        public List<MovieCreator> MovieCreators { get; set; }
        public List<string> ImageTitles { get; set; }
        public List<string> ImageDescriptions { get; set; }
    }
}
