using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModels;
using KinoPasaulis.Server.Services;
using KinoPasaulis.Server.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace KinoPasaulis.Server.Controllers
{
    [Route("api/account/")]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IApplicationService _applicationService;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IApplicationService applicationService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _applicationService = applicationService;
        }

        [HttpPost("register")]
        public async Task<bool> Register([FromBody] RegisterViewModel model)
        {
            if (model.Password != model.ConfirmPassword)
            {
                return false;
            }

			var client = new Client
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Phone = model.Phone
            };
			
			var user = new ApplicationUser
            {
                UserName = model.UserName,
                Client = client
            };
			
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Client");
                await _signInManager.SignInAsync(user, isPersistent: false);
                return true;
            }

            return false;
        }

        [HttpPost("registerTheather")]
        public async Task<bool> RegisterTheather([FromBody] TheatherRegisterViewModel model)
        {
            if (model.Password != model.ConfirmPassword)
            {
                return false;
            }

            var theater = new Theather
            {
                City = model.City,
                Address = model.Address,
                Country = model.Country,
                Email = model.Email,
                Phone = model.Phone,
                Title = model.Title
            };

            var user = new ApplicationUser
            {
                UserName = model.UserName,
                Theather = theater
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Theather");
                await _signInManager.SignInAsync(user, isPersistent: false);
                return true;
            }

            return false;
        }

        [HttpPost("registerCreator")]
        public async Task<bool> RegisterCreator([FromBody] CreatorRegisterViewModel model)
        {
            if (model.Password != model.ConfirmPassword)
            {
                return false;
            }

            var creator = new Creator
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                BirthDate = model.BirthDate
            };

            var user = new ApplicationUser
            {
                UserName = model.UserName,
                Creator = creator
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Creator");
                await _signInManager.SignInAsync(user, isPersistent: false);
                return true;
            }

            return false;
        }

        [HttpPost("registerCinemaStudio")]
        public async Task<bool> RegisterCinemaStudio([FromBody] CinemaStudioRegisterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return false;
            }

            if (model.Password != model.ConfirmPassword)
            {
                return false;
            }

            var company = new CinemaStudio
            {
                Name = model.Name,
                City = model.City,
                Country = model.Country,
                Address = model.Address,
                Email = model.Email,
                Phone = model.Phone
            };

            var user = new ApplicationUser
            {
                UserName = model.UserName,
                CinemaStudio = company
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "CinemaStudio");
                await _signInManager.SignInAsync(user, isPersistent: false);
                return true;
            }

            return false;
        }

        [HttpPost("login")]
        public async Task<bool> Login([FromBody] LoginViewModel model)
        {
            var result = await _signInManager.PasswordSignInAsync(model.UserName, model.Password, true, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                return true;
            }
            if (result.IsLockedOut)
            {
                return false;
            }

            return false;
        }

        [HttpPost("logoff")]
        public async Task<bool> LogOff()
        {
            await _signInManager.SignOutAsync();
            return true;
        }

        [HttpGet("issignedin")]
        public bool IsSignedIn()
        {
            if (_signInManager.IsSignedIn(User))
            {
                return true;
            }

            return false;
        }
    }
}