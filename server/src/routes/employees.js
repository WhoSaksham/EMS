const router = require("express").Router();
const { getAll, get, create, update, del } = require("../controllers/employees");
const { authorize, isNotEmployee, canAccessEmployeeDetails } = require("../middlewares");

router.get('/', authorize, getAll);
router.get('/:id', authorize, canAccessEmployeeDetails, get);
router.post('/', authorize, create);
router.patch('/:id', authorize, isNotEmployee, update);
router.delete('/:id', authorize, isNotEmployee, del);

module.exports = router;
