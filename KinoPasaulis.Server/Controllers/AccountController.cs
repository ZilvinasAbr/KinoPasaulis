using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModels;
using KinoPasaulis.Server.Services;
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

            var user = new ApplicationUser { UserName = model.UserName };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
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