using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.ViewModels
{
    public class AddJobAdvertisementViewModel
    {
        [Required]
        [MaxLength(50)]
        public string Title { get; set; }

        [MaxLength(255)]
        public string Description { get; set; }

        public int Duration { get; set; }

        public decimal PayRate { get; set; }

        [Required]
        public Movie Movie { get; set; }

        [Required]
        public Specialty Specialty { get; set; }
    }
}
