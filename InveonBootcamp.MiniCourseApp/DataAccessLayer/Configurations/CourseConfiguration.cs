using EntityLayer.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Configurations
{
    public class CourseConfiguration : IEntityTypeConfiguration<Course>
    {
        public void Configure(EntityTypeBuilder<Course> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.Title).IsRequired().HasMaxLength(150);

            builder.Property(x => x.Description).HasMaxLength(1000);

            builder.Property(x => x.Price).HasColumnType("decimal(18,2)");

            builder.HasMany(x => x.UserCourses).WithOne(x => x.Course).HasForeignKey(x => x.CourseId);
        }
    }
}
