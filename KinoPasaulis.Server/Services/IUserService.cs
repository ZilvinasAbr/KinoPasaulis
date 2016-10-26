﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KinoPasaulis.Server.Models;

namespace KinoPasaulis.Server.Services
{
    public interface IUserService
    {
        Theather GetTheatherByUserId(string id);
        Theather GetTheatherByUserIdIncludeEvents(string id);
    }
}
