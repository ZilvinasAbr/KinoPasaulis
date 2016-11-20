using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace KinoPasaulis.Server.Models
{
    public class Movie
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime ReleaseDate { get; set; }
        public decimal Budget { get; set; }
        public string Description { get; set; }
        public decimal Gross { get; set; }
        public string Language { get; set; }
        public string AgeRequirement { get; set; }
        
        public int CinemaStudioId { get; set; }
        public CinemaStudio CinemaStudio { get; set; }
    }
}
