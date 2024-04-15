module.exports = {
    // authentication
    login: require('./authentication/login'),
    refreshAccessToken: require('./authentication/refreshAccessToken'),
    register: require('./authentication/register'),

    // data
    deleteUser: require('./data/deleteUser'),
    getUser: require('./data/getUser'),
    updateUser: require('./data/updateUser')
}