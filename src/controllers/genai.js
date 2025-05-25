const express = require('express')
const multer = require('multer');
const genAIRouter = express.Router({mergeParams: true})
const genaiServ = require('../services/genaiservice');
const { tesseract } = require('../../config/configuration');
const { DOC_TYPE } = require('../contants');

// Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const doctype = req.query.doctype;
        if (!doctype) {
            return cb(new Error('doctype is required'), null);
        }
        if(doctype === DOC_TYPE.EID){
            uploadDir = tesseract.eid_path
        } else if(doctype === DOC_TYPE.PASSPORT){
            uploadDir = tesseract.passport_path
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    },
});
  
const upload = multer({ storage });
  
// Endpoint to handle file upload
genAIRouter.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }
    res.status(200).json({
      message: 'File uploaded successfully.',
      filename: req.file.filename,
      path: req.file.path,
    });
});

genAIRouter.post('/extract', async(req,res) => {
    await genaiServ.extractDocContent(req.body, res);
})

module.exports = genAIRouter