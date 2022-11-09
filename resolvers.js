const { findByIdAndUpdate } = require("./models/annonce.model");
const model = require("./models/annonce.model");

module.exports.resolvers = {
  Query: {
    hello: () => {
      return "hi"
    },
    getAllannonces: async () =>  {
      return await model.find();
    },
    getAnnonce: async (_,{id}) =>  {
      return await model.findById(id);
    }
 
  },
  Mutation: {
    createAnnonce: async (_, 
      { 
        titre ,
        type,
        statusPublication,
        statusBien,
        prix,
        dateDisponibilite,
        description,
        photos
      }
) => {
      const annonce = new model({
         titre ,
         type,
         statusPublication,
         statusBien,
         prix,
         dateDisponibilite,
         description,
         photos,
        });
      await annonce.save();
      return annonce;
    },
    deleteAnnonce: async (_,{id}) =>  {
      await model.findByIdAndDelete(id);
      return "annonce id "+id+" a éte bien supprime";
    },
    updateAnnonce: async (_, 
      { 
        ID,
        titre ,
        type,
        statusPublication,
        statusBien,
        prix,
        dateDisponibilite,
        description,
        photos
      }
) => {
      const annonce = await model.findByIdAndUpdate(ID,{
         titre ,
         type,
         statusPublication,
         statusBien,
         prix,
         dateDisponibilite,
         description,
         photos,
        },{new:true});
      return annonce;
    }
  }
};
