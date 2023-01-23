const Query = {
    // BREEDS 
    breeds: async (_parent, _args, { db, agency }) => {
        const result = await db.breed.findMany();
        return result;
    },
    dogBreeds: async (_parent, _args, { db, agency }) => {
        const result = await db.breed.findMany({
            where: { species: 'DOG' }
        });
        return result;
    },
    catBreeds: async (_parent, _args, { db, agency }) => {
        const result = await db.breed.findMany({
            where: { species: 'CAT' }
        });
        return result;
    },
    horseBreeds: async (_parent, _args, { db, agency }) => {
        const result = await db.breed.findMany({
            where: { species: 'HORSE' }
        });
        return result;
    },
    // AGENCY
    // GET agency with only base data // { id, name, email, token, password }
    agency: async (_parent, _args, { db, agency }) => {
        if (!agency)
            throw new Error(`::: 🚫 No authenticated entity :::`);
        const { id } = agency;
        const result = await db.agency.findUnique({
            where: { id },
        });
        return result;
    },
    // GET agency w/ extra data // { ...agency, profile, pets, volunteers}
    agencyWithData: async (_parent, _args, { db, agency }) => {
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
        console.log(`::: result from getAgencyQuery :::`, result);
        return result;
    },
    // GET all agencies with only base data // { id, name, email, token, password }
    agencies: async (_parent, _args, { db, agency }) => {
        if (!agency)
            throw new Error(`::: 🚫 No authenticated entity :::`);
        const agencies = await db.agency.findMany();
        return agencies;
    },
};
export { Query };
