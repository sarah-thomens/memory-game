/*============================================================================================================
 * Global Variables
 *==========================================================================================================*/
 //==Array holding all memory card classes====================================================================
 let memoryCards = [ "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor",
                      "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube" ];
 let openCards = [ ];                                     // an array holding all open cards
 let clickCardCount = 0;                                  // a count for how many cards have been clicked
 let openCardCount = 0;                                   // a count for how many cards are open
 let cardLocked = false;                                  // set the cards to be locked when miss occurs

 let moveCounter = 0;                                     // setting how many moves a player has made
 let starCount = 3;                                       // sets the star rating for the player

 let timerID = null;                                      // setting an id for the timer
 let secondsTimer = 0;                                    // setting the timer to start at 0 seconds
 let minutesTimer = 0;                                    // setting the minutes to start at 0

 let myDeck = document.querySelector('.deck');            // selecting the deck element from the DOM
 let restart = document.querySelector('.restart');        // selecting the restart button from the DOM
 let moves = document.querySelector('.moves');            // selecting the move counter from the DOM
 let stars = document.querySelector('.stars');            // selecting the stars rating from the DOM
 let minutes = document.querySelector('.minutes');        // selecting the minutes from the DOM
 let seconds = document.querySelector('.seconds');        // selecting the seconds from the DOM
 let modal = document.querySelector('.modal');            // selecting the modal from the DOM
 let finalTime = document.querySelector('.final-time');   // selecting the final time display from the DOM
 let finalStars = document.querySelector('.final-stars');  // selection the final stars display from the DOM
 let finalMoves = document.querySelector('.final-moves');  // selecting the final moves display from the DOM

/*============================================================================================================
 * Event Listeners
 *==========================================================================================================*/
 myDeck.addEventListener( 'click', cardClick );     // an event listener for when a card is clicked
 restart.addEventListener( 'click', restartGame );  // an event listener to restart the game

/*============================================================================================================
 * Function Calls
 *==========================================================================================================*/
//==Display the newly shuffled cards to the window============================================================
 displayCards( );

 //==When anywhere outside of the modal is clicked, close it==================================================
 window.onclick = function( event )
                 {
                   if( event.target == modal )
                   {
                      modal.style.display = "none";
                   }
                 }

/*============================================================================================================
 * displayCards Function
 *   - Shuffles memory card array using Shuffle function
 *   - Loops through each card to create its HTML and classes and appends to a document fragment
 *   - Adds the document fragment of memory card HTML to the deck element already in the HTML
 *==========================================================================================================*/
 function displayCards( )
 {
   //==Shuffle memoryCards====================================================================================
   memoryCards = shuffle( memoryCards );

   //==Write all memory cards HTML============================================================================
   let cardFragment = document.createDocumentFragment( );       // HTML document fragment to create cards

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
 * Shuffle function
 *   - From http://stackoverflow.com/a/2450976
 *   - Dynamically shuffles items in an array
*==========================================================================================================*/
function shuffle( array )
{
    var currentIndex = array.length, temporaryValue, randomIndex;

    while( currentIndex !== 0 )
    {
        randomIndex = Math.floor( Math.random( ) * currentIndex );
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*============================================================================================================
 * cardClick Function
 *   - Flips the card that is clicked to the open or closed depending on its current state.
 *==========================================================================================================*/
function cardClick( event )
{
  let currentCard = event.target;       // saving current clicked card

  //==If this is the first card, start the timer============================================================
  if( timerID === null )
  {
    timerID = window.setInterval( setTimer, 1000 );
  }

  //==if the current card is closed and is a li...============================================================
  if( !currentCard.classList.contains('open') && currentCard.nodeName === 'LI' && !cardLocked )
  {
    //==Setting card classes to open and show to make card open on screen=====================================
    currentCard.classList.add('open');
    currentCard.classList.add('show');

    //==Adding to cardCard to keep track of how many cards have been clicked==================================
    clickCardCount++;

    //==Add move to moveCounter===============================================================================
    if( clickCardCount === 2 )
    {
      increaseMoveCounter( );
    }

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
   //==for the last two cards added...========================================================================
   for( let i = openCardCount; i < openCards.length; i++ )
   {
     openCards[i].classList.remove('open');
     openCards[i].classList.remove('show');
     openCards[i].classList.remove('wrong');
   }

   //==Remove the two unmatched cards from openCards array====================================================
   openCards.pop( );
   openCards.pop( );

   //==Unlock all cards after removing of incorrect cards occurs==============================================
   cardLocked = false;
 }

/*============================================================================================================
 * checkMatch Function
 *   - This function checks to see if the two open cards are a match
 *   - If the cards are a match, they are locked in the open state
 *   - If the cards are not a match, the removeOpenCard function is called
 *==========================================================================================================*/
function checkMatch( )
{
  let cardOneType = openCards[openCardCount].children[0].classList[1];      // class for first card to match
  let cardTwoType = openCards[openCardCount + 1].children[0].classList[1];  // class for second card to match

  //==If the two cards are the same, lock cards in open position==============================================
  if( cardOneType === cardTwoType )
  {
    //==Change background color to green for correct match====================================================
    openCards[openCardCount].classList.add('match');
    openCards[openCardCount+1].classList.add('match');

    //==Update the open Card Count============================================================================
    openCardCount += 2;

    //==If every card has been matched...=====================================================================
    if( openCardCount === 16 )
    {
      //==Stop the timer======================================================================================
      window.clearInterval( timerID );

      //==Call gameWin function===============================================================================
      gameWin( );
    }
  }
  //==If the two cards do not match, call the removeOpenCard function after 1 second==========================
  else
  {
    //==Change the background color to red for an incorrect match=============================================
    openCards[openCardCount].classList.add('wrong');
    openCards[openCardCount+1].classList.add('wrong');

    //==Lock all cards while wrong cards are displayed========================================================
    cardLocked = true;

    //==Remove cards after waiting one second=================================================================
    setTimeout( removeOpenCard, 1000 );
  }
}

/*============================================================================================================
 * increaseMoveCounter Function
 *   - This function will increase the number of moves every time a player tries to make a match
 *   - Call the starRating function
 *==========================================================================================================*/
 function increaseMoveCounter( )
 {
   moves.textContent = ++moveCounter;
   starRating( );
 }

/*============================================================================================================
 * starRating Function
 *   - This function will change the number of stars in the star rating based on the number of moves made.
 *==========================================================================================================*/
 function starRating( )
 {
   //==if the player has done 8 moves, remove a star==========================================================
   if( moveCounter === 8 )
   {
     stars.children[2].classList.add('grey');
     starCount--;
   }

   //==if the player has done 16 moves, remove a star=========================================================
   if( moveCounter === 16 )
   {
     stars.children[1].classList.add('grey');
     starCount--;
   }

   //==if the player has done 24 moves, remove a star=========================================================
   if( moveCounter === 24 )
   {
     stars.children[0].classList.add('grey');
     starCount--;
   }
 }

 /*===========================================================================================================
  * setTimer Function
  *   - This function sets the game timer
  *=========================================================================================================*/
  function setTimer( )
  {
    if( secondsTimer < 59 )
    {
      secondsTimer++;
    }
    else
    {
      secondsTimer = 0;
      minutesTimer++;
    }

    if( secondsTimer < 10 )
    {
      seconds.textContent = "0" + secondsTimer;
    }
    else
    {
      seconds.textContent = secondsTimer;
    }

    minutes.textContent = minutesTimer;
 }

/*============================================================================================================
 * gameWin Function
 *   - Opens the win game modal box
 *   - Displays the time, star rating, and moves
 *   - Can start a new game
 *==========================================================================================================*/
 function gameWin( )
 {
   //==Open You Win modal box=================================================================================
   modal.style.display = "block";

   //==Display the final time, moves, and star rating=========================================================
   if( secondsTimer < 10 )
   {
     finalTime.textContent = minutesTimer + ":0" + secondsTimer;
   }
   else
   {
     finalTime.textContent = minutesTimer + ":" + secondsTimer;
   }
   
   finalMoves.textContent = moveCounter;
   finalStars.textContent = starCount;
 }

/*============================================================================================================
 * restartGame Function
 *   - This function restarts the game
 *   - The cards are reshuffled and displayed on the page
 *   - The stars, timer, and number of moves are reset
 *==========================================================================================================*/
 function restartGame( )
 {
   //==Clear out the deck=====================================================================================
   while( myDeck.firstChild )
   {
     myDeck.removeChild( myDeck.firstChild );
   }

   //==Reshuffle cards and display them by calling displayCards function======================================
   displayCards( );

   //==reset move counter to 0================================================================================
   moveCounter = 0;
   moves.textContent = moveCounter;

   //==Reset all stars========================================================================================
   starCount = 3;
   for( let i = 0; i < 3; i++ )
   {
     stars.children[i].classList.remove('grey');
   }

   //==Reset the timer========================================================================================
   window.clearInterval( timerID );
   minutesTimer = 0;
   secondsTimer = 0;
   timerID = null;

   seconds.textContent = "0" + secondsTimer;
   minutes.textContent = minutesTimer;
 }
