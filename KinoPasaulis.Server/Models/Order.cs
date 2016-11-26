using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KinoPasaulis.Server.Models
{
    public class Order
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }
        public ApplicationUser User { get; set; }
        public Auditorium Auditorium { get; set; }
        public DateTime OrderDate { get; set; }
        public Show Show { get; set; }

    }
}
