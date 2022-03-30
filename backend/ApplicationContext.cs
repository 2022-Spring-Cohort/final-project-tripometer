using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TripometerAPI.Models;

namespace TripometerAPI
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Owner> Owner { get; set; }
      

        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            builder.UseSqlServer("Server=(localdb)\\mssqllocaldb; Database = BlogRun; Trusted_connection=True");
            builder.UseLazyLoadingProxies();
        }



    }
}
