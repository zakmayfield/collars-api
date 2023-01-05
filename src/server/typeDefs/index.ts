export const typeDefs = `#graphql
    type Query {
        test: String!
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

        email: String!
        password: String!
        token: String

        profile: AgencyProfile
        # pets: [Pet]!
        volunteers: [User]!
    }

    type AgencyProfile {
        id: ID!
        createdAt: String
        updatedAt: String

        username: String!
        bio: String
        

        contact: Contact
        address: Address

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
        species: String!
        breed: [BreedsToPets]!
        savedBy: [UsersToPets]!

        agency: Agency!
        profile: PetProfile
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
        isHouseTrained: Boolean
        isAvailable: Boolean!
        
        colors: [ColorsToPetProfiles]!
        images: [ImagesToPetProfiles]!

        pet: Pet!
        petId: Int!
    }




    # ::: color :::
    type Color {
        id: ID!
        createdAt: String
        updatedAt: String

        color: String

        pets: [ColorsToPetProfiles]
    }

    type ColorsToPetProfiles {
        color: Color!
        colorId: Int!
        petProfile: PetProfile!
        petProfileId: Int!
    }





    # ::: breed :::
    type Breed {
        id: ID!
        createdAt: String
        updatedAt: String
       

        breed: String

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
    }

    type ImagesToPetProfiles {
        image: Image!
        imageId: Int!
        petProfile: PetProfile!
        petProfileId: Int!
    }


    # -----------------------------
    # # ::: pet :::
    # type Pet {
    #     id: ID!
    #     createdAt: String
    #     updatedAt: String

    #     agency: Agency!
    #     profile: PetProfile
    # }

    # type PetProfile {
    #     id: ID!
    #     createdAt: String
    #     updatedAt: String

    #     name: String!
    #     age: Int
    #     bio: String
    #     species: String
    #     breed: [BreedToPetProfile]
    #     sex: String
    #     weight: Int
    #     birthday: String
    #     coat: String
    #     behavior: Behavior
    #     isHouseTrained: Boolean
    #     isAvailable: Boolean!
        
    #     color: [ColorToPetProfile]!
    #     images: [PetImageToPetProfile]!
    #     favoritedBy: [UserProfileToPetProfile]!
    #     volunteers: [VolunteerProfileToPetProfile]!

    #     pet: Pet!
    #     petId: Int!
    # }

    # type Behavior {
    #     id: ID!
    #     createdAt: String
    #     updatedAt: String

    #     goodWith: String
    #     avoid: String
    #     personalityType: String

    #     petProfile: PetProfile!
    #     petProfileId: Int!
    # }

    # type PetImage {
    #     id: ID!
    #     createdAt: String
    #     updatedAt: String

    #     url: String
    #     file: String
    #     thumbnail: String

    #     pets: [PetImageToPetProfile]
    # }

    # type PetImageToPetProfile {
    #     petImage: PetImage!
    #     petImageId: Int!
    #     petProfile: PetProfile!
    #     petProfileId: Int!
    # }

    # type Breed {
    #     id: ID!
    #     createdAt: String
    #     updatedAt: String

    #     name: String!

    #     pets: [BreedToPetProfile]
    # }

    # type BreedToPetProfile {
    #     breed: Breed!
    #     breedId: Int!
    #     petProfile: PetProfile!
    #     petProfileId: Int!
    # }

    # type Color {
    #     id: ID!
    #     createdAt: String
    #     updatedAt: String

    #     color: String!

    #     pets: [ColorToPetProfile]
    # }

    # type ColorToPetProfile {
    #     color: Color!
    #     colorId: Int!
    #     petProfile: PetProfile!
    #     petProfileId: Int!
    # }




    # # ::: user :::
    # type User {
    #     id: ID!
    #     createdAt: String
    #     updatedAt: String

    #     username: String! 
    #     email: String!
    #     password: String!
    #     token: String

    #     profile: UserProfile
    # }

    # type UserProfile {
    #     id: ID!
    #     createdAt: String
    #     updatedAt: String

    #     firstName: String
    #     lastName: String
    #     bio: String
    #     favorites: [UserProfileToPetProfile]!

    #     user: User!
    #     userId: Int!
    # }

    # # favorites
    # type UserProfileToPetProfile {
    #     userProfile: UserProfile!
    #     userProfileId: Int!
    #     petProfile: PetProfile!
    #     petProfileId: Int!
    # }




    # # ::: volunteer :::
    # type Volunteer {
    #     id: ID!
    #     createdAt: String
    #     updatedAt: String

    #     email: String!
    #     password: String!
    #     token: String

    #     profile: VolunteerProfile

    #     agency: Agency
    #     agencyId: Int
    # }

    # type VolunteerProfile {
    #     id: ID!
    #     createdAt: String
    #     updatedAt: String

    #     firstName: String
    #     lastName: String
    #     bio: String

    #     contact: Contact
    #     contactId: Int

    #     address: Address
    #     addressId: Int

    #     assignedPets: [VolunteerProfileToPetProfile]!

    #     volunteer: Volunteer!
    #     volunteerId: Int!
    # }

    # type VolunteerProfileToPetProfile {
    #     volunteerProfile: VolunteerProfile
    #     volunteerProfileId: Int
    #     petProfile: PetProfile
    #     petProfileId: Int
    # }
`;
