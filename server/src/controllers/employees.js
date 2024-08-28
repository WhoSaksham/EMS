const CODES = require("../constants/statusCodes");
const MESSAGES = require("../constants/strings");
const Auth = require("../models/Auth");
const { handleError, generatePassword } = require("../helpers");
const { ROLES } = require("../constants");
const Department = require("../models/Department");

const notFound = res => res.status(CODES.NOT_FOUND).json({
    code: CODES.NOT_FOUND,
    message: MESSAGES.USER_NOT_FOUND,
    data: null,
    error: MESSAGES.USER_NOT_FOUND,
});

const getAll = async (req, res) => {
    const { page, limit, name, location } = req.query;

    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;

    const sortOptions = {};
    if (location) {
        sortOptions.location = location === 'desc' ? -1 : 1;
    }

    if (name) {
        sortOptions.name = name === 'desc' ? -1 : 1;
    }

    try {
        const totalCount = await Auth.countDocuments({ role: ROLES.EMPLOYEE });
        const employees = await Auth.find({ role: ROLES.EMPLOYEE })
            .sort(sortOptions)
            .skip(skip)
            .limit(pageSize)
            .select('-password');

        return res.status(CODES.OK).json({
            code: CODES.OK,
            message: MESSAGES.SUCCESS,
            data: {
                items: employees,
                total: totalCount,
                limit: pageSize,
                page: pageNumber,
            },
            error: null,
        });
    } catch (error) {
        return handleError(error, res);
    }
};

const get = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) return notFound(res);

        const employee = await Auth.findById(id).select('-password');
        if (!employee) return notFound(res);

        const department = await Department.findOne({ employee: id });
        let employeeDetails = employee.toObject();
        employeeDetails.assignedDepartment = department?.name || null;

        return res.status(CODES.OK).json({
            code: CODES.OK,
            message: MESSAGES.SUCCESS,
            data: employeeDetails,
            error: null,
        });
    } catch (error) {
        return handleError(error, res);
    }
}

const create = async (req, res) => {
    const { name, email, password, location } = req.body;

    try {
        if (name && email && password && location) {
            const employee = await Auth.findOne({ email });
            if (employee) return res.status(CODES.BAD_REQUEST).json({
                code: CODES.BAD_REQUEST,
                message: MESSAGES.EMAIL_ALREADY_TAKEN,
                data: null,
                error: MESSAGES.EMAIL_ALREADY_TAKEN,
            });

            const hashedPass = generatePassword(password);
            await Auth.create({ name, email, password: hashedPass, role: ROLES.EMPLOYEE, location });

            return res.status(CODES.CREATED).json({
                code: CODES.CREATED,
                message: MESSAGES.SUCCESS,
                data: null,
                error: null
            });
        } else {
            return res.status(CODES.BAD_REQUEST).json({
                code: CODES.BAD_REQUEST,
                message: MESSAGES.MANDATORY_FIELDS_REQUIRED,
                data: null,
                error: MESSAGES.MANDATORY_FIELDS_REQUIRED,
            });
        }
    } catch (error) {
        return handleError(error, res);
    }
}

const update = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, location } = req.body;

    try {
        const hashedPass = generatePassword(password);
        const updatedEmployee = await Auth.findByIdAndUpdate(id, { name, email, password: hashedPass, location }, { new: true });

        if (!updatedEmployee) return notFound(res);

        return res.status(CODES.OK).json({
            code: CODES.OK,
            message: MESSAGES.SUCCESS,
            data: null,
            error: null
        });
    } catch (error) {
        return handleError(error, res);
    }
}

const del = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEmployee = await Auth.findByIdAndDelete(id);

        if (!deletedEmployee) return notFound(res);

        return res.status(CODES.OK).json({
            code: CODES.OK,
            message: MESSAGES.SUCCESS,
            data: null,
            error: null
        });
    } catch (error) {
        return handleError(error, res);
    }
}

module.exports = { getAll, get, create, update, del };
