using System;
using System.Linq;
using System.Collections.Generic;


namespace lab_2
{
    public static class AnimalExtensions
    {
        public static void WriteToConsole(this Animal animal)
        {
            Console.WriteLine("| {0} | {1} | {2} |", animal.type, animal.name, animal.age);
        }

        public static void WriteToConsole(this IEnumerable<Animal> animals)
        {
            foreach (Animal item in animals)
            {
                item.WriteToConsole();
            }
        }

        public static void WriteToConsole(this Dictionary<string, List<Animal>> animals)
        {
            foreach (KeyValuePair<string, List<Animal>> item in animals)
            {
                Console.WriteLine(item.Key);
                item.Value.WriteToConsole();
            }
        }

        public static IEnumerable<Animal> GetOlderThen(this IEnumerable<Animal> animals, int olderThen)
        {
            return (
                from animal in animals
                where animal.age > olderThen
                select animal
            );
        }

        public static IEnumerable<IAnimal> ToList(this IEnumerable<IAnimal> animals)
        {
            return animals;
        }

        public static IEnumerable<Animal> GetWithName(this IEnumerable<Animal> animals, string name)
        {
            return (
                from animal in animals
                where animal.name == name
                select animal
            );
        }

        public static IEnumerable<Animal> GetWithType(this IEnumerable<Animal> animals, string type)
        {
            return animals.Where(animal => animal.type == type);
        }

        public static IEnumerable<IGrouping<string, Animal>> ToGroupByType(this IEnumerable<Animal> animals)
        {
            var group = (
                from animal in animals
                group animal by animal.type
            );
            return group;
        }

        public static Dictionary<string, List<Animal>> ToDictionaryByType(this IEnumerable<Animal> animals)
        {
            Dictionary<string, List<Animal>> dict = new Dictionary<string, List<Animal>>();
            foreach (var group in animals.ToGroupByType())
            {
                List<Animal> ans = new List<Animal>();
                foreach (var item in group)
                {
                    ans.Add(item);
                }
                dict.Add(group.Key, ans);
            }

            return dict;
        }


        public static Animal GetYounges(this IEnumerable<Animal> animals)
        {
            return (
                from animal in animals
                orderby animal.age
                select animal
            ).First();
        }
    }
}