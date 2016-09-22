using System.Collections.Generic;
using System.Linq;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModel;
using KinoPasaulis.Server.Repositories.Theather;

namespace KinoPasaulis.Server.Services
{
    public class TheatherService : ITheatherService
    {
        private readonly IEventRepository _eventRepository;
        private readonly IAuditoriumRepository _auditoriumRepository;

        public TheatherService(IEventRepository eventRepository, IAuditoriumRepository auditoriumRepository)
        {
            _eventRepository = eventRepository;
            _auditoriumRepository = auditoriumRepository;
        }

        public void AddNewEvent(EventCreation eventCreation)
        {
            // Get Movie by Id from another repo
            var addedMovie = new Movie {Title = "Suicide Squad"};
            var auditoriasList = new List<Auditorium>();
            foreach (var auditoriumId in eventCreation.AuditoriumIds)
            { 
                var auditorium = _auditoriumRepository.GetAuditoriumById(auditoriumId);

                auditoriasList.Add(auditorium);
            }

            var shows = new List<Show>();
            var days = (eventCreation.EndTime - eventCreation.StartTime).TotalDays;
            for (int i = 0; i < days; i++)
            {
                foreach (var timeSpan in eventCreation.Times)
                {
                    var day = eventCreation.StartTime.AddDays(i);
                    var dateTime = day.Add(timeSpan);
                    var show = new Show
                    {
                        Auditoriums = auditoriasList.ToList(),
                        StartTime = dateTime
                    };

                    shows.Add(show);
                }
            }

            var Event = new Event
            {
                Shows = shows,
                Movie = addedMovie,
                StartTime = eventCreation.StartTime,
                EndTime = eventCreation.EndTime
            };

            _eventRepository.InsertEvent(Event);
        }

        public void AddNewAuditorium(Auditorium auditorium)
        {
            _auditoriumRepository.InsertAuditorium(auditorium);
        }
    }
}
