const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const User = require("../db/models/user")(db, Sequelize);
const Image = require("../db/models/image")(db, Sequelize);
// imports, used for queries later 

//getCollectionImages();
//.forEach(img => res.json(img))
const addImageToCollection = (req, res) => {
    const { email, images } = req.body;

    User.findOne({ where: { email: email} })
    .then(user => {
        if (!user) {
            return res.status(422).json({error: 'The specified user does not exist'});
        } else {
            //remove the credit due to the addition of an image to the users collection.
           user.credits -= Number(credits)
           // adds the added image to the collection
           await User.addCollectionImages(images)
           // save the current status of the User.
           await user.save();
           res.status(200).json({
               // success message below
            Message: "Image successfully added to your collection, and one credit removed.", // 
            credits: user.credits // credits are set to the number of credits owned by the user.
          })

        }
    }).catch(err => console.log(err))
}

// Export addImageToCollection controller
module.exports = {
    addImageToCollection
};