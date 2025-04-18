const path = require('path');
const fs = require('fs');

// Đường dẫn thư mục chứa các file cần gộp
const sourceDir = './src/newDeviceIdentification';
const outputFilePath = 'd:\\Code\\NewClone\\device.fingerprint\\dist\\merged.js';

// Lấy danh sách tất cả các file .js trong thư mục
const jsFiles = fs.readdirSync(sourceDir)
  .filter(file => path.extname(file) === '.js')
  .map(file => path.join(sourceDir, file));

// Kiểm tra và xóa file nếu tồn tại
if (fs.existsSync(outputFilePath)) {
  fs.unlinkSync(outputFilePath);
  console.log('Đã xóa file cũ:', outputFilePath);
}

// Gộp nội dung các file lại
let mergedContent = '';
jsFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  mergedContent += content + '\n'; // Thêm xuống dòng giữa các file
});

// Ghi nội dung đã gộp vào file mới
fs.writeFileSync(outputFilePath, mergedContent, 'utf8');
console.log('Đã gộp các file thành công vào:', outputFilePath);

module.exports = {
  entry: path.resolve(__dirname, sourceDir), // Chỉ định rõ entry point
  output: {
    filename: 'bundle.js', // Tên file output
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development', // Hoặc 'production' nếu cần
};