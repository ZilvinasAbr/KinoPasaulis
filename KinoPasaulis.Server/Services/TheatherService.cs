using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModel;
using KinoPasaulis.Server.Repositories.Theather;

namespace KinoPasaulis.Server.Services
{
    public class TheatherService : ITheatherService
    {
        private readonly IEventRepository _eventRepository;
        private readonly IAudtoriumRepository _auditoriumRepository;

        public TheatherService(IEventRepository eventRepository, IAudtoriumRepository auditoriumRepository)
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
                // Get this from auditorium repo (get existing auditorium)
                var auditorium = new Auditorium
                {
                    Seats = 150,
                    Name = "Sale 1"
                };

                auditoriasList.Add(auditorium);
            }

            var shows = new List<Show>();
                 
            foreach (DateTime day in EachDay(eventCreation.StartTime, eventCreation.EndTime))
            {
                foreach (var timeSpan in eventCreation.Times)
                {
                    var dateTime = day.Add(timeSpan);
                    var show = new Show
                    {
                        Auditoriums = auditoriasList,
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

        private IEnumerable<DateTime> EachDay(DateTime thru, DateTime from)
        {
            for (var day = from.Date; day.Date <= thru.Date; day = day.AddDays(1))
                yield return day;
        }
    }
}
