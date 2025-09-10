const multer = require("multer");
const path = require("path");

// Add New
const updateImage =  multer.diskStorage ({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/images"));
    },
    
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const updateIMG = multer({ storage : updateImage });




// Check Size
const chekSize = async (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    return new Promise ((resolve, reject) => {
        if (!file || !file.size) return resolve (false);
        if (file.size > maxSize) return resolve (false);
        return resolve (true )
    });
}



module.exports = {
    updateIMG , chekSize
}