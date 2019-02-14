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
let lowInventory = [];

// START APP
function startApp() {

	// Asks user if they want to buy, view cart or exit
	inquirer
		.prompt({
			name: "whatToDo",
			type: "list",
			message: "What would you like to do?",
			choices: ["VIEW PRODUCTS FOR SALE", "VIEW LOW INVENTORY", "ADD TO INVENTORY", "ADD NEW PRODUCT", "EXIT"]
		})

		.then(function (answer) {

			// If the user chooses to view all inventory, it runs the view all items function
			if (answer.whatToDo === "VIEW PRODUCTS FOR SALE") {
				viewAllItems();

				// If the user chooses to view low inventory, it runs the view low inventory function
			} else if (answer.whatToDo === "VIEW LOW INVENTORY") {
				viewLowInventory();

				// If the user chooses to add to inventory, it runs the add to inventory function
			} else if (answer.whatToDo === "ADD TO INVENTORY") {
				addToInventory();

				// If the user chooses to add a new product, it runs the add new product function
			} else if (answer.whatToDo === "ADD NEW PRODUCT") {
				addNewProduct();

				// If the user chooses exit, the app ends
			} else {
				connection.end();
			}
		});
}

// VIEW ALL PRODUCTS FUNCTION
function viewAllItems() {

	// Selects correct database from MySQL
	connection.query("SELECT * FROM products", function (err, results) {
		if (err) throw err;

		// Shows all products
		console.log("------------------- Products Available --------------------");
		for (let i = 0; i < results.length; i++) {
			let allIds = results[i].id;
			let allNames = results[i].product_name;
			let allCosts = results[i].price;
			let allQuantity = results[i].stock_quantity;

			console.log(allIds + ". " + allNames + ", $" + allCosts + ", Units Available: " + allQuantity);
		}
		console.log("-----------------------------------------------------------");
		startApp();
	})

}

// VIEW LOW INVENTORY FUNCTION
function viewLowInventory() {
	connection.query("SELECT * FROM products", function (err, results) {
		if (err) throw err;

		for (let i = 0; i < results.length; i++) {
			if (results[i].stock_quantity <= 5) {
				lowInventory.push(results[i]);
			}
		}
		console.log("---------------------- Low Inventory ----------------------");
		for (let i = 0; i < lowInventory.length; i++) {
			let lowInvId = lowInventory[i].id;
			let lowInvName = lowInventory[i].product_name;
			let lowInvPrice = lowInventory[i].price;
			let lowInvStock = lowInventory[i].stock_quantity;

			console.log(lowInvId + ". " + lowInvName + ", $" + lowInvPrice + ", Units Available: " + lowInvStock);
		}
		console.log("-----------------------------------------------------------");
		startApp();
	})

}

// ADD TO INVENTORY FUNCTION
function addToInventory() {
	connection.query("SELECT * FROM products", function (err, results) {
		if (err) throw err;

		// Shows all products
		console.log("---------------- Products Available ----------------");
		for (let i = 0; i < results.length; i++) {
			let allIds = results[i].id;
			let allNames = results[i].product_name;
			let allQuantity = results[i].stock_quantity;

			console.log(allIds + ". " + allNames + ", Units Available: " + allQuantity);
		}
		console.log("----------------------------------------------------------");

		// User is given a list of what to products to add inventory to
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
				message: "Update the inventory of which item?",
			}])

			.then(function (answer) {

				// Put the user's chosen item into a variable
				for (let i = 0; i < results.length; i++) {
					if (results[i].product_name === answer.choice) {
						chosenItem = results[i];
					}
				}

				// Displays chosen item one more time
				console.log("----------------------------------------------------------");
				console.log("Item chosen: " + chosenItem.id + ". " + chosenItem.product_name + ", Units available: " + chosenItem.stock_quantity);
				console.log("----------------------------------------------------------");

				// User chooses how many they want to buy
				inquirer
					.prompt([{
						name: "howmany",
						type: "input",
						message: "How many are you adding to the inventory of this item?"
					}])

					.then(function (answer) {

						// Puts new quantity into a variable

						let newInventory = parseInt(chosenItem.stock_quantity) + parseInt(answer.howmany);

						// Updates the database with new quantity
						connection.query(
							"UPDATE products SET ? WHERE ?",
							[{
									stock_quantity: newInventory
								},
								{
									id: chosenItem.id
								}
							],
							function (error) {
								if (error) throw err;

								console.log("----------------------- Inventory Updated -----------------------------------");
								console.log(answer.howmany + " " + chosenItem.product_name + " added to inventory");
								console.log("New inventory total: " + newInventory);
								console.log("----------------------------------------------------------");

								// Restarts app
								startApp();
							}
						)
					});
			});
	});
};

// ADD NEW PRODUCT FUNCTION
function addNewProduct() {
	connection.query("SELECT * FROM products", function (err, results) {
		if (err) throw err;

		// Shows all products
		console.log("---------------- Products Available ----------------");
		for (let i = 0; i < results.length; i++) {
			let allIds = results[i].id;
			let allNames = results[i].product_name;
			let allQuantity = results[i].stock_quantity;

			console.log(allIds + ". " + allNames + ", Units Available: " + allQuantity);
		}
		console.log("----------------------------------------------------------");

		// User is given a list of what to products to add inventory to
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
				message: "Update the inventory of which item?",
			}])

			.then(function (answer) {

				// Put the user's chosen item into a variable
				for (let i = 0; i < results.length; i++) {
					if (results[i].product_name === answer.choice) {
						chosenItem = results[i];
					}
				}

				// Displays chosen item one more time
				console.log("----------------------------------------------------------");
				console.log("Item chosen: " + chosenItem.id + ". " + chosenItem.product_name + ", Units available: " + chosenItem.stock_quantity);
				console.log("----------------------------------------------------------");

				// User chooses how many they want to buy
				inquirer
					.prompt([{
						name: "howmany",
						type: "input",
						message: "How many are you adding to the inventory of this item?"
					}])

					.then(function (answer) {

						// Puts new quantity into a variable

						let newInventory = parseInt(chosenItem.stock_quantity) + parseInt(answer.howmany);

						// Updates the database with new quantity
						connection.query(
							"UPDATE products SET ? WHERE ?",
							[{
									stock_quantity: newInventory
								},
								{
									id: chosenItem.id
								}
							],
							function (error) {
								if (error) throw err;

								console.log("----------------------- Inventory Updated -----------------------------------");
								console.log(answer.howmany + " " + chosenItem.product_name + " added to inventory");
								console.log("New inventory total: " + newInventory);
								console.log("----------------------------------------------------------");

								// Restarts app
								startApp();
							}
						)
					});
			});
	});
};
