var bcrypt = require('bcrypt');


module.exports = {
    async hashPassword(password) {
        var hashPwd = await bcrypt.hash(password, 10);
        return hashPwd;
    },

    async isMatch(password, hash) {
        var boo = await bcrypt.compare(password, hash);
        return boo;
    }
};