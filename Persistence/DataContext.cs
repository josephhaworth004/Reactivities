using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

    public DbSet<Activity> Activities { get; set; }   
    }
}