import sharp from "sharp";

const createPlaceholder = async (image: sharp.Sharp) => {
  const { width, height } = await image.metadata();
  if (!width || !height) {
    throw new Error("fetched image without width and height");
  }

  const imgAspectRatio = width / height;

  const placeholderImgWidth = 8;
  const placeholderImgHeight = Math.round(placeholderImgWidth / imgAspectRatio);

  return image
    .resize(placeholderImgWidth, placeholderImgHeight)
    .png({
      quality: 75,
    })
    .toBuffer()
    .then((buffer) => `data:image/png;base64,${buffer.toString("base64")}`);
};

export default createPlaceholder;
