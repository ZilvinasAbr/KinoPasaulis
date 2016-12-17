using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinoPasaulis.Server.Models
{
    public class Message
    {
        public int Id { get; set; }

        public int MovieCreatorId { get; set; }

        public MovieCreator MovieCreator { get; set; }

        public int CinemaStudioId { get; set; }

        public CinemaStudio CinemaStudio { get; set; }

        public string Text { get; set; }

        public DateTime SentAt { get; set; }

        public DateTime ReadAt { get; set; }
    }
}
