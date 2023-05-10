function checkFileType(fileName) {
  switch (fileName.toLowerCase()) {
    case ".jpg":
    case ".gif":
    case ".bmp":
    case ".png":
      return "image";
    case ".m4v":
    case ".avi":
    case ".mpg":
    case ".mp4":
      return "video";
    case ".pdf":
      return "document";

    default:
      return false;
  }
}

module.exports = checkFileType;
