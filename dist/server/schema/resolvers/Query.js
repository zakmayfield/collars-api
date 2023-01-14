const Query = {
    getPets: async (_parent, args, context) => {
        const pets = await context.db.pet.findMany({
            include: {
                species: {
                    include: {
                        species: true,
                    },
                },
                breed: {
                    include: {
                        breed: true,
                    },
                },
                profile: true,
            },
        });
        if (!pets) {
            throw new Error(`Server Error`);
        }
        return pets;
    },
    getAgencies: async (_parent, _args, { db, agency }) => {
        if (!agency)
            throw new Error(`::: 🚫 No authenticated entity :::`);
        const agencies = await db.agency.findMany({});
        return agencies;
    },
    getAgencyById: async (_parent, _args, { db, agency }) => {
        if (!agency)
            throw new Error(`::: 🚫 No authenticated entity :::`);
        const { id } = agency;
        const result = await db.agency.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
        return result;
    },
    getAgency: async (_parent, _args, { db, agency }) => {
        if (!agency)
            throw new Error(`::: 🚫 No authenticated entity :::`);
        const { id } = agency;
        const result = await db.agency.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
        return result;
    },
};
export { Query };
