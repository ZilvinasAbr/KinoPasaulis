namespace KinoPasaulis.Server.Models
{
    public class MovieCreatorMovie
    {

        public bool IsConfirmed { get; set; }

        public int MovieCreatorId { get; set; }
        public MovieCreator MovieCreator { get; set; }

        public int MovieId { get; set; }
        public Movie Movie { get; set; }
    }
}
