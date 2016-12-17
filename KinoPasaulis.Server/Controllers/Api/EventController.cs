using KinoPasaulis.Server.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace KinoPasaulis.Server.Controllers.Api
{
    [Route("api/Event")]
    public class EventController : Controller
    {
        private readonly ITheatherService _theaterService;

        public EventController(ITheatherService theaterService)
        {
            _theaterService = theaterService;
        }

        [HttpGet("statistics")]
        public IActionResult GetOrderStatistics(int id)
        {
            return Ok(_theaterService.GetOrderStatistics(id));
        }
    }
}

