const express = require("express");
const Quality = require("../models/Quality");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
    try {
        const list = await Quality.find();
        console.log(list);
        res.status(200).send(list);
    } catch (error) {
        res.status(500).json({
            massage: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

module.exports = router;
