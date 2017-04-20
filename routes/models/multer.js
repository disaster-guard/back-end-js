var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images');
    },
    filename: function (req, file, cb) {
        var ext = file.originalname;
        var extStr = "";
        if (ext.match(".jpg$")) {
            extStr = ".jpg"
        } else if (ext.match(".png$")) {
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
