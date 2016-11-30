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
        public Client Client { get; set; }
        public Auditorium Auditorium { get; set; }
        public DateTime OrderDate { get; set; }
        public Show Show { get; set; }
        public double Price { get; set; }
        public int Amount { get; set; }
        public bool Paid { get; set; }

    }
}
