const typeDefs = `#graphql
    type Query {
        # ::: BREED :::
        breeds: [Breed!]!
        dogBreeds: [Breed!]!
        catBreeds: [Breed!]!
        horseBreeds: [Breed!]!

        # ::: PET :::
        pet(id: ID!): Pet!

        agency: AgencyBase!
        agencies: [Agency]!
        agencyWithData: Agency!
    }

    type Mutation {
        loginAgency(input: LoginAgency!): Agency!
        registerAgency(input: RegisterAgency!): Agency!
        createOrUpdateAgencyProfile(input: CreateOrUpdateAgency!): AgencyProfile!

        # ::: PET :::
        createPet(input: CreatePet!): Pet!
        addBreedToPet(input: BreedToPet!): Pet!
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

    input CreatePet {
        name: String,
        species: Species
    }

    input BreedToPet {
        breedId: Int!
        petId: Int!
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

        createdAt: String
        updatedAt: String
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
        role: UserRole!
        token: String

        profile: UserProfile
        agency: Agency
        savedPets: [UsersToPets]!

        agencyId: Int

        createdAt: String
        updatedAt: String
    }

    enum UserRole {
        ADOPTER
        VOLUNTEER
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
        species: Species!
        breed: [BreedsToPets]
        savedBy: [UsersToPets]

        profile: PetProfile
        agency: Agency!

        agencyId: Int!

        createdAt: String
        updatedAt: String
    }

    enum Species {
        CAT
        DOG
        BIRD
        HORSE
        FISH
        REPTILE
        BARNYARD
    }

    type PetProfile {
        id: ID!

        age: Int
        bio: String
        weight: Int
        birthday: String

        isFixed: Boolean
        isAvailable: Boolean!
        isHouseTrained: Boolean
        isVaccineCurent: Boolean

        sex: Sex
        coat: Coat
        diet: Diet
        color: Color
        goodWith: GoodWith
        personality: Personality

        images: [ImagesToPetProfiles]

        pet: Pet!
        petId: Int!
    }

    enum Sex {
        UNKNOWN
        FEMALE
        MALE
    }

    enum Color {
        UNKNOWN
        BLACK
        WHITE
        BROWN
        GOLDEN
        BRINDLE
    }

    enum Personality {
        UNKNOWN
        ACTIVE
        CURIOUS
        GOOFY
        HYPER
        LAZY
        LONER
    }

    enum Diet {
        STANDARD  
        MEDICAL
        WEIGHT
    }

    enum Coat { 
        UNKNOWN
        SHORT
        MEDIUM
        LONG
        NONE
    }

    enum GoodWith {
        UNKNOWN
        CATS
        DOGS
        CHILDREN
        CATS_AND_DOGS
        ALL
    }




    # ::: breed :::
    type Breed {
        id: ID!
       
        breed: String!
        species: Species!

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
