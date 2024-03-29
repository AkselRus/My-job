const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const tokenService = require("../services/token.service");
const { generateUserData } = require("../utils/helper");
const router = express.Router({ mergeParams: true });

// const signUpValidation = [
//     check("email", "Некоректный email").isEmail(),
//     check("password", "Минимальная длина пароля 8 символов").isLength({
//         min: 8,
//     }),
// ];

router.post("/signUp", [
    check("email", "Некоректный email").isEmail(),
    check("password", "Минимальная длина пароля 8 символов").isLength({
        min: 8,
    }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        code: 400,
                        errors: errors.array(),
                    },
                });
            }
            const { email, password } = req.body;

            const exitingUser = await User.findOne({ email: email });
            if (exitingUser) {
                return res.status(400).json({
                    error: {
                        message: "EMAIL_EXISTS",
                        code: 400,
                    },
                });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = User.create({
                ...generateUserData(),
                ...req.body,
                password: hashedPassword,
            });

            const tokens = tokenService.generate({ _id: newUser._id });
            await tokenService.save(newUser._id, tokens.refreshToken);

            res.status(201).send({ ...tokens, userId: newUser._id });
        } catch (error) {
            res.status(500).json({
                massage: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    },
]);

router.post("/signInWithPassword", [
    check("email", "Email введен некорректно").normalizeEmail().isEmail(),
    check("password", "Неправильный пароль").exists(),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        cose: 400,
                    },
                });
            }

            const { email, password } = req.body;
            const existingUser = await User.findOne({ email });

            if (!existingUser) {
                return res.status(400).send({
                    error: {
                        message: "EMAIL_NOT_FOUND",
                        cose: 400,
                    },
                });
            }

            const isPasswordEqual = bcrypt.compare(
                password,
                existingUser.password
            );
            if (!isPasswordEqual) {
                return res.status(400).send({
                    error: {
                        message: "INVALID_PASSWORD",
                        cose: 400,
                    },
                });
            }
            const tokens = tokenService.generate({ _id: existingUser._id });
            await tokenService.save(existingUser._id, tokens.refreshToken);

            res.status(200).send({ ...tokens, userId: existingUser._id });
        } catch (error) {
            res.status(500).json({
                massage: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    },
]);

function isTokenInvalid(data, dbToken) {
    return !data || !dbToken || data._id !== dbToken?.user?.toString();
}

router.post("/token", async (req, res) => {
    try {
        const { refresh_token: refreshToken } = req.body;

        const data = tokenService.validateRefresh(refreshToken);
        console.log("data", data);
        const dbToken = tokenService.findToken(refreshToken);

        if (isTokenInvalid(data, dbToken)) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const tokens = tokenService.generate({ _id: data._id });
        await tokenService.save(data._id, tokens.refreshToken);

        res.status(200).send({ ...tokens, userId: data._id });
    } catch (error) {
        res.status(500).json({
            massage: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

module.exports = router;
