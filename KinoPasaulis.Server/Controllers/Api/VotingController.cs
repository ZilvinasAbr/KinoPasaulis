using System.Collections.Generic;
using System.Security.Claims;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Services;
using KinoPasaulis.Server.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace KinoPasaulis.Server.Controllers.Api
{
    [Route("api/[controller]")]
    public class VotingController : Controller
    {
        private readonly IVotingService _votingService;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IUserService _userService;
        public VotingController(IVotingService votingService, SignInManager<ApplicationUser> signInManager, IUserService userService)
        {
            _votingService = votingService;
            _signInManager = signInManager;
            _userService = userService;
        }

        [HttpGet("votings")]
        public IEnumerable<Voting> GetVotings()
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = HttpContext.User.GetUserId();
                return _votingService.GetVotings(userId);
            }
            return null;
        }

        public IEnumerable<Voting> GetAllVotings()
        {
            return _votingService.GetAllVotings();
        }

        [HttpGet("currentVotings")]
        public IEnumerable<Voting> GetCurrentVotings()
        {
            return _votingService.GetCurrentVotings();
        }

        [HttpGet("endedVotings")]
        public IEnumerable<Voting> GetEndedVotings()
        {
            return _votingService.GetEndedVotings();
        }

        [HttpPost("addvoting")]
        public bool AddVoting([FromBody] VotingViewModel voting)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = HttpContext.User.GetUserId();
                
                if (voting.MovieCreators.Count >= 2 && voting.StartDate < voting.EndDate)
                {
                    _votingService.AddVoting(voting, userId);

                    return true;
                }
            }

            return false;
        }

        [HttpPost("deletevoting/{id}")]
        public bool DeleteVoting(int votingId)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = HttpContext.User.GetUserId();

                return _votingService.DeleteVoting(votingId, userId);
            }
            return false;
        }
    }
}