const CODES = require("../constants/statusCodes");
const MESSAGES = require("../constants/strings");
const Department = require("../models/Department");
const Auth = require("../models/Auth");
const { generateSlug, handleError } = require("../helpers");

const notFound = res => res.status(CODES.NOT_FOUND).json({
    code: CODES.NOT_FOUND,
    message: MESSAGES.DEPARTMENT_NOT_FOUND,
    data: null,
    error: MESSAGES.DEPARTMENT_NOT_FOUND,
});

const getAll = async (req, res) => {
    const { page, limit } = req.query;

    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;

    try {
        const totalCount = await Department.countDocuments({});
        const departments = await Department.find({}).skip(skip).limit(pageSize);
        return res.status(CODES.OK).json({
            code: CODES.OK,
            message: MESSAGES.SUCCESS,
            data: {
                items: departments,
                total: totalCount,
                limit: pageSize,
                page: pageNumber,
            },
            error: null,
        });
    } catch (error) {
        return handleError(error, res);
    }
}

const get = async (req, res) => {
    const { slug } = req.params;

    try {
        if (!slug) return notFound(res);

        const department = await Department.findOne({ slug });
        if (!department) return notFound(res);

        const employee = await Auth.findById(department.employee);
        let dept = department.toObject();
        dept.assignedEmployee = employee.name;

        return res.status(CODES.OK).json({
            code: CODES.OK,
            message: MESSAGES.SUCCESS,
            data: dept,
            error: null,
        });
    } catch (error) {
        return handleError(error, res);
    }
}

const create = async (req, res) => {
    const { name, desc = '' } = req.body;

    try {
        if (!name) {
            return res.status(CODES.BAD_REQUEST).json({
                code: CODES.BAD_REQUEST,
                message: MESSAGES.DEPARTMENT_NAME_REQUIRED,
                data: null,
                error: MESSAGES.DEPARTMENT_NAME_REQUIRED,
            });
        }

        const slug = generateSlug(name);
        const department = await Department.findOne({ slug });
        if (department) return res.status(CODES.BAD_REQUEST).json({
            code: CODES.BAD_REQUEST,
            message: MESSAGES.DEPARTMENT_EXISTS,
            data: null,
            error: MESSAGES.DEPARTMENT_EXISTS,
        });

        const newDepartment = await Department.create({ name, desc, slug });
        return res.status(CODES.OK).json({
            code: CODES.OK,
            message: MESSAGES.SUCCESS,
            data: newDepartment,
            error: null,
        });
    } catch (error) {
        return handleError(error, res);
    }
}

const update = async (req, res) => {
    const { slug } = req.params;

    try {
        if (!slug) return notFound(res);

        const { name, desc } = req.body;
        const newSlug = generateSlug(name);
        const newDepartment = await Department.findOneAndUpdate({ slug }, { name, desc, slug: newSlug }, { new: true });
        if (!newDepartment) return notFound(res);

        return res.status(CODES.OK).json({
            code: CODES.OK,
            message: MESSAGES.SUCCESS,
            data: newDepartment.toObject(),
            error: null,
        });
    } catch (error) {
        return handleError(error, res);
    }
}

const del = async (req, res) => {
    const { slug } = req.params;

    try {
        if (!slug) return notFound(res);

        const { name, desc } = req.body;
        const newSlug = generateSlug(name);
        const deletedDepartment = await Department.findOneAndDelete({ slug }, { name, desc, slug: newSlug });
        if (!deletedDepartment) return notFound(res);

        return res.status(CODES.OK).json({
            code: CODES.OK,
            message: MESSAGES.SUCCESS,
            data: null,
            error: null,
        });
    } catch (error) {
        return handleError(error, res);
    }
}

const assign = async (req, res) => {
    const { employeeID, departmentID } = req.body;

    try {
        if (employeeID && departmentID) {

            const updatedDepartment = await Department.findByIdAndUpdate(departmentID, { employee: employeeID }, { new: true });
            console.log("here> id", updatedDepartment);

            if (!updatedDepartment) return notFound(res);

            return res.status(CODES.OK).json({
                code: CODES.OK,
                message: MESSAGES.SUCCESS,
                data: null,
                error: null,
            });
        } else {
            return notFound(res);
        }
    } catch (error) {
        return handleError(error, res);
    }
}

module.exports = { getAll, get, create, update, del, assign };
