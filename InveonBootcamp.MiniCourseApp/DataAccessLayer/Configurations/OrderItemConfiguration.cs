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
    public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
    {
        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.Price).HasColumnType("decimal(18,2)").IsRequired();

            builder.HasOne(x => x.Order) 
                   .WithMany(x => x.OrderItems) 
                   .HasForeignKey(x => x.OrderId) 
                   .OnDelete(DeleteBehavior.Cascade); 

            builder.HasOne(x => x.Course) 
                   .WithMany()
                   .HasForeignKey(x => x.CourseId);
        }
    }
}
