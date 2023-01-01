export const typeDefs = `#graphql
    type Query {
        test: String!
    }




    # ::: agency :::
    type Agency {
        id: ID!
        createdAt: String
        updatedAt: String

        username: String!
        password: String!

        address: AgencyAddress
        contact: AgencyContact
        pets: [Pet]!
    }

    type AgencyAddress {
        id: ID!
        createdAt: String
        updatedAt: String

        address: String!
        apartment: String
        city: String!
        state: String!
        zip: Int!
        country: String!

        agency: Agency
        agencyId: Int
    }

    type AgencyContact {
        id: ID!
        createdAt: String
        updatedAt: String

        phone: String
        email: String
        fax: String

        agency: Agency
        agencyId: Int
    }




    # ::: pet :::
    type Pet {
        id: ID!
        createdAt: String
        updatedAt: String

        details: PetDetails
        agency: Agency!
    }

    type PetDetails {
        id: ID!
        createdAt: String
        updatedAt: String

        name: String
        age: Int
        bio: String
        species: String
        breed: String
        gender: String
        weight: Int
        
        color: [ColorOnPetDetails]

        pet: Pet!
        petId: Int!
    }

    type Color {
        id: ID!
        createdAt: String
        updatedAt: String

        color: String

        pets: [ColorOnPetDetails]
    }

    type ColorOnPetDetails {
        color: Color
        colorId: Int
        details: PetDetails
        detailsId: Int
    }
`;
