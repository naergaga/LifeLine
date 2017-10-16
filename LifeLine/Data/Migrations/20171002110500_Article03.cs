using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace LifeLine.Data.Migrations
{
    public partial class Article03 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_ArticleCategory_ParentId",
                table: "ArticleCategory",
                column: "ParentId");

            migrationBuilder.AddForeignKey(
                name: "FK_ArticleCategory_ArticleCategory_ParentId",
                table: "ArticleCategory",
                column: "ParentId",
                principalTable: "ArticleCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArticleCategory_ArticleCategory_ParentId",
                table: "ArticleCategory");

            migrationBuilder.DropIndex(
                name: "IX_ArticleCategory_ParentId",
                table: "ArticleCategory");
        }
    }
}
