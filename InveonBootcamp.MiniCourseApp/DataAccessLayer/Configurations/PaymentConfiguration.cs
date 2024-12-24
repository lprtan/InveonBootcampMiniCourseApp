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
    public class PaymentConfiguration : IEntityTypeConfiguration<Payment>
    {
        public void Configure(EntityTypeBuilder<Payment> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.Amount)
                   .HasColumnType("decimal(18,2)")
                   .IsRequired();  

            builder.Property(x => x.PaymentDate)
                   .IsRequired();  

            builder.HasOne(x => x.UserCourse)  
                   .WithMany()  
                   .HasForeignKey(x => x.UserCourseId)  
                   .OnDelete(DeleteBehavior.Cascade); 
        }
    }
}
