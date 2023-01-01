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

        details: PetDetails
        agency: Agency!
    }

    type PetDetails {
        id: ID!
        createdAt: String
        updatedAt: String

        name: String!
        age: Int
        bio: String
        species: String
        breed: [BreedOnPetDetails]
        gender: String
        weight: Int
        
        color: [ColorOnPetDetails]!
        images: [ImageOnPetDetails]!
        favoritedBy: [FavoritesOnPets]!
        volunteers: [VolunteerOnPetDetails]!

        pet: Pet!
        petId: Int!
    }

    type PetImage {
        id: ID!
        createdAt: String
        updatedAt: String

        url: String
        file: String
        thumbnail: String

        pets: [ImageOnPetDetails]
    }

    type Breed {
        id: ID!
        createdAt: String
        updatedAt: String

        breed: String!
    }

    type Color {
        id: ID!
        createdAt: String
        updatedAt: String

        color: String!

        pets: [ColorOnPetDetails]
    }

    type BreedOnPetDetails {
        breed: Breed
        breedId: Int
        petDetails: PetDetails
        petDetailsId: Int
    }

    type ImageOnPetDetails {
        petImage: PetImage
        petImageId: Int
        petDetails: PetDetails
        petDetailsId: Int
    }

    type ColorOnPetDetails {
        color: Color
        colorId: Int
        petDetails: PetDetails
        getDetailsId: Int
    }

    type VolunteerOnPetDetails {
        volunteerProfile: VolunteerProfile
        volunteerProfileId: Int
        petDetails: PetDetails
        petDetailsId: Int
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
        favorites: [FavoritesOnPets]!

        user: User!
        userId: Int!
    }

    type FavoritesOnPets {
        userProfile: UserProfile
        userProfileId: Int
        pet: Pet
        petId: Int
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
        assignedPets: [VolunteerOnPetDetails]!

        volunteer: Volunteer!
        volunteerId: Int!
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
