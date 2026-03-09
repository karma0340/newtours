const fs = require('fs');
const path = require('path');

const dirs = [path.join(__dirname, 'app'), path.join(__dirname, 'components')];

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

function processFile(file) {
    if (!file.match(/\.(js|jsx)$/)) return;
    
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Placeholders
    content = content.replace(/https:\/\/via\.placeholder\.com\/\d+x\d+/g, '/images/hero/vehicle-default.jpg');
    content = content.replace(/https:\/\/via\.placeholder\.com\/\d+/g, '/images/hero/vehicle-default.jpg');
    
    // UI Avatars
    content = content.replace(/https:\/\/ui-avatars\.com\/api\/\?name=\$\{.*?\}/g, '/images/hero/avatar-default.png');
    
    // Transparent Textures -> we couldn't download them, just remove them to rely on pure CSS
    content = content.replace(/https:\/\/www\.transparenttextures\.com\/patterns\/cubes\.png/g, '');
    content = content.replace(/https:\/\/www\.transparenttextures\.com\/patterns\/carbon-fibre\.png/g, '');
    content = content.replace(/https:\/\/www\.transparenttextures\.com\/patterns\/diagmonds-light\.png/g, '');
    content = content.replace(/https:\/\/www\.transparenttextures\.com\/patterns\/leaf\.png/g, '');
    content = content.replace(/https:\/\/www\.transparenttextures\.com\/patterns\/glamorous\.png/g, '');
    content = content.replace(/https:\/\/www\.transparenttextures\.com\/patterns\/food\.png/g, '');
    
    // Social & Nav external links
    content = content.replace(/href="https:\/\/www\.google\.com\/maps.*?"/g, 'href="#"');
    content = content.replace(/https:\/\/www\.instagram\.com\/hikethehimalaya\.in.*?"/g, '#"');
    content = content.replace(/href="https:\/\/instagram\.com"/g, 'href="#"');
    
    // Seed vehicle Unsplash images
    content = content.replace(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+\?q=80\&w=1000\&auto=format\&fit=crop/g, '/images/hero/vehicle-default.jpg');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
}

dirs.forEach(d => {
    if (fs.existsSync(d)) walkDir(d, processFile);
});

// Create default avatar
const avatarsDir = path.join(__dirname, 'public', 'images', 'hero');
const avatarPath = path.join(avatarsDir, 'avatar-default.png');
if (!fs.existsSync(avatarPath)) {
    fs.copyFileSync(path.join(__dirname, 'public', 'images', 'hero', 'vehicle-default.jpg'), avatarPath);
}

console.log("Replacement complete.");
