using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TripometerAPI.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Owners",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Owners", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Vehicles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Make = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Model = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Year = table.Column<int>(type: "int", nullable: false),
                    FuelEfficiency = table.Column<float>(type: "real", nullable: false),
                    OwnerId = table.Column<int>(type: "int", nullable: true),
                    FuelTank = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Vehicles_Owners_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Owners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Trips",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmbarkDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DisembarkDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    StartAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EndAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MileageBefore = table.Column<int>(type: "int", nullable: false),
                    ArrivalDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReturnDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Distance = table.Column<double>(type: "float", nullable: false),
                    EstimatedGasCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    EstimatedFuelUsage = table.Column<double>(type: "float", nullable: false),
                    VehicleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trips", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Trips_Vehicles_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "Vehicles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Receipts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PricePerGallon = table.Column<int>(type: "int", nullable: false),
                    TotalCost = table.Column<int>(type: "int", nullable: false),
                    AdditionalCosts = table.Column<int>(type: "int", nullable: false),
                    GasStation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TripId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Receipts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Receipts_Trips_TripId",
                        column: x => x.TripId,
                        principalTable: "Trips",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Owners",
                columns: new[] { "Id", "FirstName", "LastName" },
                values: new object[,]
                {
                    { 1, "Denzel", "Mclntyre" },
                    { 2, "Jessica", "Wang" },
                    { 3, "Darius", "Hammond" },
                    { 4, "Rimma", "Girsheva" },
                    { 5, "Qadriyyah", "Johnson" },
                    { 6, "Brad", "Weir" }
                });

            migrationBuilder.InsertData(
                table: "Vehicles",
                columns: new[] { "Id", "FuelEfficiency", "FuelTank", "Make", "Model", "OwnerId", "Year" },
                values: new object[,]
                {
                    { 1, 21f, 16f, "Ford", "Mustang", 1, 2021 },
                    { 2, 36f, 59f, "BMW", "3 Series", 1, 2020 },
                    { 3, 24f, 17.6f, "Carrear 4S Cabriolet", "Porsche", 2, 2020 },
                    { 4, 20f, 24f, "GT", "Bentley", 2, 2020 },
                    { 5, 21f, 16f, "BMW", "xDrive28i", 3, 2017 },
                    { 6, 36f, 59f, "BMW", "3 Series", 3, 2020 },
                    { 7, 21f, 16f, "Buick", "Encore", 4, 2019 },
                    { 8, 36f, 59f, "Toyota", "Crown", 4, 2019 },
                    { 9, 47f, 19f, "BMW", "X5", 5, 2019 },
                    { 10, 30f, 14.5f, "Volkswagen", "EOS", 5, 2016 },
                    { 11, 28f, 12.4f, "Honda", "Civic Type-R", 6, 2022 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Receipts_TripId",
                table: "Receipts",
                column: "TripId");

            migrationBuilder.CreateIndex(
                name: "IX_Trips_VehicleId",
                table: "Trips",
                column: "VehicleId");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_OwnerId",
                table: "Vehicles",
                column: "OwnerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Receipts");

            migrationBuilder.DropTable(
                name: "Trips");

            migrationBuilder.DropTable(
                name: "Vehicles");

            migrationBuilder.DropTable(
                name: "Owners");
        }
    }
}
