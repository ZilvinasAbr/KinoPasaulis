using System;
using System.Collections.Generic;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Mapper;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModel;
using KinoPasaulis.Server.Repositories.CinemaStudio;
using KinoPasaulis.Server.Repositories.Theather;
using KinoPasaulis.Server.ViewModels.Theather;

namespace KinoPasaulis.Server.Services
{
    public class TheatherService : ITheatherService
    {
        private readonly IEventRepository _eventRepository;
        private readonly IAuditoriumRepository _auditoriumRepository;
        private readonly IShowRepository _showRepository;
        private readonly ITheatherMapper _theatherMapper;
        private readonly IMovieRepository _movieRepository;
        private readonly IAnnouncementRepository _announcementRepository;
        private readonly IUserService _userService;
        private readonly ITheatherService _theaterService;

        public TheatherService(
            IEventRepository eventRepository, 
            IAuditoriumRepository auditoriumRepository, 
            IShowRepository showRepository, 
            ITheatherMapper theatherMapper, 
            IMovieRepository movieRepository,
            IAnnouncementRepository announcementRepository,
            IUserService userService
            )
        {
            _eventRepository = eventRepository;
            _auditoriumRepository = auditoriumRepository;
            _showRepository = showRepository;
            _theatherMapper = theatherMapper;
            _movieRepository = movieRepository;
            _announcementRepository = announcementRepository;
            _userService = userService;
        }

        public void AddNewEvent(EventCreation eventCreation)
        {
            var addedMovie = _movieRepository.GetMovieById(eventCreation.MovieId);
            var auditoriasList = _auditoriumRepository.GetAuditoriumsByIds(eventCreation.AuditoriumIds);

            var shows = new List<Show>();
            var days = (eventCreation.EndTime - eventCreation.StartTime).TotalDays;
            for (int i = 0; i < days; i++)
            {
                foreach (var timeSpan in eventCreation.Times)
                {
                    var day = eventCreation.StartTime.AddDays(i);
                    var dateTime = day.Add(timeSpan);
                    if (dateTime > DateTime.Now)
                    {
                        foreach (var auditorium in auditoriasList)
                        {
                            var show = new Show
                            {
                                Auditorium = auditorium,
                                StartTime = dateTime
                            };

                            shows.Add(show);
                        }
                    }
                }
            }

            var Event = new Event
            {
                Shows = shows,
                Movie = addedMovie,
                StartTime = eventCreation.StartTime,
                EndTime = eventCreation.EndTime,
                Theather = eventCreation.Theather
            };

            _eventRepository.InsertEvent(Event);
        }

        public void AddNewAuditorium(Auditorium auditorium)
        {
            _auditoriumRepository.InsertAuditorium(auditorium);
        }

        public IEnumerable<Event> GetAllEvents()
        {
            return _eventRepository.GetEvents();
        }

        public Event GetEventById(int id)
        {
            return _eventRepository.GetEventById(id);
        }

        public Show GetShowById(int id)
        {
            return _showRepository.GetShowById(id);
        }

        public bool DeleteAuditorium(int id)
        {
            bool deleted = _auditoriumRepository.DeleteAudtorium(id);

            return deleted;
        }

        public bool SendAnnouncements(ISet<int> clientIds, string theatherId, string message)
        {
            var theater = _userService.GetTheatherByUserId(theatherId);

            foreach (var id in clientIds)
            {
                var client = _userService.GetClientById(id);

                var announcement = new Announcement
                {
                    Client = client,
                    Theater = theater,
                    Message = message,
                    Created = DateTime.Now,
                    Sent = DateTime.Now
                };

                _announcementRepository.InsertAnnouncement(announcement);
            }

            return true;
        }

        public IEnumerable<Announcement> GetTheaterAnnouncments(string theaterId)
        {
            var theater = _userService.GetTheatherByUserId(theaterId);

            return _announcementRepository.GetAnnouncementsByTheatherId(theater.Id);
        }

        public bool UpdateAutorium(Auditorium auditorium)
        {
            // Check if auditorium exists first..... Couldnt do that becouse of entity framework error then updating auditorium
            _auditoriumRepository.UpdateAuditorium(auditorium);

            return true;
        }

        public bool UpdateShow(Show show)
        {
            _showRepository.UpdateShow(show);

            return true;
        }

        public bool DeleteEvent(int id)
        {
            bool deleted = _eventRepository.DeleteEvent(id);

            return deleted;
        }

        public bool DeleteShow(int id)
        {
            bool deleted = _showRepository.DeleteShow(id);

            return deleted;
        }

        public IEnumerable<Event> GetEventsByTheatherId(int id)
        {
            return _eventRepository.GetEventsByTheatherId(id);
        }

        public IEnumerable<AuditoriumViewModel> GetMappedAuditoriums(IEnumerable<Auditorium> auditoriums)
        {
            var viewModels = new List<AuditoriumViewModel>();

            foreach (var auditorium in auditoriums)
            {
                viewModels.Add(_theatherMapper.MapOneAuditorium(auditorium));
            }

            return viewModels;
        }

        public bool SendAnnouncement(int clientId, int theatherId, string message)
        {
            throw new NotImplementedException();
        }
    }
}
