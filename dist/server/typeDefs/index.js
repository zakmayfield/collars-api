"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql
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
        pets: [Pet]!
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

        color: [ColorsToPetProfiles]!
        images: [ImagesToPetProfiles]!
        medical: Medical

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

        pets: [ImagesToPetProfiles]
    }

    type ImagesToPetProfiles {
        image: Image!
        imageId: Int!
        petProfile: PetProfile!
        petProfileId: Int!
    }




    # ::: medical :::
    type Medical {
        id: ID!
        createdAt: String
        updatedAt: String

        allergies: [AllergiesToMedicals]!
        vaccines: [VaccinesToMedicals]!
        medication: [MedicationsToMedicals]!

        petProfile: PetProfile!

        petProfileId: Int!
    }




    # ::: allergy :::
    type Allergy {
        id: ID!
        name: String

        medicals: [AllergiesToMedicals]
    }

    type AllergiesToMedicals {
        allergy: Allergy!
        allergyId: Int!
        medical: Medical!
        medicalId: Int!
    }




    # ::: Vaccine :::
    type Vaccine {
        id: ID!
        name: String

        medicals: [VaccinesToMedicals]
    }

    type VaccinesToMedicals {
        vaccine: Vaccine!
        vaccineId: Int!
        medical: Medical!
        medicalId: Int!
    }




    # ::: medication :::
    type Medication {
        id: ID!
        name: String

        medicals: [MedicationsToMedicals]
    }

    type MedicationsToMedicals {
        medication: Vaccine!
        medicationId: Int!
        medical: Medical!
        medicalId: Int!
    }
`;
