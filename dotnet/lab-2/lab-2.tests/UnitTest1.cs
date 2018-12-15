using System;
using System.Collections.Generic;
using Xunit;
using lab_2;
using System.Linq;

namespace lab_2.tests
{
    public class UnitTest1
    {
        public List<Animal> animals = AnimalsGenerator.GenerateAnimals();

        [Fact(DisplayName = "Вибір тільки тих тварин котрі старші за 50 років")]
        public void Test1()
        {
            IEnumerable<Animal> filtered = (
                from animal in animals
                where animal.age > 50
                select animal
            );
            foreach (var item in filtered)
            {
                Assert.True(item.age > 50);
            }
        }

        [Fact(DisplayName = "Операції над Dictionary")]
        public void Test2()
        {
            Dictionary<string, List<Animal>> dict = animals.ToDictionaryByType();
            Assert.Equal(4, dict.Keys.Count);
        }

        [Fact(DisplayName = "Сортування за допомогою IComparer")]
        public void Test3()
        {
            Animal[] ans = animals.ToArray();
            Array.Sort(ans, new AnimalsAgeComparer());
            Animal older = ans[0];
            foreach (var animal in ans)
            {
                Assert.True(animal.age >= older.age);
            }
        }
    }
}