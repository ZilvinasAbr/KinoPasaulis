using System;

namespace KinoPasaulis.Server.Models
{
    public class Message
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public DateTime SentAt { get; set; }

        public DateTime? ReadAt { get; set; }

        public int MovieCreatorId { get; set; }

        public MovieCreator MovieCreator { get; set; }

        public int CinemaStudioId { get; set; }

        public CinemaStudio CinemaStudio { get; set; }
    }
}
