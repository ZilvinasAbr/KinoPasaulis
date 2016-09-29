using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KinoPasaulis.Server.Models
{
    public class Show
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public Auditorium Auditorium { get; set; }
        public Event Event { get; set; }
        public List<Order> Orders { get; set; }
    }
}
