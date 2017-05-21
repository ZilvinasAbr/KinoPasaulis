using System.Collections.Generic;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModel;
using KinoPasaulis.Server.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace KinoPasaulis.Server.Services
{
    public interface IJobAdvertisementService
    {
        bool AddJobAdvertisement(AddJobAdvertisementViewModel model, string userId);
        object GetCinemaStudiosJobAdvertisements(string userId);
        bool DeleteJobAdvertisement(int id, string userId);
    }
}
