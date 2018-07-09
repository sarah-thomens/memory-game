/*============================================================================================================
 * A list that holds all memory card names
 *==========================================================================================================*/
 let memoryCards = [ "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor",
                      "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube" ];

/*============================================================================================================
 * displayCards Function
 *   - Shuffles memory card arry using Shuffle function
 *   - Loops through each card to create its HTML and classes and appends to a document fragment
 *   - Adds the document fragment of memory card HTML to the deck element already in the HTML
 *==========================================================================================================*/
 function displayCards( )
 {
   //==Shuffle memoryCards====================================================================================
   memoryCards = shuffle(memoryCards);

   //==Write all memory cards HTML============================================================================
   let cardFragment = document.createDocumentFragment();    // HTML document fragment to create cards

   for( let i = 0; i < memoryCards.length; i++ )
   {
     //==Create element to hold card type=====================================================================
     let cardElement = document.createElement('LI');          // creating a list element to put card info in
     cardElement.classList.add( 'card' );

     let cardTypeElement = document.createElement('I');       // creating an i element to hold card type
     cardTypeElement.classList.add( 'fa' );
     cardTypeElement.classList.add( memoryCards[i] );
     cardElement.appendChild( cardTypeElement );

     //==Add new cards to document fragment===================================================================
     cardFragment.appendChild( cardElement );
   }

   //==Add cards' HTML to page================================================================================
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
