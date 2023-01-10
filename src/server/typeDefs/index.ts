export const typeDefs = `#graphql
    type Query {
        getPets: [Pet!]!
        getAgencies: [Agency!]!
        getAgencyById(id: ID!): Agency!
    }

    type Mutation {
        test: String!
        registerAgency(input: RegisterAgency!): Agency!
        loginAgency(input: LoginAgency!): Agency!
    }

    input RegisterAgency {
        name: String!
        email: String!
        password: String!
    }

    input LoginAgency {
        email: String!
        password: String!
    }




    # ::: address :::
    type Address { 
        id: ID!
        createdAt: String
        updatedAt: String

        address: String!
        apartment: String
        city: String!
        state: String!
        zip: Int!
        country: String!
        
        agencyProfile: AgencyProfile
        userProfile: UserProfile

        agencyProfileId: Int
        userProfileId: Int
    }




    # ::: contact :::
    type Contact {
        id: ID!
        createdAt: String
        updatedAt: String

        phone: String
        email: String

        agencyProfile: AgencyProfile
        userProfile: UserProfile

        agencyProfileId: Int
        volunteerProfileId: Int
    }




    # ::: agency :::
    type Agency {
        id: ID!
        createdAt: String
        updatedAt: String

        name: String!
        email: String!
        password: String!
        token: String

        profile: AgencyProfile
        pets: [Pet]!
        volunteers: [User]!
    }

    type AgencyProfile {
        id: ID!
        createdAt: String
        updatedAt: String

        username: String!
        bio: String
        
        contacts: [Contact]!
        addresses: [Address]!

        agency: Agency!
        agencyId: Int!
    }




    # ::: user :::
    type User {
        id: ID!
        createdAt: String
        updatedAt: String

        username: String!
        email: String!
        password: String!
        role: String!
        token: String

        profile: UserProfile
        agency: Agency
        savedPets: [UsersToPets]!

        agencyId: Int
    }

    type UserProfile {
        id: ID!
        createdAt: String
        updatedAt: String

        firstName: String
        lastName: String
        bio: String

        contact: Contact
        address: Address

        user: User!
        userId: Int!
    }

    type UsersToPets {
        user: User!
        userId: Int!
        pet: Pet!
        petId: Int!
    }




    # ::: pet :::
    type Pet {
        id: ID!
        createdAt: String
        updatedAt: String

        name: String!
        species: [SpeciesToPets]
        breed: [BreedsToPets]
        savedBy: [UsersToPets]

        profile: PetProfile
        agency: Agency!

        agencyId: Int!
    }

    type PetProfile {
        id: ID!
        createdAt: String
        updatedAt: String

        age: Int
        bio: String
        sex: String
        weight: Int
        birthday: String
        coat: String
        goodWith: String
        personalityType: String
        dietRestrictions: String
        isHouseTrained: Boolean
        isAvailable: Boolean!

        color: [ColorsToPetProfiles]
        images: [ImagesToPetProfiles]

        pet: Pet!
        petId: Int!
    }




    # ::: color :::
    type Color {
        id: ID!
        createdAt: String
        updatedAt: String
       

        color: String!

        pets: [ColorsToPetProfiles]
    }

    type ColorsToPetProfiles {
        color: Color!
        colorId: Int!
        petProfile: PetProfile!
        petProfileId: Int!
    }




    # ::: species :::
    type Species {
        id: ID!
        createdAt: String
        updatedAt: String

        species: String!

        pets: [SpeciesToPets]
    }

    type SpeciesToPets {
        species: Species!
        speciesId: Int!
        pet: Pet!
        petId: Int!
    }





    # ::: breed :::
    type Breed {
        id: ID!
        createdAt: String
        updatedAt: String
       

        breed: String!

        pets: [BreedsToPets]
    }

    type BreedsToPets {
        breed: Breed!
        breedId: Int!
        pet: Pet!
        petId: Int!
    }




    # ::: image :::
    type Image {
        id: ID!
        createdAt: String
        updatedAt: String

        url: String
        file: String
        thumbnail: String

        pets: [ImagesToPetProfiles]
    }

    type ImagesToPetProfiles {
        image: Image!
        imageId: Int!
        petProfile: PetProfile!
        petProfileId: Int!
    }
`;
