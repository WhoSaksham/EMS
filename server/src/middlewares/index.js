
const { verify } = require("jsonwebtoken");
const CODES = require("../constants/statusCodes");
const MESSAGES = require("../constants/strings");
const { ROLES } = require("../constants");
const Auth = require("../models/Auth");

const errResponse = (res, isBadRequest) => res.status(isBadRequest ? CODES.BAD_REQUEST : CODES.UNAUTHORIZED).json({
    code: isBadRequest ? CODES.BAD_REQUEST : CODES.UNAUTHORIZED,
    message: MESSAGES.UNAUTHORIZED,
    data: null,
    error: MESSAGES.UNAUTHORIZED,
});

const authorize = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(" ")[1];

    if (!authHeader || !authHeader?.startsWith('Bearer') || !token) return errResponse(res);

    verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
        if (err) return errResponse(res);

        req.user = data.user;
        next();
    });
}

const isNotEmployee = (req, res, next) => {
    if (req.user.role === ROLES.EMPLOYEE) return errResponse(res, true);

    next();
}

const canAccessEmployeeDetails = async (req, res, next) => {
    const employee = await Auth.findOne({ email: req.user.email });

    if ((employee.id === req.params.id) || req.user.role === ROLES.MANAGER) {
        next();
    } else {
        return errResponse(res, true);
    }
}

module.exports = { authorize, isNotEmployee, canAccessEmployeeDetails };
