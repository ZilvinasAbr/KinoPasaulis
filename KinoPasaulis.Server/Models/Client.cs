using System;

namespace KinoPasaulis.Server.Models
{
    public class Client
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public DateTime RegisterDate { get; set; }

        public DateTime LastEditDate { get; set; }

        public DateTime LastLoginDate { get; set; }

        public bool Active { get; set; }

        public bool Blocked { get; set; }
    }
}
