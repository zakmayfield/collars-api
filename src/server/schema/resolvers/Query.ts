const Query = {
  // GET agency by ID
  getAgency: async (_parent, _args, { db, agency }) => {
    if (!agency) throw new Error(`::: 🚫 No authenticated entity :::`);

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

  getAgencyProfile: async (_parent, _args, { db, agency }) => {
    if (!agency) throw new Error(`::: 🚫 No authenticated entity :::`);

    const { id } = agency;

    const result = await db.agencyProfile.findUnique({
      where: { agencyId: id },
      include: {
        addresses: true,
        contacts: true,
      }
    });

    return result;
  },

  // GET all agencies
  getAgencies: async (_parent, _args, { db, agency }) => {
    if (!agency) throw new Error(`::: 🚫 No authenticated entity :::`);

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
