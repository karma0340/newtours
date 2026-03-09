const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Simple regex to match conflict blocks and replacement
    // We want to keep ONLY the HEAD part
    // The format is:
    // <<<<<<< HEAD\n(HEAD content)\n=======\n(incoming content)\n>>>>>>> (commit hash)\n
    
    const regex = /<<<<<<< HEAD\r?\n([\s\S]*?)=======\r?\n[\s\S]*?>>>>>>>[^\r\n]*\r?\n?/g;
    
    if (regex.test(content)) {
        console.log(`Fixing conflict in: ${filePath}`);
        // Reset lastIndex because test() advances it
        content = content.replace(regex, '$1');
        fs.writeFileSync(filePath, content, 'utf8');
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file === '.git' || file === '.next') continue;
        
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            walkDir(fullPath);
        } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.css') || file.endsWith('.json') || file.endsWith('.mjs')) {
            processFile(fullPath);
        }
    }
}

walkDir(process.argv[2]);
console.log('Done resolving conflicts.');
