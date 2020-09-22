using System.ComponentModel.DataAnnotations;

namespace PhoneBook.Models
{
	public class Entry
	{
		public int Id { get; set; }

		public int PhoneBookId { get; set; }

		[Required]
		[MinLength(2)]
		public string Name { get; set; }

		[Required]
		[MinLength(2)]
		[StringLength(16)]
		public string PhoneNumber { get; set; }
	}
}