export const typeDefs = /* GraphQL */ `
  type Query {
    getUser: User!
  }

  type Mutation {
    signUp(name: String!, email: String!, password: String!, type: String!): AuthPayload
  }

  type AuthPayload {
    user: AuthUser
    token: String
  }

  type AuthUser {
    id: ID!
    name: String!
    email: String!
    type: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    type: String!
    # profile: UserProfile
    # pets: Pet[]
    # savedPets: UsersToPets[]
    # volunteers: Volunteer[]
  }

  # enum AccountType {
  #   DEFAULT
  #   VOLUNTEER
  #   AGENCY
  # }

#   type Volunteer {
#     id: ID!
#     name: String!
#     email: String!
#     address: Address

#     agency: User
#   }

#   type UsersToPets {
#     user: User
#     pet: Pet
#   }

#   type Pet {
#     id: ID!
#     name: String!
#     species: String!
#     breed: BreedsToPets[]
#     savedBy: UsersToPets[]
#     profile: PetProfile
#     agency: User
#   }

#   # enum Species {
#   #   CAT 
#   #   DOG
#   #   BIRD
#   #   HORSE
#   #   FISH
#   #   REPTILE
#   #   BARNYARD
#   # }

#   type BreedsToPets {
#     breed: Breed
#     pet: Pet
#   }

#   type PetProfile {
#     id: ID!
#     age: Int
#     bio: String
#     weight: Int
#     birthday: String
#     isFixed: Boolean
#     isAdopted: Boolean!
#     isAvailable: Boolean!
#     isHouseTrained: Boolean
#     isVaccineCurrent: Boolean

#     sex: String
#     coat: String 
#     diet: String
#     color: String
#     goodWith: String
#     personality: String

#     images: ImagesToPetProfiles[]
#     pet: Pet
#   }

#   type ImagesToPetProfiles {
#     image: Image
#     petProfile: PetProfile
#   }

#   type Image {
#     id: ID!
#     url: String
#     file: String
#     thumbnail: String

#     pets: ImagesToPetProfiles[]
#   }

#   # enum Sex {
#   #   UNKNOWN
#   #   FEMALE
#   #   MALE
#   # }

#   # enum Color {
#   #   UNKNOWN
#   #   BLACK
#   #   WHITE
#   #   BROWN
#   #   GOLDEN
#   #   SPOTTED
#   #   BRINDLE
#   # }

#   # enum Personality {
#   #   UNKNOWN
#   #   ACTIVE
#   #   CURIOUS
#   #   GOOFY
#   #   HYPER
#   #   LAZY
#   #   LONER
#   # }

#   # enum Diet {
#   #   STANDARD
#   #   MEDICAL
#   #   WEIGHT
#   # }

#   # enum Coat {
#   #   UNKNOWN
#   #   SHORT
#   #   MEDIUM
#   #   LONG
#   #   NONE
#   # }

#   # enum GoodWith {
#   #   UNKNOWN
#   #   CATS
#   #   DOGS
#   #   CHILDREN
#   #   CATS_AND_DOGS
#   #   ALL
#   # }
`;
