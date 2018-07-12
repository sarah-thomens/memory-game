/*============================================================================================================
 * Global Variables
 *==========================================================================================================*/
 //==Array holding all memory card classes====================================================================
 let memoryCards = [ "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor",
                      "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube" ];
 let openCards = [ ];                             // an array holding all open cards
 let clickCardCount = 0;                          // a count for how many cards have been clicked
 let openCardCount = 0;                           // a count for how many cards are open
 let cardLock = false;                            // set

 let myDeck = document.querySelector('.deck');    // selecting the deck element from the DOM

/*============================================================================================================
 * Event Listeners
 *==========================================================================================================*/
 myDeck.addEventListener( 'click', cardClick );     // an event listener for when a card is clicked

/*============================================================================================================
 * Function Calls
 *==========================================================================================================*/
 displayCards();

/*============================================================================================================
 * displayCards Function
 *   - Shuffles memory card array using Shuffle function
 *   - Loops through each card to create its HTML and classes and appends to a document fragment
 *   - Adds the document fragment of memory card HTML to the deck element already in the HTML
 *==========================================================================================================*/
 function displayCards( )
 {
   //==Shuffle memoryCards====================================================================================
   memoryCards = shuffle(memoryCards);

   //==Write all memory cards HTML============================================================================
   let cardFragment = document.createDocumentFragment();        // HTML document fragment to create cards

   for( let i = 0; i < memoryCards.length; i++ )
   {
     //==Create element to hold card type=====================================================================
     let cardElement = document.createElement( 'LI' );          // creating a list element to put card info in
     cardElement.classList.add( 'card' );

     let cardTypeElement = document.createElement( 'I' );       // creating an i element to hold card type
     cardTypeElement.classList.add( 'fa' );
     cardTypeElement.classList.add( memoryCards[i] );
     cardElement.appendChild( cardTypeElement );

     //==Add new cards to document fragment===================================================================
     cardFragment.appendChild( cardElement );
   }

   //==Add cards' HTML to page================================================================================
   myDeck.appendChild( cardFragment );
 }

/*============================================================================================================
 * Shuffle function from http://stackoverflow.com/a/2450976
 * Dynamically shuffles items in an array.
*==========================================================================================================*/
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
 *  ^ display the card's symbol (put this functionality in another function that you call from this one)
 *  ^ add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  ^ if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    ^ if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/*============================================================================================================
 * cardClick Function
 *   - Flips the card that is clicked to the open or closed depending on its current state.
 *==========================================================================================================*/
function cardClick(event)
{
  let currentCard = event.target;       // saving current clicked card

  //==if the current card is closed and is a li...============================================================
  if( !currentCard.classList.contains('open') && currentCard.nodeName === 'LI' )
  {
    //==Setting card classes to open and show to make card open on screen=====================================
    currentCard.classList.add('open');
    currentCard.classList.add('show');

    //==Adding to cardCard to keep track of how many cards have been clicked==================================
    clickCardCount++;
    console.log( "Card Count = " + clickCardCount );

    //==Calling addOpenCard funtion to add the card to the openCards array====================================
    addOpenCard( currentCard );
  }
}

/*============================================================================================================
 * addOpenCard Function
 *   - Adds the new open card to the openCards array
 *   - If there are 2 or more cards open, call the checkMatch function
 *==========================================================================================================*/
function addOpenCard( newOpenCard )
{
  //==Adding the new card to the openCards array==============================================================
  openCards.push( newOpenCard );
  console.log( openCards );

  //==If there are 2 or more cards in the openCards array call checkMatch function============================
  if( clickCardCount >= 2 )
  {
    checkMatch( );

    //==Reset the card count for how many cards have been clicked=============================================
    clickCardCount = 0;
  }
}

/*============================================================================================================
 * removeOpenCard Function
 *   - Removes the unmatched cards from the openCards array
 *   - Closes both cards
 *==========================================================================================================*/
 function removeOpenCard( )
 {
   //==for the last two cards added...=======================================================================
   for( let i = openCardCount; i < openCards.length; i++ )
   {
     openCards[i].classList.remove('open');
     openCards[i].classList.remove('show');
     openCards[i].classList.remove('wrong');
   }

   //==Remove the two unmatched cards from openCards array===================================================
   openCards.pop();
   openCards.pop();
 }

/*============================================================================================================
 * checkMatch Function
 *   - This function checks to see if the two open cards are a match
 *   - If the cards are a match, they are locked in the open state
 *   - If the cards are not a match, the removeOpenCard function is called
 *==========================================================================================================*/
function checkMatch()
{
  let cardOneType = openCards[openCardCount].children[0].classList[1];      // class for first card to match
  let cardTwoType = openCards[openCardCount + 1].children[0].classList[1];  // class for second card to match

  console.log( "Card One: " + cardOneType + "\nCard Two: " + cardTwoType );
  //==If the two cards are the same, lock cards in open position==============================================
  if( cardOneType === cardTwoType )
  {
    console.log( "It's a Match! Lock Cards in Open Position!" );

    //==Update the open Card Count============================================================================
    openCardCount += 2;
  }
  //==If the two cards do not match, call the removeOpenCard function after 1 second==========================
  else
  {
    //==Change the background color to red for an incorrect match=============================================
    openCards[openCardCount].classList.add('wrong');
    openCards[openCardCount+1].classList.add('wrong');

    setTimeout( removeOpenCard, 1000 );
  }
}
