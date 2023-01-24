using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
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