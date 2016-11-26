using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace KinoPasaulis.Server.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
        public Theather Theather { get; set; }

        public MovieCreator MovieCreator { get; set; }

        public CinemaStudio CinemaStudio { get; set; }

        public Client Client { get; set; }
    }
}
