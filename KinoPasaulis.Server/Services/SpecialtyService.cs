using System;
using System.Collections.Generic;
using System.Linq;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Models.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace KinoPasaulis.Server.Services
{
    public class SpecialtyService : ISpecialtyService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IVotingService _votingService;

        public SpecialtyService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Specialty> GetSpecialties()
        {
            var specialties = _dbContext.Specialties
                .ToList();

            return specialties;
        }

        public bool AddSpecialty(string specialtyTitle, MovieCreator movieCreator)
        {
            var specialties = GetSpecialties();

            foreach (var spec in specialties)
            {
                if (spec.Title == specialtyTitle)
                {
                    AssignSpecialty(spec, movieCreator);

                    return true;
                }
            }

            var specialty = new Specialty()
            {
                Title = specialtyTitle,
                Quantity = 0,
                CreatedAt = DateTime.Now
            };

            _dbContext.Specialties.Add(specialty);
            _dbContext.SaveChanges();

            return false;
        }

        public void AssignSpecialty(Specialty specialty, MovieCreator movieCreator)
        {
            movieCreator.Specialty = specialty;
            _dbContext.MovieCreators.Update(movieCreator);
            _dbContext.SaveChanges();
        }

    }
}
