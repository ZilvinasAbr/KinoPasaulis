using System.ComponentModel.DataAnnotations;

namespace KinoPasaulis.Server.ViewModels
{
    public class RegisterUserViewModel
    {
        [Required(ErrorMessage = "Username is required")]
        [Display(Name = "Username")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Passwords do not match!")]
        [Display(Name = "Confirm password")]
        public string ConfirmPassword { get; set; }
    }
}
