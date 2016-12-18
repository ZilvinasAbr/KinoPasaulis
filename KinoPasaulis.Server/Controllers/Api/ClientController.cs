using System;
using System.Collections.Generic;
using System.Linq;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models.ViewModel;
using KinoPasaulis.Server.Repositories.CinemaStudio;
using KinoPasaulis.Server.Repositories.Client;
using KinoPasaulis.Server.Repositories.MovieCreator;
using KinoPasaulis.Server.Repositories.Theather;
using Microsoft.EntityFrameworkCore;

namespace KinoPasaulis.Server.Controllers.Api
{
    [Route("api/[controller]")]
    public class ClientController : Controller
    {
        private readonly IClientService _clientService;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IShowRepository _showRepository;
        private readonly ITheatherRepository _theatherRepository;
        private readonly IMovieCreatorRepository _movieCreatorRepository;
        private readonly IVotingRepository _votingRepository;
        private readonly IMovieRepository _movieRepository;
        private readonly IUserService _userService;
        private readonly ApplicationDbContext _dbContext;

        public ClientController(
            IClientService clientService,
            SignInManager<ApplicationUser> signInManager,
            IShowRepository showRepository,
            ITheatherRepository theatherRepository,
            IMovieCreatorRepository movieCreatorRepository,
            IVotingRepository votingRepository,
            IMovieRepository movieRepository,
            IUserService userService,
            ApplicationDbContext dbContext)
        {
            _clientService = clientService;
            _signInManager = signInManager;
            _showRepository = showRepository;
            _theatherRepository = theatherRepository;
            _movieCreatorRepository = movieCreatorRepository;
            _votingRepository = votingRepository;
            _movieRepository = movieRepository;
            _userService = userService;
            _dbContext = dbContext;
        }

        [HttpGet("getOrder")]
        public Order GetOrderById(int id)
        {
            return _clientService.GetOrderById(id);
        }

        [HttpPost("addOrder")]
        public bool AddOrder([FromBody] OrderViewModel orderModel)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = HttpContext.User.GetUserId();
                var client = _userService.GetClientByUserId(userId);
                var show = _showRepository.GetShowById(orderModel.ShowId);
                var order = new Order
                {
                    Amount = orderModel.Amount,
                    Client = client,
                    OrderDate = DateTime.Now,
                    Paid = true,
                    Price = orderModel.Amount*10,
                    Show = show
                };

                _clientService.AddOrder(order);

                return true;
            }

            return false;
        }

        [HttpGet("getSubscription")]
        public Subscription GetSubscriptionById(int id)
        {
            return _clientService.GetSubscriptionById(id);
        }

        [HttpPost("addSubscription")]
        public IActionResult AddSubscription([FromBody] int theaterId)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = HttpContext.User.GetUserId();
                Client client = _userService.GetClientByUserId(userId);
                var theather = _theatherRepository.GetTheatherById(theaterId);
                var subscription = new Subscription()
                {
                    Theather = theather,
                    Client = client,
                    BeginDate = DateTime.Now
                };

                _clientService.AddSubscription(subscription);

                return Ok(true);
            }

            return Unauthorized();
        }

        [HttpPost("removeSubscription")]
        public IActionResult RemoveSubscription([FromBody] int subscriptionId)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var subscription = _clientService.GetSubscriptionById(subscriptionId);
                subscription.EndDate = DateTime.Now;

                _clientService.RemoveSubscription(subscription);

                return Ok(true);
            }

            return Unauthorized();
        }

        [HttpGet("getVote")]
        public Vote GetVoteById(int id)
        {
            return _clientService.GetVoteById(id);
        }

        [HttpPost("addVote")]
        public IActionResult AddVote([FromBody] VoteViewModel voteModel)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = HttpContext.User.GetUserId();
                Client client = _userService.GetClientByUserId(userId);
                var voting = _votingRepository.GetVotingById(voteModel.VotingId);
                var movieCreator = _movieCreatorRepository.GetMovieCreatorById(voteModel.MovieCreatorId);
                var vote = new Vote()
                {
                    MovieCreator = movieCreator,
                    Client = client,
                    VotedOn = DateTime.Now,
                    VoteChangedOn = DateTime.Now,
                    Voting = voting
                };

                _clientService.AddVote(vote);

                return Ok(true);
            }

            return Unauthorized();
        }

        [HttpPost("changeVote")]
        public IActionResult ChangeVote([FromBody] ChangeVoteViewModel changeVoteModel)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var vote = _clientService.GetVoteById(changeVoteModel.VoteId);
                var movieCreator = _movieCreatorRepository.GetMovieCreatorById(changeVoteModel.MovieCreatorId);

                vote.VoteChangedOn = DateTime.Now;
                vote.MovieCreator = movieCreator;

                _clientService.ChangeVote(vote);

                return Ok(true);
            }

            return Unauthorized();
        }

        [HttpGet("getRating")]
        public Rating GetRatingById(int id)
        {
            return _clientService.GetRatingById(id);
        }

        [HttpPost("addRating")]
        public IActionResult AddRating([FromBody] AddRatingViewModel addRatingModel)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = HttpContext.User.GetUserId();
                Client client = _userService.GetClientByUserId(userId);
                var movie = _movieRepository.GetMovieById(addRatingModel.MovieId);
                byte ratingType = 2;
                if (addRatingModel.Comment == null)
                {
                    ratingType = 1;
                }

                var rating = new Rating()
                {
                    Client = client,
                    ClientId = client.Id,
                    Comment = addRatingModel.Comment,
                    Movie = movie,
                    MovieId = movie.Id,
                    RatingCreatedOn = DateTime.Now,
                    RatingModifiedOn = DateTime.Now,
                    Value = addRatingModel.Value,
                    RatingType = ratingType
                };

                _clientService.AddRating(rating);

                return Ok(true);
            }

            return Unauthorized();
        }

        [HttpPost("changeRating")]
        public IActionResult ChangeRating([FromBody] ChangeRatingViewModel changeRatingModel)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var rating = _clientService.GetRatingById(changeRatingModel.RatingId);
                byte ratingType = 2;
                if (changeRatingModel.Comment == null)
                {
                    ratingType = 1;
                }

                rating.RatingModifiedOn = DateTime.Now;
                rating.Comment = changeRatingModel.Comment;
                rating.Value = changeRatingModel.Value;
                rating.RatingType = ratingType;

                _clientService.ChangeRating(rating);

                return Ok(true);
            }

            return Unauthorized();
        }

        [HttpGet("readAnnouncements")]
        public IActionResult ReadAnnouncements()
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = HttpContext.User.GetUserId();
                var client = _userService.GetClientByUserId(userId);

                var announcements = _dbContext.Announcements.Include(ann => ann.Client)
                    .Where(ann => ann.Client.Id == client.Id);

                var updateAnnouncements = new List<Announcement>();

                foreach (var announcement in announcements)
                {
                    if (announcement.Seen == null)
                    {
                        updateAnnouncements.Add(announcement);
                        announcement.Seen = DateTime.Now;
                    }
                }

                _dbContext.UpdateRange(updateAnnouncements);
                _dbContext.SaveChanges();

                return Ok(announcements);
            }

            return Unauthorized();
        }
    }
}