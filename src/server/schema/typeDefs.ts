const typeDefs = `#graphql
    type Query {
        getAgency: AgencyBase!
        getAgencies: [Agency]!
        getAgencyWithData: Agency!
    }

    type Mutation {
        loginAgency(input: LoginAgency!): Agency!
        registerAgency(input: RegisterAgency!): Agency!
        createOrUpdateAgencyProfile(input: CreateOrUpdateAgency!): AgencyProfile!
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

    input CreateOrUpdateAgency {
        bio: String
    }




    # ::: address :::
    type Address { 
        id: ID!

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

        name: String!
        email: String!
        password: String!
        token: String

        profile: AgencyProfile
        pets: [Pet]!
        volunteers: [User]!
    }

    type AgencyBase {
        id: ID!

        name: String!
        email: String!
        password: String!
        token: String
    }

    type AgencyProfile {
        id: ID!

        bio: String
        
        contacts: [Contact]!
        addresses: [Address]!

        agency: Agency!
        agencyId: Int!
    }




    # ::: user :::
    type User {
        id: ID!

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

        color: Color
        images: [ImagesToPetProfiles]

        pet: Pet!
        petId: Int!
    }

    enum Color {
        UNKNOWN
        BLACK
        WHITE
        BROWN
        GOLDEN
        BRINDLE
    }




    # ::: species :::
    type Species {
        id: ID!

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

export { typeDefs };
