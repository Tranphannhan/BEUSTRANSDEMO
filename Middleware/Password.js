
const bcrypt = require('bcrypt');

class encryptionPaswoord {
    // Mã hóa mật khẩu
    hashPassword = async (plainPassword) => {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        return hashedPassword;
    };
}

module.exports = encryptionPaswoord;