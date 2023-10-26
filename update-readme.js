import fs from 'fs/promises';
import fetch from 'node-fetch';
 
try {
  // Get latest Quote
  async function getRandomQuote() {
    try {
      const response = await fetch('https://api.quotable.io/random');
      if (response) {
        
        const quoteData = await response.json();
        console.log('response',quoteData)
        const quote = quoteData.content;
        return quote;
      } else {
        return '';
      }
    } catch (error) {
      return '';
    }
  }

  async function updateREADME() {
    try {
      const randomQuote = await getRandomQuote()
      if (randomQuote) {
        console.log('reached-->',randomQuote)
        const currentText = await fs.readFile('README.md', 'utf8');
        const quoteRegex = /<!-- start quote -->([\s\S]*?)<!-- end quote -->/;
        const newText = currentText.replace(quoteRegex, '<!-- start quote -->\n```diff\n'+ randomQuote +'\n```\n<!-- end quote -->');
        await fs.writeFile('README.md', newText);
      }
    } catch (error) {
      console.error('An error occurred while updating README.md:', error);
    }
  }

  updateREADME()
} catch (error) {
  console.error('there was an error:', error.message);
}
