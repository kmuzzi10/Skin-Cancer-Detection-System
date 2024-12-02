import path from "path";
import multer from "multer";

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
});

export var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        // Check if file type is image/jpeg or image/png
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            callback(null, true);
        } else {
            console.log("Only JPEG and PNG files are supported");
            callback(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 1024 // 1 GB limit
    }
});
