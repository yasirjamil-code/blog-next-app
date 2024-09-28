const file = new Blob(['Hello, world!'], { type: 'text/plain' });
const url = URL.createObjectURL(file);
console.log(url);  // a temporary URL like "blob:http://example.com/..."

