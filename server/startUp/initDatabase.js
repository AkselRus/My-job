const professionMock = require("../mock/professions.json");
const qualitiMock = require("../mock/qualities.json");

const Profession = require("../models/Profession");
const Quality = require("../models/Quality");

module.exports = async () => {
    const professions = await Profession.find();
    if (professions.length !== professionMock.length) {
        await createInitialEntity(Profession, professionMock);
    }

    const qualities = await Quality.find();
    if (qualities.length !== qualitiMock.length) {
        await createInitialEntity(Quality, qualitiMock);
    }
};

async function createInitialEntity(Model, data) {
    await Model.collection.drop();
    return Promise.all(
        data.map(async (item) => {
            try {
                delete item._id;
                const newItem = new Model(item);
                await newItem.save();
                return newItem;
            } catch (error) {
                return error;
            }
        })
    );
}
