// 1. Be Polite, Greet the User
// Task: Create a route that responds to URLs like /greetings/<username-parameter>.

// Examples: Matches routes like /greetings/Christy or /greetings/Mathilda.

// Response: Include the username from the URL in the response, such as "Hello there, Christy!" 
// or "What a delight it is to see you once more, Mathilda."


const express = require('express')
const morgan = require('morgan');

const app = express()

app.get('/greetings/:username' , (req, res) => {
    res.send(`Hello there, ${req.params.username}!`)
})

// 2. Rolling the Dice
// Task: Set up a route to handle URLs following the pattern /roll/<number-parameter>.

// Examples: Matches routes like /roll/6 or /roll/20.

// Validation: If the parameter is not a number, 
// respond with "You must specify a number." For instance, /roll/potato should trigger this response.

// Functionality: If a valid number is provided, 
// respond with a random whole number between 0 and the given number. 
// For example, a request to /roll/16 might respond with "You rolled a 14."

app.get('/roll/:number', (req, res) => {

    const roll = req.params.number    
    const random = Math.floor(Math.random() *(Number(roll)+1));


    if (isNaN(random)) {
        res.send(`You must specify a number!`)
    } else {
        res.send(`You roll a ${random}.`)
    }
})

// 3. I Want THAT One!
// Task: Create a route for URLs like /collectibles/<index-parameter>.

// Examples: Matches routes such as /collectibles/2 or /collectibles/0.

// Data Array:

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

//   Validation: If the index does not correspond to an item in the array, respond with "This item is not yet in stock. Check back soon!"

//   Response: Should describe the item at the given index, like "So, you want the shiny ball? For 5.95, it can be yours!" Include both the name and price properties.

app.get('/collectibles/:index', (req , res) => {
    if(req.params.index >= collectibles.length || req.params.index < 0) {
        res.send("This item is not yet in stock. Check back soon!")
    } else{
        res.send(`So, you want the ${collectibles[req.params.index].name}? For ${collectibles[req.params.index].price}, it can be yours!`)
    }
})

// 4. Filter Shoes by Query Parameters
// Use the following array of shoes in this challenge:

  const shoes = [
      { name: "Birkenstocks", price: 50, type: "sandal" },
      { name: "Air Jordans", price: 500, type: "sneaker" },
      { name: "Air Mahomeses", price: 501, type: "sneaker" },
      { name: "Utility Boots", price: 20, type: "boot" },
      { name: "Velcro Sandals", price: 15, type: "sandal" },
      { name: "Jet Boots", price: 1000, type: "boot" },
      { name: "Fifty-Inch Heels", price: 175, type: "heel" }
  ];

// Task: Create a route /shoes that filters the list of shoes based on query parameters.

// Query Parameters:

// min-price: Excludes shoes below this price.
// max-price: Excludes shoes above this price.
// type: Shows only shoes of the specified type.
// No parameters: Responds with the full list of shoes


app.get('/shoes', (req, res) => {

    const minprice = req.query.minprice
    const maxprice = req.query.maxprice
    const type = req.query.type

    let filteredShoes = shoes;

    if (minprice && maxprice && type) {
        filteredShoes = shoes.filter(shoe =>
            shoe.price >= minprice &&
            shoe.price <= maxprice &&
            shoe.type === type
        );
    } else if (minprice && maxprice) {
        filteredShoes = shoes.filter(shoe =>
            shoe.price >= minprice &&
            shoe.price <= maxprice
        );
    } else if (minprice) {
        filteredShoes = shoes.filter(shoe =>
            shoe.price >= minprice
        );
    } else if (maxprice) {
        filteredShoes = shoes.filter(shoe =>
            shoe.price <= maxprice
        );
    } else if (type) {
        filteredShoes = shoes.filter(shoe =>
            shoe.type === type
        );
    }

    res.send(filteredShoes);
});

// http://localhost:4000/shoes?minprice=450&maxprice=550&type=sneaker



app.listen(4000, () => {
    console.log('Listening on port 3000')
})