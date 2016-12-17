﻿using System;
using System.Collections.Generic;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using KinoPasaulis.Server.Models.ViewModel;
using KinoPasaulis.Server.Repositories.Client;
using KinoPasaulis.Server.Repositories.Theather;

namespace KinoPasaulis.Server.Controllers.Api
{
    [Route("api/[controller]")]
    public class ClientController : Controller
    {
        private readonly IClientService _clientService;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IShowRepository _showRepository;
        private readonly ITheatherRepository _theatherRepository;
        private readonly IUserService _userService;

        public ClientController(
            IClientService clientService,
            SignInManager<ApplicationUser> signInManager,
            IShowRepository showRepository,
            ITheatherRepository theatherRepository,
            IUserService userService )
        {
            _clientService = clientService;
            _signInManager = signInManager;
            _showRepository = showRepository;
            _theatherRepository = theatherRepository;
            _userService = userService;
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
                Client client = _userService.GetClientByUserId(userId);
                var show = _showRepository.GetShowById(orderModel.ShowId);
                var order = new Order()
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
        public bool AddSubbscription([FromBody] int theaterId)
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

                return true;
            }

            return false;
        }
    }
}