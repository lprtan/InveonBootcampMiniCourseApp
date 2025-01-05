using EntityLayer.Concrete;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Context
{
    public class AppDbContext : IdentityDbContext<UserApp, IdentityRole, string>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Course> Courses { get; set; }
        public DbSet<UserCourse> UserCourses { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<UserRefreshToken> UserRefreshTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);

            modelBuilder.Entity<IdentityRole>().HasData(
                new IdentityRole
                {
                    Id = "75ae2f72-3e2e-4ae4-b2dd-24b73e53325f",
                    Name = "Instructor",
                    NormalizedName = "INSTRUCTOR"
                }
            );

            var hasher = new PasswordHasher<UserApp>();
            string defaultPassword = "Alperen.12"; 

            var adminUser = new UserApp
            {
                Id = "512dbe35-fcd4-4120-8db7-52a307c4f653",
                UserName = "lprntan",
                NormalizedUserName = "LPRNTAN",
                FullName = "Alperen Tan",
                Email = "lprntan@gmail.com",
                NormalizedEmail = "LPRNTAN@GMAIL.COM",
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString()
            };
            adminUser.PasswordHash = hasher.HashPassword(adminUser, defaultPassword);

            var user1 = new UserApp
            {
                Id = "2efe582b-df7c-4c4a-9936-6029f231b20c",
                UserName = "beyza",
                NormalizedUserName = "BEYZA",
                FullName = "Beyza Erdem",
                Email = "beyza@gmail.com",
                NormalizedEmail = "BEYZA@GMAIL.COM",
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString()
            };
            user1.PasswordHash = hasher.HashPassword(user1, defaultPassword);

            var user2 = new UserApp
            {
                Id = "b447a8b9-0589-47b2-acc2-ad0a761f9c7d",
                UserName = "kahya",
                NormalizedUserName = "KAHYA",
                FullName = "Furkan Kahya",
                Email = "furkan@gmail.com",
                NormalizedEmail = "FURKAN@GMAIL.COM",
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString()
            };
            user2.PasswordHash = hasher.HashPassword(user2, defaultPassword);


            modelBuilder.Entity<UserApp>().HasData(adminUser, user1, user2);


            modelBuilder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string>
                {
                    UserId = "512dbe35-fcd4-4120-8db7-52a307c4f653", 
                    RoleId = "75ae2f72-3e2e-4ae4-b2dd-24b73e53325f"
                }
            );

            base.OnModelCreating(modelBuilder);
        }

    }
}
