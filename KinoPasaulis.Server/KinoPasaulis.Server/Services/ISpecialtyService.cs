using System.Collections.Generic;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Services
{
    public interface ISpecialtyService
    {
        IEnumerable<Specialty> GetSpecialties();
        bool AddSpecialty(string specialtyTitle, MovieCreator movieCreator);
        void AssignSpecialty(Specialty specialty, MovieCreator movieCreator);
    }
}
