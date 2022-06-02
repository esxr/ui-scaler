var fs = require('fs');
var path = require('path');

// recursively iterate through files
// and run the appropriate function
// for each file
function iterateThroughDir(dir, callback) {
    var files = fs.readdirSync(dir);
    files.forEach(function (file) {
        var filePath = path.join(dir, file);
        var stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            iterateThroughDir(filePath, callback);
        } else {
            // ignore files that aren't .css
            if (path.extname(filePath) !== '.css') return;
            callback(filePath);
        }
    });
}

function multiplier(number) {
    return number * 2;
}

const scaleUI = (scalingFunction) => (match) => {
    // remove px from the string
    var number = match.replace('px', '');
    // convert string to number
    number = Number(number);
    // divide number by 2
    number = scalingFunction(number);
    // convert number to px
    finalResult = number.toString() + 'px';
    return finalResult
}

// replace regex in a file with custom text
function replaceInFile(file, replacementFunction) {
    const regex = new RegExp('\\d+(\\.\\d+)?px', 'gm')
    var data = fs.readFileSync(file, 'utf8');
    // ignore files that aren't .css
    var result = data.replace(regex, match => replacementFunction(match));
    fs.writeFileSync(file, result);
}

// replaceInFile('./test.css', scaleUI);

iterateThroughDir(
    './',
    (filepath) => replaceInFile(filepath, scaleUI(multiplier))
);
