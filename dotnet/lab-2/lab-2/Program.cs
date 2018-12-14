using System;
using System.Linq;
using System.Collections.Generic;

namespace lab_2
{
    class Program
    {
        static void Selection(IEnumerable<Animal> animals)
        {
            var lg50sm60 = (
                from animal in animals
                where animal.age >= 50 && animal.age <= 60
                orderby animal.age ascending
                select new {
                    name = animal.name,
                    type = animal.type,
                    age = animal.age,
                    toConsoleWrite = String.Format("Animal: {0}, {1}, {2} ", animal.name, animal.type, animal.age)
                }
            );

            Console.WriteLine("\nAnimals older then 50 years and smaller than 60: {0}", lg50sm60.Count());
            foreach (var animal in lg50sm60)
            {
                Console.WriteLine(animal.toConsoleWrite);
            }
        }

        static void Main(string[] args)
        {
            List<Animal> animals = new List<Animal>(
                from animal in AnimalsGenerator.GenerateAnimals(100)
                orderby animal.age
                select animal
            );

            Selection(animals.GetWithName("John"));

            Animal[] animalsArr = animals.ToArray();
            Console.WriteLine("Type of 'animalsArr' = {0}", animalsArr.GetType());
            Console.WriteLine("FIrst element of 'animalsArr' = {0}", animalsArr[0].name);
        }
    }
}
