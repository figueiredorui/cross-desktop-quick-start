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

        public Contact Get(int contactId){
            return ctx.Contacts.Find(contactId);
        }

         public Contact Insert(Contact contact){
            ctx.Contacts.Add(contact);
            ctx.SaveChanges();
            return contact;
        }

        public Contact Update(Contact contact){
            ctx.Contacts.Update(contact);
            ctx.SaveChanges();
            return contact;
        }

        public void Delete(int contactId){
            var contact = ctx.Contacts.Find(contactId);
            ctx.Contacts.Remove(contact);
            ctx.SaveChanges();
        }
    }
}