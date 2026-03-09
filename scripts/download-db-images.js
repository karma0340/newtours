const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const publicDir = path.join(__dirname, 'public', 'images', 'downloaded');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        if (url.startsWith('/')) return resolve(url); // already local
        const client = url.startsWith('https') ? https : http;
        client.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                res.resume();
                resolve(null); // Return null on 404
            }
        }).on('error', reject);
    });
}

function getFilename(url) {
    try {
        const urlObj = new URL(url);
        let name = path.basename(urlObj.pathname);
        if (!name || name === '/') name = Date.now().toString() + '.jpg';
        if (!name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) name += '.jpg';
        return Date.now() + '_' + name;
    } catch {
        return Date.now() + '.jpg';
    }
}

async function fix() {
    await mongoose.connect('mongodb://127.0.0.1:27017/newtours');
    const db = mongoose.connection.db;
    
    const collections = ['tours', 'vehicles'];

    for (let c of collections) {
        const col = db.collection(c);
        const docs = await col.find({}).toArray();
        
        for (let doc of docs) {
            let updated = false;
            let images = doc.images || [];
            
            if (images.length > 0) {
                for (let i = 0; i < images.length; i++) {
                    if (images[i] && images[i].match(/^https?:\/\//)) {
                        console.log('Downloading DB image:', images[i]);
                        const filename = getFilename(images[i]);
                        const filepath = path.join(publicDir, filename);
                        const res = await downloadImage(images[i], filepath);
                        if (res) {
                            images[i] = '/images/downloaded/' + filename;
                            updated = true;
                        }
                    }
                }
            }
            
            let image = doc.image;
            if (image && image.match(/^https?:\/\//)) {
                console.log('Downloading DB image:', image);
                const filename = getFilename(image);
                const filepath = path.join(publicDir, filename);
                const res = await downloadImage(image, filepath);
                if (res) {
                    doc.image = '/images/downloaded/' + filename;
                    updated = true;
                }
            }
            
            if (updated) {
                await col.updateOne(
                    { _id: doc._id },
                    { $set: { images, image: doc.image } }
                );
            }
        }
    }
    
    console.log("Database fetch and fix completed!");
    process.exit(0);
}

fix().catch(console.error);
