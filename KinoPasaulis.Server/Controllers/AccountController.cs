using System;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModels;
using KinoPasaulis.Server.Services;
using KinoPasaulis.Server.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

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
                Phone = model.Phone,
                RegisterDate = DateTime.Now,
                LastLoginDate = DateTime.Now,
                Active = true,
                Blocked = false
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

        [HttpPost("registerMovieCreator")]
        public async Task<bool> RegisterMovieCreator([FromBody] MovieCreatorRegisterViewModel model)
        {
            if (model.Password != model.ConfirmPassword)
            {
                return false;
            }

            var movieCreator = new MovieCreator
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Phone = model.Phone,
                BirthDate = model.BirthDate,
                Description = model.Description,
                RegisterDate = DateTime.Now
            };

            var user = new ApplicationUser
            {
                UserName = model.UserName,
                MovieCreator = movieCreator
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "MovieCreator");
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

            var cinemaStudio = new CinemaStudio
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
                CinemaStudio = cinemaStudio
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

        [HttpGet("userData")]
        public async Task<object> GetUserData()
        {
            if (!_signInManager.IsSignedIn(User))
            {
                return null;
            }

            var user = await _userManager.GetUserAsync(HttpContext.User);

            var roles = await _userManager.GetRolesAsync(user);

            var result = new
            {
                user.UserName,
                role = roles[0]
            };

            return result;
        }
    }
}