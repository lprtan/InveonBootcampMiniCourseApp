using BusinessLayer.Services.Abstract;
using DataAccessLayer.Repositories.Abstract;
using DataAccessLayer.UnitOfWork.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Services.Concrete
{
    public class GenericService<T> : IGenericService<T> where T : class
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IGenericRepository<T> _genericRepository;
        public GenericService(IUnitOfWork unitOfWork, IGenericRepository<T> genericRepository)
        {
            _unitOfWork = unitOfWork;
            _genericRepository = genericRepository;
        }
        public async Task AddAsync(T entity)
        {
            await _genericRepository.AddAsync(entity);
            await _unitOfWork.SaveAsync();
        }

        public async Task DeleteAsync(int id)
        {
            await _genericRepository.DeleteAsync(id);
            await _unitOfWork.SaveAsync();
        }

        public Task<bool> ExistsAsync(int id)
        {
            return _genericRepository.ExistsAsync(id);
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _genericRepository.GetAllAsync();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _genericRepository.GetByIdAsync(id);
        }

        public async Task UpdateAsync(T entity)
        {
            await _genericRepository.UpdateAsync(entity);
            await _unitOfWork.SaveAsync();
        }
    }
}
