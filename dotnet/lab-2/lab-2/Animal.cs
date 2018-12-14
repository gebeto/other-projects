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

        public static Animal GetYounges(this IEnumerable<Animal> animals)
        {
            return (
                from animal in animals
                orderby animal.age
                select animal
            ).First();
        }
    }

    public class Animal {
        public string type;
        public string name;
        public int age;

        public Animal(string type, string name, int age) {
            this.type = type;
            this.name = name;
            this.age = age;
        }
    }
}