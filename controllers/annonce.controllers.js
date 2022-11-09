const AnnoncetModel = require("../models/annonce.model");
const ObjectID = require("mongoose").Types.ObjectId;


module.exports.createannonce=( function(req, res) {
    res.render('annonce/creeAnnonce.twig', { user: req.user});
});

module.exports.createAnnonce = async (req, res) => {  
  console.log(req.body);
    const image = "images";
    const newAnnonce = new AnnoncetModel({
      // postId: req.session.passport.user,
      titre:req.body.title,
      type: req.body.typedebien,
      statusPublication: req.body.statusdepublication,
      statusBien: req.body.statusdebien,
      prix: req.body.prix,
      dateDisponibilite: req.body.date,
      description: req.body.description,
      // photos: req.file.path.substr(7),
      comments: [],
    });
    try {
      const post = newAnnonce.save();
      res.status(201).send();
  
    } catch (err) {
      return res.status(400).send(err);
    }
  };

  module.exports.readAnnonce = (req, res) => {
    AnnoncetModel.find((err, docs) => {
      if (!err) {
        res.send(docs);
      }
      else console.log("Error to get data : " + err);
    }).sort({ createdAt: -1 });
  };

  module.exports.commentAnnonce = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      return AnnoncetModel.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            comments: {
              commenterId: req.body.commenterId,
              commenterPseudo: req.body.commenterPseudo,
              text: req.body.text,
              timestamp: new Date().getTime(),
            },
          },
        },
        { new: true },
        (err, docs) => {
          if (!err) return res.redirect("/");
          else return res.status(400).send(err);
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  };

  module.exports.deleteAnnonce = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    AnnoncetModel.findByIdAndRemove(req.params.id, (err, docs) => {
      if (!err) res.status(200).send("ID delete : " + req.params.id);
      else console.log("Delete error : " + err);
    });
  };

  module.exports.update_Annonce = (req, res) => {
    const image = "images";
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    const updatedRecord = {
  
      // postId: req.session.passport.user,
      titre: req.body.titre,
      type: req.body.typedebien,
      statusPublication: req.body.statusdepublication,
      statusBien: req.body.statusdebien,
      prix: req.body.prix,
      dateDisponibilite: req.body.date,
      description: req.body.description,
      // photos: req.file.path.substr(7),

    };
  
    AnnoncetModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatedRecord },
      { new: true },
      (err, docs) => {
        if (!err)  res.status(201).send();
        else console.log("Update error : " + err);
      }
    );
  };

  module.exports.updateAnnonce = (req, res) => {
    AnnoncetModel.find((err, docs) => {
      if (!err) {
        for (let index = 0; index < docs.length; index++) {
          const element = docs[index].id;
          if (element === req.params.id) {
            console.log(element);
            res.render('annonce/updateAnnonce.twig', { annonce: docs[index], user: req.user });
  
          }
        }
      }
      else console.log("Error to get data : " + err);
    });
  };

  module.exports.commentannonce = (req, res) => {
    AnnoncetModel.find((err, docs) => {
      if (!err) {
        res.render('annonce/comment.twig', { annonces: docs, user: req.user, idAnnonce: req.params.id });
      }
      else console.log("Error to get data : " + err);
    });
  };

  module.exports.voirCommenter = (req, res) => {
    AnnoncetModel.find((err, docs) => {
      if (!err) {
        for (let index = 0; index < docs.length; index++) {
          const element = docs[index].id;
          if (element === req.params.id) {
            console.log(element);
            res.render('annonce/voirCommenter.twig', { comments: docs[index].comments, user: req.user });
          }
        }
      }
      else console.log("Error to get data : " + err);
    });
  };
  