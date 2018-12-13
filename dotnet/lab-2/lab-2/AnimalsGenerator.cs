using System;
using System.Collections.Generic;

namespace lab_2 {

    class AnimalsGenerator {
        public static string[] types = {
            "Horse",
            "Chicken",
            "Cow",
            "Duck",
        };

        public static string[] names = {
            "Terry",
            "Andrew",
            "Antony",
            "Cherry",
            "Anna",
            "Emma",
        };
        public static Random r = new Random();

        public static List<Animal> GenerateAnimals(int count)
        {
            List<Animal> animals = new List<Animal>(){};
            for (int i = 0; i < count; i++)
            {
                animals.Add(new Animal(
                    types[r.Next(0, types.Length)],
                    names[r.Next(0, names.Length)],
                    r.Next() % 100
                ));
            }
            return animals;
        }

        public static void GenerateAnimalsPrint(int count)
        {
            foreach (Animal item in GenerateAnimals(count))
            {
                Console.WriteLine(
                    "Animal - {0}, {1}, {2}",
                    item.type,
                    item.name,
                    item.age
                );
            }
        }
    }
}