using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;
using KinoPasaulis.Server.Data;
using KinoPasaulis.Server.Repositories.Theather;
using Microsoft.EntityFrameworkCore;

namespace KinoPasaulis.Server.Services
{
    public class ApplicationService : IApplicationService
    {
        private readonly ITheatherRepository _theatherRepository;

        public ApplicationService(ITheatherRepository theatherRepository)
        {
            _theatherRepository = theatherRepository;
        }

        public Theather GetTheatherByUserId(string id)
        {
            return _theatherRepository.GetTheatherByUserId(id);
        }
    }
}
