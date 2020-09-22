using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PhoneBook.Context;

namespace PhoneBook.Repository
{
	public class PhoneBookRepository
	{
		private SQLiteDBContext dbContext;

		public PhoneBookRepository(SQLiteDBContext dbContext)
		{
			this.dbContext = dbContext;
		}

		public IEnumerable<Models.PhoneBook> GetPhoneBooks()
		{
			return dbContext.PhoneBooks
				.AsNoTracking()
				.Include(p => p.Entries);
		}

		public Task<Models.PhoneBook> GetPhoneBookById(int phoneBookId)
		{
			return dbContext.PhoneBooks
				.AsNoTracking()
				.Include(p => p.Entries)
				.FirstOrDefaultAsync(p => p.Id == phoneBookId);
		}

		public IEnumerable<Models.Entry> SearchPhoneBookEntries(int phoneBookId, string query)
		{
			return dbContext.PhoneBookEntries
				.Where(p => p.PhoneBookId == phoneBookId)
				.Where(p => p.Name.ToLower().Contains(query.ToLower()))
				.AsNoTracking();
		}

		public async Task<Models.PhoneBook> SavePhoneBookAsync(Models.PhoneBook phoneBook)
		{
			if (phoneBook.Id > 0)
			{
				var result = dbContext.PhoneBooks.Update(phoneBook);

				await dbContext.SaveChangesAsync();

				result.State = EntityState.Detached;

				return result.Entity;
			}
			else
			{
				var result = dbContext.PhoneBooks.Add(phoneBook);

				await dbContext.SaveChangesAsync();

				result.State = EntityState.Detached;

				return result.Entity;
			}
		}

		public async Task DeletePhoneBookAsync(int phoneBookId)
		{
			var existing = await dbContext.PhoneBooks
				.Include(p => p.Entries)
				.FirstOrDefaultAsync(p => p.Id == phoneBookId);

			if (existing == null)
			{
				throw new ArgumentException("Phonebook Id does not exist.");
			}

			dbContext.PhoneBooks.Remove(existing);
			await dbContext.SaveChangesAsync();
		}
	}
}