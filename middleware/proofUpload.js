const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/proofs/' + req.session.user.roll_no))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "." + file.originalname.split(".").pop())
  }
});

const multi_upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "application/pdf" || file.mimetype == "application/msword" || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error('Only .pdf, .doc and .docx format allowed!')
      err.name = 'ExtensionError'
      return cb(err);
    }
  },
}).array('proofs')


module.exports = multi_upload;