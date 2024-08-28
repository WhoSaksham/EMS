const router = require("express").Router();
const { getAll, get, create, assign, update, del } = require("../controllers/department");
const { authorize, isNotEmployee } = require("../middlewares");

router.get('/', authorize, isNotEmployee, getAll);
router.get('/:slug', authorize, isNotEmployee, get);
router.post('/', authorize, isNotEmployee, create);
router.patch('/assign', authorize, isNotEmployee, assign);
router.patch('/:slug', authorize, isNotEmployee, update);
router.delete('/:slug', authorize, isNotEmployee, del);

module.exports = router;
