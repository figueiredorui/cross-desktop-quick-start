using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Api.Data.Repositories;
using Api.Data.Models;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    public class ContactsController : Controller
    {
        ContactRepository contactRepository;
        public ContactsController(){
            contactRepository = new ContactRepository();
        }
        // GET api/contacts
        [HttpGet]
        public IEnumerable<Contact> Get()
        {
            var result = contactRepository.Get();
            return result;
        }

        // GET api/contacts/5
        [HttpGet("{id}", Name="Get")]
        public Contact Get(int id)
        {
            var result = contactRepository.Get(id);
            return result;
        }

        // POST api/contacts
        [HttpPost]
        public IActionResult Post([FromBody]Contact contact)
        {
            try{
                contactRepository.Insert(contact);
                return CreatedAtRoute("Get", new { id = contact.ContactId }, contact);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        // PUT api/contacts/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Contact contact)
        {
            contactRepository.Update(contact);
        }

        // DELETE api/contacts/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            contactRepository.Delete(id);
        }
    }
}
