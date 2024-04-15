// Exports all auth utility functions

module.exports = {
    // hashing
    generatePasswordHash: require('./hashing/generatePasswordHash'),

    // middleware
    verifyUserToken: require('./middleware/verifyUserToken'),

    // tokens
    checkUserRefreshTokens: require('./tokens/checkUserRefreshTokens'),
    generateUserTokens: require('./tokens/generateUserTokens'),
    getTokenExpiration: require('./tokens/getTokenExpiration'),
    verifyRefreshToken: require('./tokens/verifyRefreshToken'),


    // validation
    validatePassword: require('./validation/validatePassword'),
};
