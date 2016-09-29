using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace KinoPasaulis.Server.ViewModels
{
    public class CreatorRegisterViewModel
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

        [Display(Name = "Name")]
        public string FirstName { get; set; }

        [Display(Name = "Surname")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "E-mail adress is required")]
        [DataType(DataType.EmailAddress)]
        [Display(Name = "E-mail")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Birth date is required")]
        [DataType(DataType.Date)]
        [Display(Name = "Birth Date")]
        public DateTime BirthDate { get; set; }


    }
}
