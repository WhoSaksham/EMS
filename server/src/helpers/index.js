const { compareSync, hashSync } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const CODES = require("../constants/statusCodes");
const MESSAGES = require("../constants/strings");

const comparePassword = (stringPass, hashedPass) => compareSync(stringPass, hashedPass);

const generatePassword = pass => hashSync(pass, 10);

const generateToken = data => sign(data, process.env.JWT_SECRET_KEY);

const generateSlug = str => str
    ?.toLowerCase()
    ?.trim()
    ?.replace(/[\s\W-]+/g, '-')
    ?.replace(/^-+|-+$/g, '');

const handleError = (err, res) => {
    console.log("Error Occured:", err);

    if (err.name === 'ValidationError' && err.errors) {
        const error = Object.values(err.errors)[0]?.message;
        return res.status(CODES.BAD_REQUEST).json({
            code: CODES.BAD_REQUEST,
            message: error,
            data: null,
            error,
        });
    }

    if (err.name === 'CastError') {
        return res.status(CODES.BAD_REQUEST).json({
            code: CODES.BAD_REQUEST,
            message: `Invalid ID format: ${err.value}`,
            data: null,
            error: `Invalid ID format: ${err.value}`,
        });
    }

    return res.status(CODES.INTERNAL_SERVER_ERROR).json({
        code: CODES.INTERNAL_SERVER_ERROR,
        message: MESSAGES.SOMETHING_WENT_WRONG,
        data: null,
        error: MESSAGES.SOMETHING_WENT_WRONG,
    });
}

module.exports = { comparePassword, generatePassword, generateToken, handleError, generateSlug };
