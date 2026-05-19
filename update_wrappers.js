const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = content.replace(/className="bg-white\/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100"/g, 'className="z-40 hidden"');
            // Wait, if it's hidden, it will disappear entirely.
            // Let's just make it z-40.
            modified = content.replace(/className="bg-white\/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100"/g, 'className="z-40"');
            
            if (content !== modified) {
                fs.writeFileSync(fullPath, modified);
                console.log('Updated', fullPath);
            }
        }
    }
}

processDir('./resources/js/Pages');
