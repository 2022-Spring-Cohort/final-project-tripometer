﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TripometerAPI;

namespace TripometerAPI.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    partial class ApplicationContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.15")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("TripometerAPI.Models.Owner", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Owners");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            FirstName = "Denzel",
                            LastName = "Mclntyre"
                        },
                        new
                        {
                            Id = 2,
                            FirstName = "Jessica",
                            LastName = "Wang"
                        },
                        new
                        {
                            Id = 3,
                            FirstName = "Darius",
                            LastName = "Hammond"
                        },
                        new
                        {
                            Id = 4,
                            FirstName = "Rimma",
                            LastName = "Girsheva"
                        },
                        new
                        {
                            Id = 5,
                            FirstName = "Qadriyyah",
                            LastName = "Johnson"
                        },
                        new
                        {
                            Id = 6,
                            FirstName = "Brad",
                            LastName = "Weir"
                        });
                });

            modelBuilder.Entity("TripometerAPI.Models.Receipt", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AdditionalCosts")
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("GasStation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PricePerGallon")
                        .HasColumnType("int");

                    b.Property<int>("TotalCost")
                        .HasColumnType("int");

                    b.Property<int>("TripId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TripId");

                    b.ToTable("Receipts");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            AdditionalCosts = 1200,
                            Date = new DateTime(2022, 4, 11, 16, 1, 38, 347, DateTimeKind.Local).AddTicks(4662),
                            GasStation = "Cleveland",
                            PricePerGallon = 4,
                            TotalCost = 800,
                            TripId = 2
                        },
                        new
                        {
                            Id = 2,
                            AdditionalCosts = 1200,
                            Date = new DateTime(2022, 4, 11, 16, 1, 38, 347, DateTimeKind.Local).AddTicks(5924),
                            GasStation = "Shaker",
                            PricePerGallon = 5,
                            TotalCost = 800,
                            TripId = 1
                        },
                        new
                        {
                            Id = 3,
                            AdditionalCosts = 1200,
                            Date = new DateTime(2022, 4, 11, 16, 1, 38, 347, DateTimeKind.Local).AddTicks(5951),
                            GasStation = "Shaker",
                            PricePerGallon = 6,
                            TotalCost = 800,
                            TripId = 1
                        });
                });

            modelBuilder.Entity("TripometerAPI.Models.Trip", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("DisembarkDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("Distance")
                        .HasColumnType("int");

                    b.Property<int>("ETA")
                        .HasColumnType("int");

                    b.Property<DateTime>("EmbarkDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("EndAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("EstimatedGasCost")
                        .HasColumnType("int");

                    b.Property<int>("EstimatedTotalCost")
                        .HasColumnType("int");

                    b.Property<int>("MileageAfter")
                        .HasColumnType("int");

                    b.Property<int>("MileageBefore")
                        .HasColumnType("int");

                    b.Property<string>("StartAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("VehicleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("VehicleId");

                    b.ToTable("Trips");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Distance = 200,
                            ETA = 60,
                            EmbarkDate = new DateTime(2022, 3, 28, 16, 1, 38, 343, DateTimeKind.Local).AddTicks(8028),
                            EndAddress = "Columbus",
                            EstimatedGasCost = 5,
                            EstimatedTotalCost = 1000,
                            MileageAfter = 20400,
                            MileageBefore = 20000,
                            StartAddress = "Cleveland",
                            VehicleId = 1
                        },
                        new
                        {
                            Id = 2,
                            Distance = 200,
                            ETA = 60,
                            EmbarkDate = new DateTime(2022, 4, 5, 16, 1, 38, 347, DateTimeKind.Local).AddTicks(2994),
                            EndAddress = "Miami",
                            EstimatedGasCost = 5,
                            EstimatedTotalCost = 1000,
                            MileageAfter = 20400,
                            MileageBefore = 20000,
                            StartAddress = "Shaker",
                            VehicleId = 1
                        },
                        new
                        {
                            Id = 3,
                            Distance = 200,
                            ETA = 60,
                            EmbarkDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            EndAddress = "Columbus",
                            EstimatedGasCost = 5,
                            EstimatedTotalCost = 1000,
                            MileageAfter = 20400,
                            MileageBefore = 20000,
                            StartAddress = "Chicago",
                            VehicleId = 1
                        },
                        new
                        {
                            Id = 4,
                            Distance = 200,
                            ETA = 60,
                            EmbarkDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            EndAddress = "NYC",
                            EstimatedGasCost = 5,
                            EstimatedTotalCost = 1000,
                            MileageAfter = 20400,
                            MileageBefore = 20000,
                            StartAddress = "Kent",
                            VehicleId = 2
                        },
                        new
                        {
                            Id = 5,
                            Distance = 200,
                            ETA = 60,
                            EmbarkDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            EndAddress = "Cincinnati",
                            EstimatedGasCost = 5,
                            EstimatedTotalCost = 1000,
                            MileageAfter = 20400,
                            MileageBefore = 20000,
                            StartAddress = "Cleveland",
                            VehicleId = 1
                        },
                        new
                        {
                            Id = 6,
                            Distance = 200,
                            ETA = 60,
                            EmbarkDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            EndAddress = "Cincinnati",
                            EstimatedGasCost = 5,
                            EstimatedTotalCost = 1000,
                            MileageAfter = 20400,
                            MileageBefore = 20000,
                            StartAddress = "Cleveland",
                            VehicleId = 1
                        },
                        new
                        {
                            Id = 7,
                            Distance = 200,
                            ETA = 60,
                            EmbarkDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            EndAddress = "Columbus",
                            EstimatedGasCost = 5,
                            EstimatedTotalCost = 1000,
                            MileageAfter = 20400,
                            MileageBefore = 20000,
                            StartAddress = "Chicago",
                            VehicleId = 1
                        },
                        new
                        {
                            Id = 8,
                            Distance = 200,
                            ETA = 60,
                            EmbarkDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            EndAddress = "Miami",
                            EstimatedGasCost = 5,
                            EstimatedTotalCost = 1000,
                            MileageAfter = 20400,
                            MileageBefore = 20000,
                            StartAddress = "Shaker",
                            VehicleId = 2
                        });
                });

            modelBuilder.Entity("TripometerAPI.Models.Vehicle", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<float>("FuelEfficiency")
                        .HasColumnType("real");

                    b.Property<float>("FuelTank")
                        .HasColumnType("real");

                    b.Property<string>("Make")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Model")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("OwnerId")
                        .HasColumnType("int");

                    b.Property<int>("Year")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.ToTable("Vehicles");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            FuelEfficiency = 21f,
                            FuelTank = 16f,
                            Make = "Ford",
                            Model = "Mustang",
                            OwnerId = 1,
                            Year = 2021
                        },
                        new
                        {
                            Id = 2,
                            FuelEfficiency = 36f,
                            FuelTank = 59f,
                            Make = "BMW",
                            Model = "3 Series",
                            OwnerId = 1,
                            Year = 2020
                        },
                        new
                        {
                            Id = 3,
                            FuelEfficiency = 24f,
                            FuelTank = 17.6f,
                            Make = "Carrear 4S Cabriolet",
                            Model = "Porsche",
                            OwnerId = 2,
                            Year = 2020
                        },
                        new
                        {
                            Id = 4,
                            FuelEfficiency = 20f,
                            FuelTank = 24f,
                            Make = "GT",
                            Model = "Bentley",
                            OwnerId = 2,
                            Year = 2020
                        },
                        new
                        {
                            Id = 5,
                            FuelEfficiency = 21f,
                            FuelTank = 16f,
                            Make = "BMW",
                            Model = "xDrive28i",
                            OwnerId = 3,
                            Year = 2017
                        },
                        new
                        {
                            Id = 6,
                            FuelEfficiency = 36f,
                            FuelTank = 59f,
                            Make = "BMW",
                            Model = "3 Series",
                            OwnerId = 3,
                            Year = 2020
                        },
                        new
                        {
                            Id = 7,
                            FuelEfficiency = 21f,
                            FuelTank = 16f,
                            Make = "Buick",
                            Model = "Encore",
                            OwnerId = 4,
                            Year = 2019
                        },
                        new
                        {
                            Id = 8,
                            FuelEfficiency = 36f,
                            FuelTank = 59f,
                            Make = "Toyota",
                            Model = "Crown",
                            OwnerId = 4,
                            Year = 2019
                        },
                        new
                        {
                            Id = 9,
                            FuelEfficiency = 47f,
                            FuelTank = 19f,
                            Make = "BMW",
                            Model = "X5",
                            OwnerId = 5,
                            Year = 2019
                        },
                        new
                        {
                            Id = 10,
                            FuelEfficiency = 30f,
                            FuelTank = 14.5f,
                            Make = "Volkswagen",
                            Model = "EOS",
                            OwnerId = 5,
                            Year = 2016
                        },
                        new
                        {
                            Id = 11,
                            FuelEfficiency = 28f,
                            FuelTank = 12.4f,
                            Make = "Honda",
                            Model = "Civic Type-R",
                            OwnerId = 6,
                            Year = 2022
                        });
                });

            modelBuilder.Entity("TripometerAPI.Models.Receipt", b =>
                {
                    b.HasOne("TripometerAPI.Models.Trip", "Trip")
                        .WithMany("Receipts")
                        .HasForeignKey("TripId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Trip");
                });

            modelBuilder.Entity("TripometerAPI.Models.Trip", b =>
                {
                    b.HasOne("TripometerAPI.Models.Vehicle", "Vehicle")
                        .WithMany("Trips")
                        .HasForeignKey("VehicleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Vehicle");
                });

            modelBuilder.Entity("TripometerAPI.Models.Vehicle", b =>
                {
                    b.HasOne("TripometerAPI.Models.Owner", "Owner")
                        .WithMany("Vehicles")
                        .HasForeignKey("OwnerId");

                    b.Navigation("Owner");
                });

            modelBuilder.Entity("TripometerAPI.Models.Owner", b =>
                {
                    b.Navigation("Vehicles");
                });

            modelBuilder.Entity("TripometerAPI.Models.Trip", b =>
                {
                    b.Navigation("Receipts");
                });

            modelBuilder.Entity("TripometerAPI.Models.Vehicle", b =>
                {
                    b.Navigation("Trips");
                });
#pragma warning restore 612, 618
        }
    }
}
