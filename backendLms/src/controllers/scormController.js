const path = require('path');
const fs = require('fs');
const AdmZip = require('adm-zip');

// Upload SCORM zip file
const uploadScorm = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let scormZip = req.files.scormZip;

    const uploadPath = path.join(__dirname, '../uploads/', scormZip.name);
    const extractPath = path.join(__dirname, '../uploads/', scormZip.name.replace('.zip', ''));
    
    // Move the uploaded file to the uploads directory
    scormZip.mv(uploadPath, (err) => {
        if (err) return res.status(500).send(err);
        
        // Extract the zip file
        const zip = new AdmZip(uploadPath);
        zip.extractAllTo(extractPath, true);  // Extract to a folder
        
        // Return the relative path to the extracted index.html
        const relativePath = `/uploads/${path.basename(extractPath)}/index.html`;

        // Send the correct path back to the frontend
        res.send({ message: 'File uploaded and extracted successfully', path: relativePath });
    });
};

module.exports = { uploadScorm };
