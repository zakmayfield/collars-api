const Query = {
    // BREEDS
    breeds: async (_parent, _args, { db }) => {
        const result = await db.breed.findMany();
        return result;
    },
    dogBreeds: async (_parent, _args, { db }) => {
        const result = await db.breed.findMany({
            where: { species: 'DOG' },
        });
        return result;
    },
    catBreeds: async (_parent, _args, { db }) => {
        const result = await db.breed.findMany({
            where: { species: 'CAT' },
        });
        return result;
    },
    horseBreeds: async (_parent, _args, { db }) => {
        const result = await db.breed.findMany({
            where: { species: 'HORSE' },
        });
        return result;
    },
    // PET
    pets: async (_parent, _args, { db }) => {
        const result = await db.pet.findMany();
        return result;
    },
    petById: async (_parent, { id }, { db, agency }) => {
        if (!agency)
            throw new Error(`::: 🚫 No authenticated entity :::`);
        const result = await db.pet.findUnique({
            where: { id: Number(id) },
            include: {
                breed: {
                    include: {
                        breed: true,
                    },
                },
                savedBy: true,
                profile: true,
                agency: true,
            },
        });
        if (!result) {
            throw new Error(`🚫 Couldn't locate pet.`);
        }
        return result;
    },
    petsByAgency: async (_parent, _args, { db, agency }) => {
        if (!agency)
            throw new Error(`::: 🚫 No authenticated entity :::`);
        const result = await db.pet.findMany({
            where: { agencyId: agency.id },
            include: {
                breed: {
                    include: {
                        breed: true,
                    },
                },
            },
        });
        return result;
    },
    // AGENCY
    agencies: async (_parent, _args, { db, agency }) => {
        if (!agency)
            throw new Error(`::: 🚫 No authenticated entity :::`);
        const agencies = await db.agency.findMany();
        return agencies;
    },
    agencyById: async (_parent, _args, { db, agency }) => {
        if (!agency)
            throw new Error(`::: 🚫 No authenticated entity :::`);
        const { id } = agency;
        const result = await db.agency.findUnique({
            where: { id },
        });
        return result;
    },
    agencyByIdWithData: async (_parent, _args, { db, agency }) => {
        if (!agency)
            throw new Error(`::: 🚫 No authenticated entity :::`);
        const { id } = agency;
        const result = await db.agency.findUnique({
            where: { id },
            include: {
                profile: true,
                pets: true,
                volunteers: true,
            },
        });
        return result;
    },
};
export { Query };
