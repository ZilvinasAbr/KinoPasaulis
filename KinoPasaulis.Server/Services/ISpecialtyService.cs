using System.Collections.Generic;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Services
{
    public interface ISpecialtyService
    {
        IEnumerable<Specialty> GetSpecialties();
        bool AddSpecialty(Specialty specialty, List<MovieCreator> movieCreators, int userId);
    }
}
