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
                var seatsSum = 0;
                foreach (var orders in show.Orders)
                    seatsSum += orders.Amount;
                if (seatsSum + orderModel.Amount > show.Auditorium.Seats || orderModel.Amount < 1)
                    return false;
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

        [HttpGet("getSubscriptions")]
        public IActionResult GetSubscribedTheaters()
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = HttpContext.User.GetUserId();
                var client = _userService.GetClientByUserId(userId);
                var theaters = _clientService.GetSubscribedTheathers(client.Id);

                return Ok(theaters);
            }

            return Unauthorized();

        }

        [HttpPost("addSubscription")]
        public IActionResult AddSubscription([FromBody] int theaterId)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = HttpContext.User.GetUserId();
                var client = _userService.GetClientByUserId(userId);
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
        public IActionResult RemoveSubscription([FromBody] int theaterId)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = HttpContext.User.GetUserId();
                var client = _userService.GetClientByUserId(userId);
                var clientSubscriptions = _clientService.GetSubscriptions(client.Id);
                int subscriptionId = 0;
                foreach (var clientSubscription in clientSubscriptions)
                {
                    if (clientSubscription.Theather.Id == theaterId)
                    {
                        subscriptionId = clientSubscription.Id;
                        break;
                    }
                }
                var subscription = _clientService.GetSubscriptionById(subscriptionId);
                var begin = subscription.BeginDate;
                var period = DateTime.Now.Subtract(begin).TotalSeconds;
                subscription.EndDate = DateTime.Now;
                subscription.Period = period;

                _clientService.RemoveSubscription(subscription);

                return Ok(true);
            }

            return Unauthorized();
        }

        [HttpGet("isSubscribedToTheater")]
        public IActionResult IsSubscribedByTheaterId(int id)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = HttpContext.User.GetUserId();
                var client = _userService.GetClientByUserId(userId);
                var clientSubsciptions = _clientService.GetSubscribedTheathers(client.Id);
                return Ok(clientSubsciptions.Any(sb => sb.Id == id));
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
                var client = _userService.GetClientByUserId(userId);
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
                if (addRatingModel.Value < 1 || addRatingModel.Value > 10)
                {
                    return Ok(false);
                }
                var userId = HttpContext.User.GetUserId();
                var client = _userService.GetClientByUserId(userId);
                var movie = _movieRepository.GetMovieById(addRatingModel.MovieId);
                byte ratingType = 2;
                var comment = addRatingModel.Comment;
                if (string.IsNullOrEmpty(comment))
                {
                    ratingType = 1;
                    comment = null;
                }

                var rating = new Rating()
                {
                    Client = client,
                    ClientId = client.Id,
                    Comment = comment,
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
                var comment = changeRatingModel.Comment;
                if (string.IsNullOrEmpty(comment))
                {
                    ratingType = 1;
                    comment = null;
                }

                rating.RatingModifiedOn = DateTime.Now;
                rating.Comment = comment;
                rating.Value = changeRatingModel.Value;
                rating.RatingType = ratingType;

                _clientService.ChangeRating(rating);

                return Ok(true);
            }

            return Unauthorized();
        }

        [HttpGet("isRatedMovie")]
        public IActionResult IsRatedByMovieId(int id)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = HttpContext.User.GetUserId();
                var client = _userService.GetClientByUserId(userId);
                var clientRates = _clientService.GetRatings(client.Id);
                foreach (var rate in clientRates)
                {
                    if (rate.MovieId == id)
                    {
                        return Ok(rate);
                    }
                }
                return Ok(false);
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

                var announcements = _dbContext.Announcements
                    .Include(ann => ann.Theater)
                    .Include(ann => ann.Client)
                    .Where(ann => ann.Client.Id == client.Id)
                    .OrderByDescending(ann => ann.Sent);

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

        [HttpGet("getMovies")]
        public IActionResult GetMovies()
        {
            if (_signInManager.IsSignedIn(User))
            {
                var movies = _clientService.GetAllMovies();
                return Ok(movies);
            }

            return Unauthorized();
        }

        [HttpGet("getMovie")]
        public IActionResult GetMovie(int id)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var movie = _clientService.GetMovie(id);

                if (movie == null)
                {
                    return NotFound();
                }

                return Ok(movie);
            }

            return Unauthorized();
        }
    }
}