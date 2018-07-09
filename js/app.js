/*============================================================================================================
 * A list that holds all memory card names
 ===========================================================================================================*/
 let memoryCards = [ "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube",
                      "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb",
                      "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o",
                      "fa fa-cube" ];
displayCards();
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 function displayCards( )
 {
   /*==Shuffle memoryCards==================================================================================*/
   memoryCards = shuffle(memoryCards);

   /*==Write all memory cards HTML==========================================================================*/
   let cardFragment = document.createDocumentFragment();    // HTML document fragment to create cards

   for( let i = 0; i < memoryCards.length; i++ )
   {
     const cardType = memoryCards[i];
     let cardElement = document.createElement('LI');          // creating a list element to put card info in
     cardElement.classList.add( 'card' );
     let cardTypeElement = document.createElement('I');       // creating an i element to hold card type
     console.log(memoryCards[i]);
     cardTypeElement.classList.add( );
     cardElement.appendChild( cardTypeElement );

     cardFragment.appendChild( cardElement );
   }

   /*==Add cards' HTML to page==============================================================================*/
   const deck = document.querySelector('.deck');            // saving the deck element
   deck.appendChild( cardFragment );
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array)
{
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0)
    {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 const myDeck = document.querySelector('.deck');
 myDeck.addEventListener( 'click', cardClick );

 function cardClick(event)
 {
   event.target.classList.toggle('open');
   event.target.classList.toggle('show');
 }
