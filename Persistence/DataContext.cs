using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : Microsoft.EntityFrameworkCore.DbContext // Derive from provided class
    {
        // Constructor
        public DataContext(DbContextOptions options) : base(options)
        {
        }

    // Prop of type DBSet and specify <Activity> as the entity
    // Give the it the name of Activities (the name of the table)
    public DbSet<Activity> Activities { get; set; }   
    }
}