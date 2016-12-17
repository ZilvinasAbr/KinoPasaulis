using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace KinoPasaulis.Server.Controllers.Api
{
    [Route("api/[controller]")]
    public class VotingController : Controller
    {
        private readonly IVotingService _votingService;
        public VotingController(IVotingService votingService)
        {
            _votingService = votingService;
        }

        [HttpGet("votings")]
        public IEnumerable<Voting> GetVotings()
        {
            return _votingService.GetVotings();
        }
    }
}