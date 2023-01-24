import { PrismaClient } from '@prisma/client';
import { catBreeds, dogBreeds, horseBreeds } from './seedData.js';
const prisma = new PrismaClient();

enum Species {
  DOG = 'DOG',
  CAT = 'CAT',
  HORSE = 'HORSE',
}

async function createBreed(breed: string, species: Species) {
  await prisma.breed.create({
    data: {
      breed,
      species,
    },
  });
}

async function breedCreator() {
  let dog = dogBreeds.map(async (breed) => {
    await createBreed(breed.toLowerCase(), Species.DOG);
  });

  let cat = catBreeds.map(async (breed) => {
    await createBreed(breed.toLowerCase(), Species.CAT);
  });

  let horse = horseBreeds.map(async (breed) => {
    await createBreed(breed.toLowerCase(), Species.HORSE);
  });

  return {
    dog,
    cat,
    horse
  };
}

async function main() {
  await breedCreator();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
