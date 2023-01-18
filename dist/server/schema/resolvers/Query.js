const Query = {
    // GET agency with only base data // { id, name, email, token, password }
    getAgency: async (_parent, _args, { db, agency }) => {
        if (!agency)
            throw new Error(`::: 🚫 No authenticated entity :::`);
        const { id } = agency;
        const result = await db.agency.findUnique({
            where: { id },
        });
        return result;
    },
    // GET agency w/ extra data // { ...agency, profile, pets, volunteers}
    getAgencyWithData: async (_parent, _args, { db, agency }) => {
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
    getAgencies: async (_parent, _args, { db, agency }) => {
        if (!agency)
            throw new Error(`::: 🚫 No authenticated entity :::`);
        const agencies = await db.agency.findMany();
        return agencies;
    },
    // getPets: async (_parent, args, context) => {
    //   const pets = await context.db.pet.findMany({
    //     include: {
    //       species: {
    //         include: {
    //           species: true,
    //         },
    //       },
    //       breed: {
    //         include: {
    //           breed: true,
    //         },
    //       },
    //       profile: true,
    //     },
    //   });
    //   if (!pets) {
    //     throw new Error(`Server Error`);
    //   }
    //   return pets;
    // },
};
export { Query };
