const { ROLES } = require("../constants");
const CODES = require("../constants/statusCodes");
const MESSAGES = require("../constants/strings");
const { comparePassword, generateToken, generatePassword, handleError } = require("../helpers");
const Auth = require("../models/Auth");

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (email && password) {
            const user = await Auth.findOne({ email });
            if (!user) {
                return res.status(CODES.NOT_FOUND).json({
                    code: CODES.NOT_FOUND,
                    message: MESSAGES.USER_NOT_FOUND,
                    data: null,
                    error: MESSAGES.USER_NOT_FOUND,
                });
            }

            const isValidPass = comparePassword(password, user.password);
            if (!isValidPass) {
                return res.status(CODES.BAD_REQUEST).json({
                    code: CODES.BAD_REQUEST,
                    message: MESSAGES.EMAIL_PASS_INVALID,
                    data: null,
                    error: MESSAGES.EMAIL_PASS_INVALID,
                });
            }

            const token = generateToken({ user: { email: email, role: user.role } });
            const { password: _, ...userWithoutPassword } = user.toObject();
            return res.status(CODES.OK).json({
                code: CODES.OK,
                message: MESSAGES.LOGIN_SUCCESS,
                data: { ...userWithoutPassword, token },
                error: null
            });
        } else {
            return res.status(CODES.BAD_REQUEST).json({
                code: CODES.BAD_REQUEST,
                message: MESSAGES.EMAIL_PASSWORD_REQUIRED,
                data: null,
                error: MESSAGES.EMAIL_PASSWORD_REQUIRED
            });
        }
    } catch (err) {
        return handleError(err, res);
    }
}

const signup = async (req, res) => {
    const { name, email, password, role, location } = req.body;

    try {
        if (name && email && password && location) {
            const user = await Auth.findOne({ email });
            if (user) {
                return res.status(CODES.BAD_REQUEST).json({
                    code: CODES.BAD_REQUEST,
                    message: MESSAGES.EMAIL_ALREADY_TAKEN,
                    data: null,
                    error: MESSAGES.EMAIL_ALREADY_TAKEN
                });
            }

            const hashedPass = generatePassword(password);
            const token = generateToken({ user: { email: email, role: role || ROLES.EMPLOYEE } });

            const newUser = await Auth.create({ name, email, password: hashedPass, role: role || ROLES.EMPLOYEE, location });
            const { password: _, ...userWithoutPassword } = newUser.toObject();

            return res.status(CODES.CREATED).json({
                code: CODES.CREATED,
                message: MESSAGES.SIGNUP_SUCCESS,
                data: { ...userWithoutPassword, token },
                error: null
            });
        } else {
            return res.status(CODES.BAD_REQUEST).json({
                code: CODES.BAD_REQUEST,
                message: MESSAGES.MANDATORY_FIELDS_REQUIRED,
                data: null,
                error: MESSAGES.MANDATORY_FIELDS_REQUIRED
            });
        }
    } catch (err) {
        return handleError(err, res);
    }
}

module.exports = { login, signup };
