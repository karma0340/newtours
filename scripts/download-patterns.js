const fs = require('fs');
const path = require('path');
const https = require('https');

const patternsDir = path.join(__dirname, 'public', 'images', 'patterns');
if (!fs.existsSync(patternsDir)) {
    fs.mkdirSync(patternsDir, { recursive: true });
}

const patterns = [
    "https://www.transparenttextures.com/patterns/cubes.png",
    "https://www.transparenttextures.com/patterns/carbon-fibre.png",
    "https://www.transparenttextures.com/patterns/diagmonds-light.png",
    "https://www.transparenttextures.com/patterns/leaf.png",
    "https://www.transparenttextures.com/patterns/glamorous.png",
    "https://www.transparenttextures.com/patterns/food.png"
];

async function downloadPatterns() {
    for (let p of patterns) {
        const name = path.basename(p);
        const filepath = path.join(patternsDir, name);
        console.log('Downloading', name);
        await new Promise((resolve, reject) => {
            https.get(p, (res) => {
                res.pipe(fs.createWriteStream(filepath))
                   .on('error', reject)
                   .once('close', resolve);
            }).on('error', reject);
        });
    }
    
    // Also create a default avatar
    const avatarsDir = path.join(__dirname, 'public', 'images', 'avatars');
    if (!fs.existsSync(avatarsDir)) {
        fs.mkdirSync(avatarsDir, { recursive: true });
    }
    const avatarPath = path.join(avatarsDir, 'default.png');
    // Just copy an existing image for the avatar
    fs.copyFileSync(path.join(__dirname, 'public', 'images', 'hero', 'vehicle-default.jpg'), avatarPath);
    console.log("Done");
}

downloadPatterns().catch(console.error);
