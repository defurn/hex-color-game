function getSizeInBytes(file){
  let fileSize = file.size
  return {"filesize": fileSize + ' bytes'}
}

module.exports = {
  getSizeInBytes
}
