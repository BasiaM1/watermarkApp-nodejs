const Jimp = require('jimp');
const inquirer = require('inquirer');

const addTextWatermarkToImage = async function (inputFile, outputFile, text) {
  const image = await Jimp.read(inputFile);//await gwarantuje, że kompilacja nie pojdzie do przodu, dopoki plik nie  zostanie załadowany
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);//okreslenie czcionki, odwolanie do czcionki open sans w rozmiarze 32px i kolorze czarnym
  const textData = {
    text,
    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
  };

  image.print(font, 0, 0, textData, image.getWidth(), image.getHeight());
  await image.quality(100).writeAsync(outputFile);//informuje o jakosci obrazka100%
};

addTextWatermarkToImage('./test.jpg', './test-with-watermark.jpg', 'by splotart.com')

const addImageWatermarkToImage = async function (inputFile, outputFile, watermarkFile) {
  const image = await Jimp.read(inputFile);
  const watermark = await Jimp.read(watermarkFile);
  const x = image.getWidth() / 2 - watermark.getWidth() / 2;
  const y = image.getHeight() / 2 - watermark.getHeight() / 2;
  image.composite(watermark, x, y, {//composite służy do łączenia dwóch obrazków ze sobą.
    mode: Jimp.BLEND_SOURCE_OVER, //opcja pokazywania drugiego obrazka, watermark na wierzchu
    opacitySource: 0.5,
  });
  await image.quality(100).writeAsync(outputFile);
};

addImageWatermarkToImage('./test.jpg', './test-with-watermark2.jpg', './logo.png');