const router = require('express').Router();
const annonceController = require('../controllers/annonce.controllers.js');
// const middleware = require('../middleware');
// const multer = require('../middleware/multer-config');



// router.post('/create',middleware.checkAuthenticated, multer, annonceController.createAnnonce);

// router.get('/create',middleware.checkAuthenticated,middleware.roles,annonceController.createannonce);

// router.get('/create',middleware.checkAuthenticated,middleware.roles, function(req, res) {
//     res.render('/annonce/creeAnnonce', { user: req.user});
// });

// router.get('/delete/:id',middleware.checkAuthenticated,middleware.roles, annonceController.deleteAnnonce);

// router.get('/comment-annonce/:id',middleware.checkAuthenticated, annonceController.commentannonce);

// router.post('/comment/:id',middleware.checkAuthenticated, annonceController.commentAnnonce);


// router.get('/update/:id',middleware.checkAuthenticated, middleware.roles, annonceController.updateAnnonce);
// router.post('/update-annonce/:id',middleware.checkAuthenticated,middleware.roles,multer, annonceController.update_Annonce);

// router.get('/voirCommenter/:id', annonceController.voirCommenter);






//***********************Swagger*********************************** */

/**
 * @swagger
 * components:
 *   schemas:
 *     Annonce:
 *       type: object
 *       required:
 *         - title
 *         - type
 *         - typedebien
 *         - statusBien
 *         - prix
 *         - dateDisponibilite
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           description: titre d'annonce
 *         type:
 *           type: string
 *           description: type d'annonce
 *         typedebien:
 *           type: string
 *           description: type de bien
 *         statusBien:
 *           type: string
 *           description: status de bien
 *         prix:
 *           type: Number
 *           description: prix d'annonce
 *         dateDisponibilite:
 *           type: String
 *           description: date Disponibilite d'annonce
 *         description:
 *           type: Number
 *           description: description d'annonce
 *       example:
 *         title: chambre etudiant
 *         typedebien: Vente
 *         statusdepublication: Publiée
 *         statusdebien: disponible
 *         prix: 400
 *         date: 31/12/2022
 *         description: chambre  d'etudiant moins cher ....
*/



 /**
  * @swagger
  * tags:
  *   name: annonce
  *   description: The Annonce managing API
  */

/**
 * @swagger
 * /annonces:
 *  get:
 *   summary: get all Annonce
 *   description: get all Annonce
 *   tags: [annonce]
 *   responses:
 *    200:
 *     description: success
 */
 router.get('/annonces', annonceController.readAnnonce);




/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new annonce
 *     tags: [annonce]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Annonce'
 *     responses:
 *       200:
 *         description: The annonce was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Annonce'
 *       500:
 *         description: Some server error
 */
 router.post('/create', annonceController.createAnnonce);

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Remove the annonce by id
 *     tags: [annonce]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The annonce id
 * 
 *     responses:
 *       200:
 *         description: The annonce was deleted
 *       404:
 *         description: The annonce was not found
 */

 router.delete('/delete/:id', annonceController.deleteAnnonce);

/**
 * @swagger
 * /update/{id}:
 *  put:
 *    summary: Update the annonce by the id
 *    tags: [annonce]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The annonce id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Annonce'
 *    responses:
 *      200:
 *        description: The annonce was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Annonce'
 *      404:
 *        description: The annonce was not found
 *      500:
 *        description: Some error happened
 */

 router.put('/update/:id', annonceController.update_Annonce);



module.exports = router;