﻿using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace LifeLine.Data.Migrations
{
    public partial class Test02 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_SongCollection_Name",
                table: "SongCollection");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "SongCollection",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SongCollection_Name",
                table: "SongCollection",
                column: "Name",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_SongCollection_Name",
                table: "SongCollection");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "SongCollection",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.CreateIndex(
                name: "IX_SongCollection_Name",
                table: "SongCollection",
                column: "Name",
                unique: true,
                filter: "[Name] IS NOT NULL");
        }
    }
}