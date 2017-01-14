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
        // GET api/values
        [HttpGet]
        public IEnumerable<Contact> Get()
        {
            var result = contactRepository.Get();
            return result;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
