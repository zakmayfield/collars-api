import { PrismaClient } from '@prisma/client';
import { catBreeds, dogBreeds, horseBreeds } from './seedData.js';
const prisma = new PrismaClient();
var Species;
(function (Species) {
    Species["DOG"] = "DOG";
    Species["CAT"] = "CAT";
    Species["HORSE"] = "HORSE";
})(Species || (Species = {}));
async function createBreed(breed, species) {
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
