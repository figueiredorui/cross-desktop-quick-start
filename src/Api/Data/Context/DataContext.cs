using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Api.Data.Models;

namespace Api.Data.Context
{
    public class DataContext : DbContext
    {
        public DataContext()
        {
            this.Database.EnsureCreated();
            this.EnsureSeedData();
        }

        public DbSet<Contact> Contacts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer(@"Server=.\;Database=MyDatabase;Trusted_Connection=True;");
            optionsBuilder.UseSqlite("Filename=./Data.db");
        }
    }

    public static class DataContextExtensions
    {
        public static void EnsureSeedData(this DataContext context)
        {
            if (!context.Contacts.Any())
            {
                context.Contacts.AddRange(
                    new Contact() { FirstName = "John", LastName = "Smith" },
                    new Contact() { FirstName = "Mike", LastName = "Larson" }
                    );
                
                context.SaveChanges();
            }
        }
    }

}
