const { model, Schema } = require("mongoose");
const MESSAGES = require("../constants/strings");
const { ROLES } = require("../constants");

const authSchema = new Schema({
    name: {
        type: String,
        required: [true, MESSAGES.NAME_REQUIRED],
        minLength: [5, MESSAGES.MIN_LENGTH_REQUIRED()],
        maxLength: [50, MESSAGES.MAX_LENGTH_ALLOWED()],
    },
    email: {
        type: String,
        required: [true, MESSAGES.EMAIL_REQUIRED],
        unique: [true, MESSAGES.EMAIL_ALREADY_TAKEN],
        match: [
            /^(([A-Za-z0-9](?!.*\.{2})[A-Za-z0-9_\-\.]+[A-Za-z0-9])|([A-Za-z0-9]{1,60}))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/, // valid email format regex
            MESSAGES.INVALID_EMAIL_FORMAT,
        ],
    },
    password: {
        type: String,
        required: [true, MESSAGES.PASSWORD_REQUIRED],
    },
    role: {
        type: String,
        enum: [ROLES.MANAGER, ROLES.EMPLOYEE],
        default: ROLES.EMPLOYEE,
    },
    location: {
        type: String,
        minLength: [3, MESSAGES.MIN_LENGTH_REQUIRED('Location', 3)],
        maxLength: [50, MESSAGES.MAX_LENGTH_ALLOWED('Location', 3)],
        default: "India",
    }
}, {
    timestamps: true,
    versionKey: false,
});

const Auth = model('Auth', authSchema);
module.exports = Auth;
