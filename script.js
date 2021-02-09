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

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API
async function getQuote() {
    showLoadingSpinner();

    const apiUrl = `https://freequote.herokuapp.com/`;

    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        
        quoteText.innerText = data.quote;
        //If author is blank add 'Unknown'
        data.author !== "" ? authorText.innerText = data.author : authorText.innerText = 'Unknown';

        if (quoteText.innerText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        //Stop loader and show quote
        removeLoadingSpinner();
    } catch (e) {
        if (!quoteText.innerText.length) {
            getQuote();
        } else {
            quoteText.innerText = 'Sorry, something went wrong.';
            authorText.innerText = 'Please refresh the page.';
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