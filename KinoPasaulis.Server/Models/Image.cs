using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KinoPasaulis.Server.Models
{
    public class Image
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(40)]
        public string Title { get; set; }

        [Required]
        public string Url { get; set; }

        [MaxLength(50)]
        public string Description { get; set; }

        public DateTime CreatedOn { get; set; }

        public int? MovieId { get; set; }
        public Movie Movie { get; set; }

        public int? MovieCreatorId { get; set; }
        public MovieCreator MovieCreator { get; set; }
    }
}
