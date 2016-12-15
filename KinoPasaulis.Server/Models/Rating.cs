using System;
using System.ComponentModel.DataAnnotations;

namespace KinoPasaulis.Server.Models
{
    public class Rating
    {
        public int Id { get; set; }

        [Required]
        [Range(1, 10)]
        public int Value { get; set; }

        public string Comment { get; set; }

        [Range(1,2)]
        public byte RatingType { get; set; }

        public DateTime RatingCreatedOn { get; set; }
        public DateTime RatingModifiedOn { get; set; }
        public DateTime LastLoggedOn { get; set; }

        public int ClientId { get; set; }
        public Client Client { get; set; }

        public int MovieId { get; set; }
        public Movie Movie { get; set; }
    }
}
