using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinoPasaulis.Server.Models
{
    public class Order
    {
        public int Id { get; set; }
        public ApplicationUser User { get; set; }
        public DateTime OrderDate { get; set; }
        public Show Show { get; set; }

    }
}
