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
    const num = Math.floor(Math.random()*100000 - 1)
    return num;
}

// Get Quote From API
async function getQuote() {
    loading();
    const proxyUrl = 'http://api.allorigins.win/get?url='; //Need this tog et around the default CORS policy
    const apiUrl = `http://api.forismatic.com/api/1.0/?method=getQuote&key=${randomNum()}&lang=en&format=json`;

    try {
        const res = await fetch(proxyUrl + encodeURIComponent(apiUrl));
        const data = await res.json();
        const quoteObj = JSON.parse(data.contents);
        
        quoteText.innerText = quoteObj.quoteText;
        //If author is blank add 'Unknown'
        quoteObj.quoteAuthor.length ? authorText.innerText = quoteObj.quoteAuthor : authorText.innerText = 'Unknown';

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