using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Api.Data.Context;
using Api.Data.Models;

namespace Api.Data.Repositories
{
    public class ContactRepository
    {
        DataContext ctx;
        public ContactRepository()
        {
            ctx = new DataContext();
        }

        public List<Contact> Get(){
            return ctx.Contacts.ToList();
        }
    }
}