export const Query = {
    test: () => 'testing ✅',

    getPets: async (_parent, args, context) => {
        const pets = await context.db.pet.findMany()

        if (!pets) {
            throw new Error (`Server Error`)
        }

        return pets
    }
}