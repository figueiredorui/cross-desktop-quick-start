using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Runtime.InteropServices;
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

        public override int SaveChanges()
        {
            try
            {                
                return base.SaveChanges();
            }            
            catch (Exception ex)
            {
                var msg = GetFullMessage(ex);
                throw new Exception(msg);
            }
        }

        private string GetFullMessage(Exception ex)
        {
            return ex.InnerException == null 
                 ? ex.Message 
                : ex.Message + " --> " + GetFullMessage(ex.InnerException);
        }

        public DbSet<Contact> Contacts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer(@"Server=.\;Database=MyDatabase;Trusted_Connection=True;");
            bool isWindows = RuntimeInformation.IsOSPlatform(OSPlatform.Windows);
            bool isOSX = RuntimeInformation.IsOSPlatform(OSPlatform.OSX);
            if (isOSX)
                optionsBuilder.UseSqlite("Filename=/Users/user/Documents/Data.db");
            else
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
