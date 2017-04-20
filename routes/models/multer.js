var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images');
    },
    filename: function (req, file, cb) {
        var ext = file.mimetype;
        var extStr = "";
        if (ext === 'image/jpeg') {
            extStr = ".jpg"
        } else if (ext === "image/png") {
            extStr = ".png"
        }
        cb(null, file.fieldname + '-' + Date.now() + extStr);
    },
    limits: {
        fileSize: 5242880 // Max upload size of 5MB
    }
});

var upload = multer({ storage: storage });

module.exports = upload;
