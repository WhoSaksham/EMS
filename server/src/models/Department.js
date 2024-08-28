const { model, Schema } = require("mongoose");
const MESSAGES = require("../constants/strings");

const departmentSchema = new Schema({
    name: {
        type: String,
        required: [true, MESSAGES.NAME_REQUIRED],
        minLength: [5, MESSAGES.MIN_LENGTH_REQUIRED()],
        maxLength: [50, MESSAGES.MAX_LENGTH_ALLOWED()],
    },
    desc: {
        type: String,
        maxLength: [50, MESSAGES.MAX_LENGTH_ALLOWED()],
    },
    slug: String,
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        default: null,
    }
}, {
    timestamps: true,
    versionKey: false,
});

const Department = model('Department', departmentSchema);
module.exports = Department;
