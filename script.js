//DOM
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Event listeners
newQuoteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);

//Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loading
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//Random Number Generator (Up to 6 digits)
function randomNum() {
    const num = Math.floor(Math.random()*1643 - 1)
    console.log(num);
    return num;
}

// Get Quote From API
async function getQuote() {
    loading();

    const apiUrl = `https://type.fit/api/quotes`;

    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        const quote = data[randomNum()];
        console.log(quote);
        
        quoteText.innerText = quote.text;
        //If author is blank add 'Unknown'
        quote.author !== null ? authorText.innerText = quote.author : authorText.innerText = 'Unknown';

        if (quoteText.innerText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        //Stop loader and show quote
        complete();
    } catch (e) {
        if (!quoteText.innerText.length) {
            getQuote();
            return;
        }
    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//On Load
getQuote();