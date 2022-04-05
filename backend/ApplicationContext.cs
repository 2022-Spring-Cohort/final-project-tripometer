using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using TripometerAPI.Models;

namespace TripometerAPI
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Owner> Owners { get; set; }
        public DbSet<Receipt> Receipts { get; set; }
        public DbSet<Trip> Trips { get; set; }

        public DbSet<Vehicle> Vehicles { get; set; }
        


        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            builder.UseSqlServer("Server=(localdb)\\mssqllocaldb; Database = TripometerAPI; Trusted_connection=True");
            builder.UseLazyLoadingProxies();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Owner>().HasData(new Owner
            {
                Id =1,
                FullName = "Joe Smith",
                FirstName =" Joe",
                LastName = "Smith",
            });

            modelBuilder.Entity<Vehicle>().HasData(new Vehicle
            {
                Id = 1,
                Model = "Mustang",
                FuelEfficiency = 25,
                Make = "Ford",
                Year = 2020,
                FuelTank = 50,
                OwnerId = 1,

            });
            modelBuilder.Entity<Trip>().HasData(new Trip
            {
                Id = 1,
                StartAddress = "Cleveland",
                EndAddress = "Columbus",
                MileageBefore = 20000,
                MileageAfter = 20400,
                ETA = 60,
                Distance = 200,
                EstimatedGasCost = 5,
                EstimatedTotalCost = 1000,
                VehicleId = 1,
                OwnerId = 1,
            }) ;


            modelBuilder.Entity<Receipt>().HasData(new Receipt
            {
                Id = 1,
                Date = DateTime.Now,
                PricePerGallon = 4,
                TotalCost = 800,
                AdditionalCosts = 1200,
                GasStation = "Cleveland",
                TripId = 1,

            });


        }





    }
}
