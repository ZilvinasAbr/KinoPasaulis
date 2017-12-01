using System;
using System.Collections.Generic;
using System.Linq;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModel;
using KinoPasaulis.Server.ViewModels;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

namespace KinoPasaulis.Server.Services
{
    public class MessageService : IMessageService
    {
        private readonly ApplicationDbContext _dbContext;

        public MessageService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Message> GetMovieCreatorMessages(string userId)
        {
            var movieCreator = _dbContext.Users
                .Include(u => u.MovieCreator)
                .SingleOrDefault(au => au.Id == userId)
                .MovieCreator;
            IEnumerable<Message> messages = _dbContext.Messages.Where(m => m.MovieCreatorId == movieCreator.Id).ToList();
            return messages;
        }

        public IEnumerable<Message> GetCinemaStudioMessages(string userId)
        {
            var cinemaStudio = _dbContext.Users
                .Include(u => u.CinemaStudio)
                .SingleOrDefault(au => au.Id == userId)
                .CinemaStudio;
            var messages = _dbContext.Messages
                .Include(message => message.MovieCreator)
                .Where(m => m.CinemaStudioId == cinemaStudio.Id)
                .ToList();

            foreach (var message in messages)
            {
                if (message.ReadAt == null)
                {
                    message.ReadAt = DateTime.Now;
                }
            }

//            _dbContext.Messages.UpdateRange(messages);
            _dbContext.SaveChanges();

            return messages;
        }

        public bool AddMessage(Message message, string userId, int cinemaStudioId)
        {
            var messageWithSameId = _dbContext.Messages.SingleOrDefault(m => m.Id == message.Id);
            var cinemaStudio = _dbContext.CinemaStudios.SingleOrDefault(cs => cs.Id == cinemaStudioId);

            if (messageWithSameId != null || cinemaStudio == null)
            {
                return false;
            }

            message.SentAt = DateTime.Now;
            message.CinemaStudio = cinemaStudio;
            
            var movieCreator = _dbContext.Users
                .Include(u => u.MovieCreator)
                .SingleOrDefault(au => au.Id == userId)
                .MovieCreator;

            message.MovieCreator = movieCreator;

            _dbContext.Messages.Add(message);
            _dbContext.SaveChanges();

            return true;
        }
    }
}
