using System;
using System.Net;

namespace AdventureGame.API.Utilities
{
    public class ApiException : Exception
    {
        public HttpStatusCode Code { get; set; }

        public ApiException(HttpStatusCode code, string message, Exception inner = null)
            : base(message, inner)
        {
            Code = code;
        }

    }
}
