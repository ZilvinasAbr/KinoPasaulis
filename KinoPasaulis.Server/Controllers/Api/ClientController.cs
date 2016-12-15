using System.Collections.Generic;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace KinoPasaulis.Server.Controllers.Api
{
    [Route("api/[controller]")]
    public class ClientController : Controller
    {
        private readonly IClientService _clientService;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public ClientController(
            IClientService clientService,
            SignInManager<ApplicationUser> signInManager )
        {
            _clientService = clientService;
            _signInManager = signInManager;
        }

        [HttpGet("orders")]
        public IEnumerable<Order> GetOrders()
        {
            return _clientService.GetOrders();
        }
    }
}