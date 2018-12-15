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
                select animal
            );

            Console.WriteLine("\nAnimals older then 50 years and smaller than 60: {0}", lg50sm60.Count());
            lg50sm60.WriteToConsole();
            // AnimalsPrinter.PrintAnimals(lg50sm60);
        }

        static void ToArray(IEnumerable<Animal> animals)
        {
            Animal[] animalsArr = animals.ToArray();
            Console.WriteLine("Type of 'animalsArr' = {0}", animalsArr.GetType());
            Console.WriteLine("FIrst element of 'animalsArr' = {0}", animalsArr[0].name);
        }

        static void Main(string[] args)
        {
            List<Animal> animals = new List<Animal>(
                from animal in AnimalsGenerator.GenerateAnimals(100)
                orderby animal.age
                select animal
            );

            Selection(animals.GetWithName("John"));
            ToArray(animals);

            Dictionary<string, List<Animal>> dict = animals.ToDictionaryByType();

            Console.WriteLine("Grouped");
            dict.WriteToConsole();

            Console.WriteLine("\n\nGrouped filtered");
            dict.SelectMany(
                kvp => kvp.Value.Where(
                    animal => animal.age > 50
                )
            ).WriteToConsole();

        }
    }
}
