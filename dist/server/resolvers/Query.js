"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
exports.Query = {
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
    getAgencies: async (_parent, _args, context) => {
        const agencies = await context.db.agency.findMany({});
        return agencies;
    },
    getAgencyById: async (_parent, _args, context) => {
        const agency = await context.db.agency.findUnique({
            where: { email: 'email-2' }
        });
        console.log('::: getAgencyById Query :::', context.agency);
        return agency;
    },
};
