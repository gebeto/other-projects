using System;
using System.Linq;
using System.Collections.Generic;

namespace lab_2
{
    class Program
    {
        static void Main(string[] args)
        {
            List<Animal> animals = AnimalsGenerator.GenerateAnimals(100);

            // IEnumerable<Animal> lg50sm60 = animals.Where(a => a.age >= 50 && a.age <= 60).Select(x => x);
            IEnumerable<Animal> lg50sm60 = (
                from animal in animals
                where animal.age >= 50 && animal.age <= 60
                select animal
            );

            Console.WriteLine("All");
            foreach (Animal animal in animals)
            {
                Console.WriteLine("Animal: {0}, {1}, {2}", animal.name, animal.type, animal.age);
            }

            Console.WriteLine("\nAnimals older then 50 years and smaller than 60:");
            foreach (Animal animal in lg50sm60)
            {
                Console.WriteLine("Animal: {0}, {1}, {2}", animal.name, animal.type, animal.age);
            }
            
        }
    }
}
