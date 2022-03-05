const firestore = require("../utils/firestore");
const artsModel = firestore.collection("arts");

/**
 * Adds Art
 *
 * @param artData { Object }: art data object to be stored in DB
 */
const addArt = async (artData, userId) => {
  try {
    const artId = await artsModel.add(artData, userId);
    return artId.id;
  } catch (err) {
    logger.error("Error in creating art", err);
    throw err;
  }
};

/**
 * Updates Art
 *
 * @param artData { Object }: art data object to be stored in DB
 */
const updateArt = async (artData, userId) => {
  try {
    await artsModel.update(artData, userId);
  } catch (err) {
    logger.error("Error updating art", err);
    throw err;
  }
};

/**
 * Fetch all arts
 *
 * @return {Promise<arts|Array>}
 */
const fetchArts = async () => {
  try {
    const artSnapshot = await artsModel.get();
    const arts = [];
    artSnapshot.forEach((art) => {
      arts.push({
        id: art.id,
        ...art.data(),
      });
    });
    return arts;
  } catch (err) {
    logger.error("error getting arts", err);
    throw err;
  }
};

/**
 * Fetches the user arts
 * @return {Promise<userArts|object>}
 */
const fetchUserArts = async (id) => {
  try {
    let userArtsRef = "";

    userArtsRef = await artsModel.where("userId", "==", id).get();
    const userArts = [];
    userArtsRef.forEach((art) => {
      userArts.push({
        id: art.id,
        ...art.data(),
      });
    });

    return userArts;
  } catch (err) {
    logger.error("Error retrieving user arts", err);
    throw err;
  }
};

module.exports = {
  addArt,
  updateArt,
  fetchArts,
  fetchUserArts,
};
