const cloudinary = require('../config/cloudinary');

/**
 * Stream a multer memoryStorage file buffer to Cloudinary.
 * @param {Buffer} buffer - req.file.buffer
 * @param {object} options - Cloudinary upload options
 * @returns {Promise<{secure_url:string, public_id:string}>}
 */
function uploadBuffer(buffer, options = {}) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
    stream.end(buffer);
  });
}

module.exports = { uploadBuffer };
