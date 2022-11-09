const { gql } =require("apollo-server-express");

module.exports.typeDefs = gql`
  type Query {
    hello: String!
    getAllannonces: [annonce!]!
    getAnnonce(id: String!): annonce!
  }

  type annonce {
    id: ID!
    titre: String!
    type: String!
    statusPublication: String!
    statusBien: String!
    prix: Int!
    dateDisponibilite: String!
    description: String!
    photos: String!
  }

  type comment {
    commenterId:String!
    commenterPseudo: String!
    text: String!
    timestamp: Int!
  }

  type Mutation {
    createAnnonce(
      titre: String!
      type: String!
      statusPublication: String!
      statusBien: String!
      prix: Int!
      dateDisponibilite: String!
      description: String!
      photos: String!
      ): annonce!
      deleteAnnonce(id: String!): String
      updateAnnonce(ID :String!
        titre: String!
        type: String!
        statusPublication: String!
        statusBien: String!
        prix: Int!
        dateDisponibilite: String!
        description: String!
        photos: String!
        ): annonce!
  }
`;
