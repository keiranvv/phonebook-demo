using System.ComponentModel.DataAnnotations;

namespace PhoneBook.Models
{
	public class Entry
	{
		public int Id { get; set; }

		public int PhoneBookId { get; set; }

		[Required]
		[MinLength(2, ErrorMessage = "Name field requires a minimum length of 2 characters")]
		public string Name { get; set; }

		[Required]
		[MinLength(2, ErrorMessage = "Phone number field requires a minimum length of 2 characters")]
		[StringLength(16)]
		public string PhoneNumber { get; set; }
	}
}