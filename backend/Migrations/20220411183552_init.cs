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
                    MileageAfter = table.Column<int>(type: "int", nullable: false),
                    ETA = table.Column<int>(type: "int", nullable: false),
                    Distance = table.Column<int>(type: "int", nullable: false),
                    EstimatedGasCost = table.Column<int>(type: "int", nullable: false),
                    EstimatedTotalCost = table.Column<int>(type: "int", nullable: false),
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

            migrationBuilder.InsertData(
                table: "Trips",
                columns: new[] { "Id", "DisembarkDate", "Distance", "ETA", "EmbarkDate", "EndAddress", "EstimatedGasCost", "EstimatedTotalCost", "MileageAfter", "MileageBefore", "StartAddress", "VehicleId" },
                values: new object[,]
                {
                    { 1, null, 200, 60, new DateTime(2022, 3, 28, 14, 35, 51, 792, DateTimeKind.Local).AddTicks(5520), "Columbus", 5, 1000, 20400, 20000, "Cleveland", 1 },
                    { 2, null, 200, 60, new DateTime(2022, 4, 5, 14, 35, 51, 794, DateTimeKind.Local).AddTicks(7948), "Miami", 5, 1000, 20400, 20000, "Shaker", 1 },
                    { 3, null, 200, 60, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Columbus", 5, 1000, 20400, 20000, "Chicago", 1 },
                    { 5, null, 200, 60, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Cincinnati", 5, 1000, 20400, 20000, "Cleveland", 1 },
                    { 6, null, 200, 60, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Cincinnati", 5, 1000, 20400, 20000, "Cleveland", 1 },
                    { 7, null, 200, 60, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Columbus", 5, 1000, 20400, 20000, "Chicago", 1 },
                    { 4, null, 200, 60, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "NYC", 5, 1000, 20400, 20000, "Kent", 2 },
                    { 8, null, 200, 60, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Miami", 5, 1000, 20400, 20000, "Shaker", 2 }
                });

            migrationBuilder.InsertData(
                table: "Receipts",
                columns: new[] { "Id", "AdditionalCosts", "Date", "GasStation", "PricePerGallon", "TotalCost", "TripId" },
                values: new object[] { 2, 1200, new DateTime(2022, 4, 11, 14, 35, 51, 794, DateTimeKind.Local).AddTicks(9814), "Shaker", 5, 800, 1 });

            migrationBuilder.InsertData(
                table: "Receipts",
                columns: new[] { "Id", "AdditionalCosts", "Date", "GasStation", "PricePerGallon", "TotalCost", "TripId" },
                values: new object[] { 3, 1200, new DateTime(2022, 4, 11, 14, 35, 51, 794, DateTimeKind.Local).AddTicks(9840), "Shaker", 6, 800, 1 });

            migrationBuilder.InsertData(
                table: "Receipts",
                columns: new[] { "Id", "AdditionalCosts", "Date", "GasStation", "PricePerGallon", "TotalCost", "TripId" },
                values: new object[] { 1, 1200, new DateTime(2022, 4, 11, 14, 35, 51, 794, DateTimeKind.Local).AddTicks(8559), "Cleveland", 4, 800, 2 });

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
