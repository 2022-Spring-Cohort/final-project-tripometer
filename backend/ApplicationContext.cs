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
                Id = 1,
                FirstName = "Denzel",
                LastName = "Mclntyre"
            });

            modelBuilder.Entity<Owner>().HasData(new Owner
            {
                Id =2,
                FirstName ="Jessica",
                LastName = "Wang"
            });

            modelBuilder.Entity<Owner>().HasData(new Owner
            {
                Id = 3,
                FirstName = "Darius",
                LastName = "Hammond"
            });

            modelBuilder.Entity<Owner>().HasData(new Owner
            {
                Id = 4,
                FirstName = "Rimma",
                LastName = "Girsheva"
            });

            modelBuilder.Entity<Owner>().HasData(new Owner
            {
                Id = 5,
                FirstName = "Qadriyyah",
                LastName = "Johnson"
            });

            modelBuilder.Entity<Owner>().HasData(new Owner
            {
                Id = 6,
                FirstName = "Brad",
                LastName = "Weir"
            });

            modelBuilder.Entity<Vehicle>().HasData(new Vehicle
            {
                Id = 1,
                Model = "Mustang",
                FuelEfficiency = 21.0f,
                Make = "Ford",
                Year = 2021,
                FuelTank = 16.0f,
                OwnerId = 1
            });
            modelBuilder.Entity<Vehicle>().HasData(new Vehicle
            {
                Id = 2,
                Model = "3 Series",
                FuelEfficiency = 36f,
                Make = "BMW",
                Year = 2020,
                FuelTank = 59.0f,
                OwnerId = 1
            });

            modelBuilder.Entity<Vehicle>().HasData(new Vehicle
            {

                Id = 3,
                Model = "Porsche",
                Make = "Carrear 4S Cabriolet",
                FuelEfficiency = 24.0f,
                Year = 2020,
                FuelTank = 17.6f,
                OwnerId = 2

            });

            modelBuilder.Entity<Vehicle>().HasData(new Vehicle
            {
                Id = 4,
                Model = "Bentley",
                Make = "GT",
                FuelEfficiency = 20.0f,
                Year = 2020,
                FuelTank = 24.0f,
                OwnerId = 2

            });
           
            modelBuilder.Entity<Vehicle>().HasData(new Vehicle
            {
                Id = 5,
                Model = "xDrive28i",
                FuelEfficiency = 21.0f,
                Make = "BMW",
                Year = 2017,
                FuelTank = 16.0f,
                OwnerId = 3
            });
            modelBuilder.Entity<Vehicle>().HasData(new Vehicle
            {
                Id = 6,
                Model = "3 Series",
                FuelEfficiency = 36.0f,
                Make = "BMW",
                Year = 2020,
                FuelTank = 59.0f,
                OwnerId = 3
            });
            
            modelBuilder.Entity<Vehicle>().HasData(new Vehicle
            {
                Id = 7,
                Model = "Encore",
                FuelEfficiency = 21.0f,
                Make = "Buick",
                Year = 2019,
                FuelTank = 16.0f,
                OwnerId = 4
            });
            modelBuilder.Entity<Vehicle>().HasData(new Vehicle
            {
                Id = 8,
                Model = "Crown",
                FuelEfficiency = 36.0f,
                Make = "Toyota",
                Year = 2019,
                FuelTank = 59.0f,
                OwnerId = 4
            });
            
            modelBuilder.Entity<Vehicle>().HasData(new Vehicle
            {
                Id = 9,
                Model = "X5",
                FuelEfficiency = 47.0f,
                Make = "BMW",
                Year = 2019,
                FuelTank = 19.0f,
                OwnerId = 5
            });
            modelBuilder.Entity<Vehicle>().HasData(new Vehicle
            {
                Id = 10,
                Model = "EOS",
                FuelEfficiency = 30.0f,
                Make = "Volkswagen",
                Year = 2016,
                FuelTank = 14.5f,
                OwnerId = 5
            });
            
            modelBuilder.Entity<Vehicle>().HasData(new Vehicle
            {
                Id = 11,
                Year = 2022,
                Make = "Honda",
                Model = "Civic Type-R",
                FuelEfficiency = 28.0f,
                FuelTank = 12.4f,
                OwnerId = 6
            });
            

            modelBuilder.Entity<Trip>().HasData(new Trip
            {
                Id = 1,
                EmbarkDate= DateTime.Now.AddDays(-14),
                StartAddress = "Cleveland",
                EndAddress = "Columbus",
                MileageBefore = 20000,
                MileageAfter = 20400,
                ETA = 60,
                Distance = 200,
                EstimatedGasCost = 5,
                EstimatedTotalCost = 1000,
                VehicleId = 1,
              //  OwnerId = 1

            }) ;

            modelBuilder.Entity<Trip>().HasData(new Trip
            {
                Id = 2,
                EmbarkDate = DateTime.Now.AddDays(-6),
                StartAddress = "Shaker",
                EndAddress = "Miami",
                MileageBefore = 20000,
                MileageAfter = 20400,
                ETA = 60,
                Distance = 200,
                EstimatedGasCost = 5,
                EstimatedTotalCost = 1000,
                 VehicleId = 1,
                //   OwnerId = 1
            });

            modelBuilder.Entity<Trip>().HasData(new Trip
            {
                Id = 3,
                StartAddress = "Chicago",
                EndAddress = "Columbus",
                MileageBefore = 20000,
                MileageAfter = 20400,
                ETA = 60,
                Distance = 200,
                EstimatedGasCost = 5,
                EstimatedTotalCost = 1000,
                VehicleId = 1,
                //    OwnerId = 1

            });

            modelBuilder.Entity<Trip>().HasData(new Trip
            {
                Id = 4,
                StartAddress = "Kent",
                EndAddress = "NYC",
                MileageBefore = 20000,
                MileageAfter = 20400,
                ETA = 60,
                Distance = 200,
                EstimatedGasCost = 5,
                EstimatedTotalCost = 1000,
                VehicleId = 2,
                //      OwnerId = 1

            });

            modelBuilder.Entity<Trip>().HasData(new Trip
            {
                Id = 5,
                StartAddress = "Cleveland",
                EndAddress = "Cincinnati",
                MileageBefore = 20000,
                MileageAfter = 20400,
                ETA = 60,
                Distance = 200,
                EstimatedGasCost = 5,
                EstimatedTotalCost = 1000,
                VehicleId = 1,
                //     OwnerId = 1

            });

            modelBuilder.Entity<Trip>().HasData(new Trip
            {
                Id = 6,
                StartAddress = "Cleveland",
                EndAddress = "Cincinnati",
                MileageBefore = 20000,
                MileageAfter = 20400,
                ETA = 60,
                Distance = 200,
                EstimatedGasCost = 5,
                EstimatedTotalCost = 1000,
                VehicleId = 1,
                //    OwnerId = 1

            });

            modelBuilder.Entity<Trip>().HasData(new Trip
            {
                Id = 7,
                StartAddress = "Chicago",
                EndAddress = "Columbus",
                MileageBefore = 20000,
                MileageAfter = 20400,
                ETA = 60,
                Distance = 200,
                EstimatedGasCost = 5,
                EstimatedTotalCost = 1000,
                VehicleId = 1,
                //    OwnerId = 1

            });

            modelBuilder.Entity<Trip>().HasData(new Trip
            {
                Id = 8,
                StartAddress = "Shaker",
                EndAddress = "Miami",
                MileageBefore = 20000,
                MileageAfter = 20400,
                ETA = 60,
                Distance = 200,
                EstimatedGasCost = 5,
                EstimatedTotalCost = 1000,
                VehicleId = 2,
                //    OwnerId = 1

            });

            modelBuilder.Entity<Receipt>().HasData(new Receipt
            {
                Id = 1,
                Date = DateTime.Now,
                PricePerGallon = 4,
                TotalCost = 800,
                AdditionalCosts = 1200,
                GasStation = "Cleveland",

                TripId = 2

            });

            modelBuilder.Entity<Receipt>().HasData(new Receipt
            {
                Id = 2,
                Date = DateTime.Now,
                PricePerGallon = 5,
                TotalCost = 800,
                AdditionalCosts = 1200,
                GasStation = "Shaker",
                TripId = 1

            });

            modelBuilder.Entity<Receipt>().HasData(new Receipt
            {
                Id = 3,
                Date = DateTime.Now,
                PricePerGallon = 6,
                TotalCost = 800,
                AdditionalCosts = 1200,
                GasStation = "Shaker",
                TripId = 1

            });


        }





    }
}
