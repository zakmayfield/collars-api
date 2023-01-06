"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
exports.Query = {
    test: () => 'testing ✅',
    getPets: async (_parent, args, context) => {
        const pets = await context.db.pet.findMany({
            include: {
                species: {
                    include: {
                        species: true
                    }
                },
                breed: {
                    include: {
                        breed: true
                    }
                },
                profile: true
            }
        });
        if (!pets) {
            throw new Error(`Server Error`);
        }
        return pets;
    }
};
