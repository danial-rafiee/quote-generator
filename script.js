const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const facebookBtn = document.getElementById("facebook");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function removeLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

/* Define New Quotes */
function newQuote() {
  showLoadingSpinner();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  /* check if the author field is empty then fill it with unknown */
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  /* Check quote length to determine styling */
  if (quote.text.length > 120) {
    quoteText.classList.add("quote-long");
  } else {
    quoteText.classList.remove("quote-long");
  }
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}
/* Get Quote */
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    /* Catch Error Here */
  }
}
/* Tweet Quote */
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}
/* facebook */
function shareOnFacebook() {
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    window.location.href
  )}&quote=${encodeURIComponent(
    quoteText.textContent + " - " + authorText.textContent
  )}`;
  window.open(facebookUrl, "_blank");
}
/* Add event listener */
newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);
facebookBtn.addEventListener("click", shareOnFacebook);
/* On Load */
getQuotes();
