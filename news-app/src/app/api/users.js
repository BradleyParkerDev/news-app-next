const {register, login, getUser, updateUser, deleteUser, refreshAccessToken} = require('../../lib/controllers/users');
const {verifyUserToken}  = require('../../lib/server-utils/auth');
const router = express.Router();

//Routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh-access-token', refreshAccessToken)
router.get('/get-user',verifyUserToken,getUser);
router.put('/update-user',verifyUserToken,updateUser);
router.delete('/delete-user',verifyUserToken,deleteUser);

module.exports = router;