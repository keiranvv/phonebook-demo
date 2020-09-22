using Microsoft.EntityFrameworkCore;

namespace PhoneBook.Context
{
	public class SQLiteDBContext : DbContext
	{
		public DbSet<Models.PhoneBook> PhoneBooks { get; set; }
		public DbSet<Models.Entry> PhoneBookEntries { get; set; }
		protected override void OnConfiguring(DbContextOptionsBuilder options)
				=> options.UseSqlite("Data Source=phonebook.db");

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Models.PhoneBook>().ToTable("PhoneBooks");
			modelBuilder.Entity<Models.Entry>().ToTable("Entries");
		}
	}
}