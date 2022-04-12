using System;

namespace TripometerAPI.Authorization
{
    [AttributeUsage(AttributeTargets.Method)]
    public class AllowAnonymousAttribute : Attribute
    { }
}