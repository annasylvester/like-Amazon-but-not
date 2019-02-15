// CONNECT TO MYSQL
let mysql = require("mysql");

let connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "password=1",
	database: "bamazon"
});

connection.connect(function (err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	startApp();
});

// INQUIRER
let inquirer = require('inquirer');

// VARIABLES
//// Empty shopping cart
let shoppingCart = [];
//// Empty cart totals
let cartTotals = [];
let sumCartTotal = 0;

// START APP
function startApp() {

	// Asks user if they want to buy, view cart or exit
	inquirer
		.prompt({
			name: "whatToDo",
			type: "list",
			message: "What would you like to do?",
			choices: ["BUY", "VIEW CART", "EXIT"]
		})

		.then(function (answer) {

			// If the user chooses to buy, it runs the buy function
			if (answer.whatToDo === "BUY") {
				buyProduct();
			}

			// If the user chooses to view cart, it runs the view cart function
			else if (answer.whatToDo === "VIEW CART") {
				viewCart();

				// If the user chooses exit, the app ends
			} else {
				connection.end();
			}
		});
}

// BUY PRODUCT
function buyProduct() {

	// Selects correct database from MySQL
	connection.query("SELECT * FROM products", function (err, results) {
		if (err) throw err;

		// Shows all products
		console.log("---------------- Products Available ---------------");
		for (let i = 0; i < results.length; i++) {
			let allIds = results[i].id;
			let allNames = results[i].product_name;
			let allCosts = results[i].price;
			let allQuantity = results[i].stock_quantity;

			console.log(allIds + ". " + allNames + ", $" + allCosts + ", Units Available: " + allQuantity);
		}
		console.log("---------------------------------------------------");

		// User is given a list of what to buy
		inquirer
			.prompt([{
				name: "choice",
				type: "rawlist",
				choices: function () {
					let choiceArray = [];
					for (let i = 0; i < results.length; i++) {
						choiceArray.push(results[i].product_name);
					}
					return choiceArray;
				},
				message: "What would you like to purchase?",
			}])

			.then(function (answer) {

				// Put the user's chosen item into a variable
				for (let i = 0; i < results.length; i++) {
					if (results[i].product_name === answer.choice) {
						chosenItem = results[i];
					}
				}

				// Displays chosen item one more time
				console.log("---------------------------------------------------");
				console.log("Item chosen: " + chosenItem.product_name + ", Price per unit: " + chosenItem.price + ", Units available: " + chosenItem.stock_quantity);
				console.log("---------------------------------------------------");

				// User chooses how many they want to buy
				inquirer
					.prompt([{
						name: "howmany",
						type: "input",
						message: "How many would you like to purchase?"
					}])

					.then(function (answer) {

						// if there is enough product, the chosen quantity is subtracted from the quantity in the database
						if (answer.howmany <= chosenItem.stock_quantity) {

							// Puts new quantity into a variable
							let newQuantity = parseInt(chosenItem.stock_quantity) - parseInt(answer.howmany);

							// Updates the database with new quantity
							connection.query(
								"UPDATE products SET ? WHERE ?",
								[{
										stock_quantity: newQuantity
									},
									{
										id: chosenItem.id
									}
								],
								function (error) {
									if (error) throw err;

									// Adds item to shopping cart

									let times = answer.howmany;
									for (let i = 0; i < times; i++) {
										shoppingCart.push(chosenItem);
									}

									console.log("---------------------------------------------------");
									console.log(answer.howmany + " " + chosenItem.product_name + " added to cart");
									console.log("---------------------------------------------------");

									// Restarts app
									startApp();
								}
							);

						} else {

							// Error Message
							console.log("---------------------------------------------------");
							console.log("We're sorry. There is not enough stock available.");
							console.log("---------------------------------------------------");

							// Restarts app
							startApp();
						}
					});
			});
	});
};


// VIEW CART
function viewCart() {

	// Display each item placed in cart
	console.log("-------------------- Your Cart --------------------");

	if (shoppingCart.length > cartTotals.length) {
		for (let i = 0; i < shoppingCart.length; i++) {
			let productNames = shoppingCart[i].product_name;
			let productCost = shoppingCart[i].price;

			console.log(productNames + ", " + productCost);
			cartTotals.push(productCost);
		}
		// Get total of cart items
		for (let i = 0; i < cartTotals.length; i++) {
			sumCartTotal += cartTotals[i];
		}

	} else {
		for (let i = 0; i < shoppingCart.length; i++) {
			let productNames = shoppingCart[i].product_name;
			let productCost = shoppingCart[i].price;

			console.log(productNames + ", " + productCost);
		}
	}

	// Display cart total
	console.log("Your total: " + sumCartTotal);
	console.log("---------------------------------------------------");

	// Restarts app
	startApp();

};