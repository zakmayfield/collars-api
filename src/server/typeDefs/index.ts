export const typeDefs = `#graphql
    type Query {
        test: String!
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
        pets: [Pet]!
        volunteers: [Volunteer]!
    }

    type AgencyProfile {
        id: ID!
        createdAt: String
        updatedAt: String

        username: String
        bio: String
        address: AgencyAddress
        contact: AgencyContact

        agency: Agency!
        agencyId: Int!
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

        agencyProfile: AgencyProfile!
        agencyProfileId: Int!
    }

    type AgencyContact {
        id: ID!
        createdAt: String
        updatedAt: String

        phone: String
        email: String
        fax: String

        agencyProfile: AgencyProfile!
        agencyProfileId: Int!
    }




    # ::: pet :::
    type Pet {
        id: ID!
        createdAt: String
        updatedAt: String

        profile: PetProfile
        agency: Agency!
    }

    type PetProfile {
        id: ID!
        createdAt: String
        updatedAt: String

        name: String!
        age: Int
        bio: String
        species: String
        breed: [BreedToPetProfile]
        sex: String
        weight: Int
        birthday: String
        coat: String
        behavior: Behavior
        isHouseTrained: Boolean
        isAvailable: Boolean!
        
        color: [ColorToPetProfile]!
        images: [PetImageToPetProfile]!
        favoritedBy: [UserProfileToPetProfile]!
        volunteers: [VolunteerProfileToPetProfile]!

        pet: Pet!
        petId: Int!
    }

    type Behavior {
        id: ID!
        createdAt: String
        updatedAt: String

        goodWith: String
        avoid: String
        personalityType: String

        petProfile: PetProfile!
        petProfileId: Int!
    }

    type PetImage {
        id: ID!
        createdAt: String
        updatedAt: String

        url: String
        file: String
        thumbnail: String

        pets: [PetImageToPetProfile]
    }

    type PetImageToPetProfile {
        petImage: PetImage
        petImageId: Int
        petProfile: PetProfile
        petProfileId: Int
    }

    type Breed {
        id: ID!
        createdAt: String
        updatedAt: String

        name: String!

        pets: [BreedToPetProfile]
    }

    type BreedToPetProfile {
        breed: Breed
        breedId: Int
        petProfile: PetProfile
        petProfileId: Int
    }

    type Color {
        id: ID!
        createdAt: String
        updatedAt: String

        color: String!

        pets: [ColorToPetProfile]
    }

    type ColorToPetProfile {
        color: Color
        colorId: Int
        petProfile: PetProfile
        petProfileId: Int
    }




    # ::: user :::
    type User {
        id: ID!
        createdAt: String
        updatedAt: String

        username: String! 
        email: String!
        password: String!
        token: String

        profile: UserProfile
    }

    type UserProfile {
        id: ID!
        createdAt: String
        updatedAt: String

        firstName: String
        lastName: String
        bio: String
        favorites: [UserProfileToPetProfile]!

        user: User!
        userId: Int!
    }

    # favorites
    type UserProfileToPetProfile {
        userProfile: UserProfile
        userProfileId: Int
        petProfile: PetProfile
        petProfileId: Int
    }




    # ::: volunteer :::
    type Volunteer {
        id: ID!
        createdAt: String
        updatedAt: String

        email: String!
        password: String!
        token: String

        profile: VolunteerProfile

        agency: Agency
        agencyId: Int
    }

    type VolunteerProfile {
        id: ID!
        createdAt: String
        updatedAt: String

        firstName: String
        lastName: String
        bio: String
        phone: String

        address: VolunteerAddress
        assignedPets: [VolunteerProfileToPetProfile]!

        volunteer: Volunteer!
        volunteerId: Int!
    }

    type VolunteerProfileToPetProfile {
        volunteerProfile: VolunteerProfile
        volunteerProfileId: Int
        petProfile: PetProfile
        petProfileId: Int
    }
    
    type VolunteerAddress {
        id: ID!
        createdAt: String
        updatedAt: String

        address: String!
        apartment: String
        city: String!
        state: String!
        zip: Int!
        country: String!

        volunteerProfile: VolunteerProfile!
        volunteerProfileId: Int!
    }

    
`;
