using System;
using System.Collections.Generic;

namespace lab_2
{

    class AnimalsPrinter
    {
        public static void PrintAnimals(IEnumerable<IAnimal> animals)
        {
            foreach (IAnimal animal in animals)
            {
                Console.WriteLine("| {0} | {1} | {2} |", animal.type, animal.name, animal.age);
            }
        }

        public static void PrintAnimals(Dictionary<string, List<Animal>> animals)
        {
            foreach (var animalKVP in animals)
            {
                Console.WriteLine(animalKVP.Key);
                AnimalsPrinter.PrintAnimals(animalKVP.Value);
            }
        }
    }
}