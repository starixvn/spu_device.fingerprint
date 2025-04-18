
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const files = [
    "/Detecas.Base64.js",
    "/Detecas.Extensions.js",
    "/Detecas.Hex.js",
    "/Detecas.JSON.js",
    "/Detecas.Md5.js",
    "/Detecas.Rc4.js",
    "/Detecas.Sha1.js",
    "/Detecas.BotD.js",
    "/Detecas.Debug.js",
    "/Detecas.Geolocation.js",
    "/Detecas.Common.js",
    "/Detecas.Cookie.js",
    "/Detecas.GPU.js",
    "/Detecas.WebGL.js",
    "/Detecas.RTC.js",
    "/Detecas.UserAgent.js",
    "/Detecas.Fonts.js",
    "/Detecas.Browser.js",
    "/Detecas.Device.js",
    "/Detecas.DeviceDetail.js",
    "/Detecas.Storages.js",
    "/Gfp.Cookie.js",
    "/Gfp.Encrypt.js",
    "/Detecas.Core.js"
];

const dir = path.join(__dirname, 'dist');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const output = fs.createWriteStream(path.join(dir, 'Gfp.Common.js'));

files.forEach(function(file) {
    const filePath = path.join(__dirname, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
    }

    content = content.replace(/Detecas/g, 'GfpPickle');

    output.write('// ---- ' + file + ' ----\n');
    output.write(content + '\n\n');
});

const es5OutputPath = path.join(__dirname, 'dist', 'Gfp.Common.es5.js');
const mergedInputPath = path.join(__dirname, 'dist', 'Gfp.Common.js');

output.end(function() {
    console.log('Gộp file hoàn tất, đã thay "Detecas" thành "GfpPickle".');

    // const cmd = 'npx esbuild "' + mergedInputPath + '" --outfile="' + es5OutputPath + '" --target=es5';

    // exec(cmd, function(err, stdout, stderr) {
    //     if (err) {
    //         console.error('Lỗi khi convert ES5:', err);
    //         return;
    //     }
    //     console.log('Đã convert sang ES5 thành công.');
    //     console.log(stdout);
    // });
});
