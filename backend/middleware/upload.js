const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../frontend/src/assets/img/data')
    },
    filename: (req, file, cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
        storage: storage,
        limits: { fileSize: '1000000' },
        fileFilter: (req, file, cb) => {
            const fileTypes = /jpeg|jpg|png|gif/
            const mimeType = fileTypes.test(file.mimetype)  
            const extname = fileTypes.test(path.extname(file.originalname))
      
            if(mimeType && extname) {
                return cb(null, true)
            }
            cb('Give proper files formate to upload')
        }
      }).single("gambar")

module.exports = upload;