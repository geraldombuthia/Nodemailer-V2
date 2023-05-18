const { marked } = require("marked");
const { JSDOM } = require('jsdom');

const parseMarkdown = async (content) => {
    try {
        const options = {
            mangle: false, // Disable mangle option
            headerIds: false, // Disable headerIds option
            breaks: true,
          };
        const html = await marked(decodeHtmlEntities(content), options);
        return html;
      } catch (err) {
        console.error('An error occurred:', err);
        throw err;
      }
}
function decodeHtmlEntities(html) {
    const { window } = new JSDOM('');
  const { document } = window;
  const decodedString = document.createElement('textarea');
  decodedString.innerHTML = html;
  return decodedString.value;
  }
module.exports = parseMarkdown;