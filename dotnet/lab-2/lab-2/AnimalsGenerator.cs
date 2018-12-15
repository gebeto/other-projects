using System;
using System.Collections.Generic;

namespace lab_2 {

    public class AnimalsGenerator {
        public static string[] types = {
            "Horse",
            "Chicken",
            "Cow",
            "Duck",
        };

        public static string[] f_names = {
            "Steven",
            "Michael",
            "Marvin",
            "Mary",
            "Karin",
            "Robert",
            "Margaret",
            "Antonette",
            "Chyna",
            "Spike",
            "Alina",
            "Steven",
            "Kelsey",
            "Leonardo",
            "Grace",
            "Ryan",
            "Maddie",
            "William",
            "Dexter",
            "Adele",
            "Fenton",
            "Sawyer",
            "Oscar",
            "Edith",
            "Charlie"
        };

        public static string[] l_names = {
            "Hopkins",
            "Crosby",
            "Parker",
            "Ford",
            "Jones",
            "Rodriquez",
            "Eagle",
            "White",
            "Hahn",
            "Harper",
            "Harrison",
            "Foster",
            "West",
            "Murray",
            "Ross",
            "Turner",
            "Russell",
            "Wilson",
            "Payne",
            "Wells",
            "Baker",
            "Hall",
            "Evans",
            "Johnston",
            "Perry",
        };
        public static Random r = new Random();

        public static List<Animal> GenerateAnimals(int count)
        {
            List<Animal> animals = new List<Animal>(){};
            for (int i = 0; i < count; i++)
            {
                animals.Add(new Animal(
                    types[r.Next(0, types.Length)],
                    String.Format("{0} {1}", f_names[r.Next(0, types.Length)], l_names[r.Next(0, types.Length)]),
                    r.Next() % 100
                ));
            }
            return animals;
        }

        public static List<Animal> GenerateAnimals() {
            return new List<Animal>() {
                new Animal("Horse", "Steven Hopkins", 32),
                new Animal("Cow", "Michael Crosby", 28),
                new Animal("Chicken", "Marvin Parker", 24),
                new Animal("Cow", "Mary Ford", 21),
                new Animal("Horse", "Karin Jones", 55),
                new Animal("Horse", "Robert Rodriquez", 21),
                new Animal("Duck", "Margaret Eagle", 48),
                new Animal("Duck", "Antonette White", 21),
                new Animal("Duck", "Chyna Hahn", 21),
                new Animal("Duck", "Spike Harper", 30),
                new Animal("Horse", "Alina Harrison", 22),
                new Animal("Cow", "Steven Foster", 21),
                new Animal("Duck", "Kelsey West", 29),
                new Animal("Duck", "Leonardo Murray", 25),
                new Animal("Horse", "Grace Ross", 19),
                new Animal("Chicken", "Ryan Turner", 23),
                new Animal("Cow", "Maddie Russell", 23),
                new Animal("Cow", "William Wilson", 27),
                new Animal("Duck", "Dexter Payne", 27),
                new Animal("Horse", "Adele Wells", 34),
                new Animal("Duck", "Fenton Baker", 34),
                new Animal("Cow", "Sawyer Hall", 36),
                new Animal("Chicken", "Oscar Evans", 40),
                new Animal("Horse", "Edith Johnston", 34),
                new Animal("Duck", "Charlie Perry", 35),
                new Animal("Horse", "Derek Hawkins", 37),
                new Animal("Duck", "Lily Wright", 31),
                new Animal("Cow", "Kelsey Fowler", 30),
                new Animal("Chicken", "Amanda Crawford", 35),
                new Animal("Horse", "Heather Evans", 46),
                new Animal("Duck", "Alexia Miller", 43),
                new Animal("Duck", "Edith Morrison", 45),
                new Animal("Chicken", "Sam Clark", 45),
                new Animal("Duck", "Violet Montgomery", 48),
                new Animal("Chicken", "Ellia Harris", 48),
                new Animal("Horse", "Frederick Thomas", 50),
                new Animal("Duck", "Stuart Kelley", 49),
                new Animal("Chicken", "Melissa Allen", 48),
                new Animal("Duck", "Jenna Morgan", 42),
                new Animal("Horse", "Darcy Mitchell", 56),
                new Animal("Chicken", "Grace Anderson", 51),
                new Animal("Duck", "Julian Warren", 50),
                new Animal("Duck", "Victor Williams", 57),
                new Animal("Horse", "Melissa Jones", 52),
                new Animal("Horse", "James Montgomery", 56),
                new Animal("Duck", "Valeria Williams", 55),
                new Animal("Chicken", "Alexander Davis", 55),
                new Animal("Horse", "Elise Phillips", 58),
                new Animal("Duck", "Carina Higgins", 54),
                new Animal("Chicken", "John Richardson", 70),
                new Animal("Duck", "Arianna Chapman", 66),
                new Animal("Horse", "Ellia Wells", 65),
                new Animal("Duck", "Dominik Owens", 62),
                new Animal("Chicken", "Oscar Spencer", 61),
                new Animal("Duck", "Harold Allen", 65),
                new Animal("Horse", "Savana Cole", 64),
                new Animal("Chicken", "Maddie Spencer", 60),
                new Animal("Horse", "Kristian Smith", 62),
                new Animal("Duck", "Carlos Bailey", 67)
            };
        }
    }
}