using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PhoneBook.Models
{
	public class PhoneBook
	{
		public PhoneBook()
		{
			Entries = new List<Entry>();
		}

		public int Id { get; set; }

		[Required]
		[MinLength(2, ErrorMessage = "Name field requires a minimum length of 2 characters")]
		public string Name { get; set; }
		public IEnumerable<Entry> Entries { get; set; }
	}
}