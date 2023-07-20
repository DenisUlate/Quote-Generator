const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show Loading
function showLoadingSpinner() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

// Hide Loading
function removeLoadingSpinner() {
	quoteContainer.hidden = false;
	loader.hidden = true;
}

// Show New Quotes
function newQuote() {
	showLoadingSpinner();
	// Pick a random Quotes from apiQuotes array
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	// Check if the Author field is blank and replace it with "Unknown"
	!quote.author ? (authorText.textContent = "Unknown") : (authorText.textContent = quote.author);

	// Check Quote length to determine styling
	quote.text.length > 120 ? quoteText.classList.add("long-quote") : quoteText.classList.remove("long-quote");

	// Set Quote, Hide Loader
	quoteText.textContent = quote.text;
	removeLoadingSpinner();
}

// Get Quotes From API
async function getQuotes() {
	showLoadingSpinner();
	const apiUrl = "https://type.fit/api/quotes";
	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		newQuote();
	} catch (error) {
		// Catch Error Here
	}
}

// Tweet Quote
function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load
getQuotes();

//---------------------------------------------------------------------

// Usin the Local Quotes Array stead of the API
// function newQuote() {
// 	// Pick a random Quotes from apiQuotes array
// 	const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
// 	console.log(quote);
// }

// newQuote();
