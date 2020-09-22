using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PhoneBook.Repository;

namespace PhoneBook.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class PhoneBookController : ControllerBase
	{
		private readonly PhoneBookRepository _repository;
		private readonly ILogger<PhoneBookController> _logger;

		public PhoneBookController(ILogger<PhoneBookController> logger, PhoneBookRepository repository)
		{
			_logger = logger;
			_repository = repository;
		}

		[HttpGet]
		public IEnumerable<Models.PhoneBook> Get()
		{
			return _repository.GetPhoneBooks();
		}

		[HttpGet]
		[Route("{id}")]
		public Task<Models.PhoneBook> GetById(int id)
		{
			return _repository.GetPhoneBookById(id);
		}

		[HttpGet]
		[Route("{id}/entries")]
		public IEnumerable<Models.Entry> SearchEntries(int id, string query)
		{
			return _repository.SearchPhoneBookEntries(id, query);
		}

		[HttpPost]
		public Task<Models.PhoneBook> Save(Models.PhoneBook phoneBook)
		{
			return _repository.SavePhoneBookAsync(phoneBook);
		}

		[HttpDelete]
		[Route("{id}")]
		public Task Delete(int id)
		{
			return _repository.DeletePhoneBookAsync(id);
		}
	}
}
