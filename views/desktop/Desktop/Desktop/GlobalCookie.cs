using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Desktop
{
    class GlobalCookie
    {
        private static CookieContainer cookies;

        public static CookieContainer Cookies { get => cookies; set => cookies = value; }
    }
}
