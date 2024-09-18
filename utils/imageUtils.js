import fs from "fs/promises";

async function getImageBuffer(imagePath) {
  try {
    const imageBuffer = await fs.readFile(imagePath);
    return imageBuffer;
  } catch (error) {
    console.error("Error reading image file:", error);
    throw error;
  }
}

export { getImageBuffer };
