using System;
using System.Collections.Generic;
using System.Linq;

namespace lab_2 {
    public static class AnimalExtensions {
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

    public interface IAnimal
    {
        string name { get; }
        string type { get; }
        int age { get; }
    }

    public class Animal : IAnimal {
        public string type {get;}
        public int age {get;}
        public string name {get;}

        public Animal(string type, string name, int age) {
            this.type = type;
            this.name = name;
            this.age = age;
        }
    }

    public class AnimalsComparer : IComparer<Animal>
    {
        public int Compare(Animal a1, Animal a2)
        {
            return a1.age - a2.age;
        }
    }
}