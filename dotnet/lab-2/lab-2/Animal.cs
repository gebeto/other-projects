using System;
using System.Collections.Generic;
using System.Linq;

namespace lab_2 {

    public class AnimalsAgeComparer : IComparer<Animal>
    {
        public int Compare(Animal a1, Animal a2)
        {
            int byAge = a1.age - a2.age;
            return byAge;
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
}