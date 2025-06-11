const multer = require("multer");

const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const cleanFilename = file.originalname.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '');
        cb(null, `${Date.now()}-${cleanFilename}`);
    },
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only .jpeg, .jpg and .png format are allowed'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;