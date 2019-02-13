// MY SQL

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

// ENDS CONNECTION TO MYSQL
function showAllProducts() {
	connection.query("SELECT * FROM products", function (err, res) {
		if (err) throw err;
		console.log(res);
		connection.end();
	});
}

// INQUIRER
let inquirer = require('inquirer');

// Empty shopping cart
let shoppingCart = [];

function startApp() {
	inquirer
	.prompt({
		name: "whatToDo",
		type: "list",
		message: "What would you like to do?",
		choices: ["BUY", "VIEW CART", "EXIT"]
	})
	.then(function(answer) {
		if (answer.whatToDo === "BUY") {
			buyProduct();
		}
		else if (answer.whatToDo === "VIEW CART") {
			viewCart();
		} else {
			connection.end();
		}
	});
}

// Buy Product Function
function buyProduct() {

	connection.query("SELECT * FROM products", function (err, results) {
		if (err) throw err;

		// Shows all products
		console.log(results);

		// User chooses item to buy
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

				for (let i = 0; i < results.length; i++) {
					if (results[i].product_name === answer.choice) {
						chosenItem = results[i];
					}
				}
				console.log(chosenItem);

				// Choose how many to buy
				inquirer
					.prompt([{
						name: "howmany",
						type: "input",
						message: "How many would you like to purchase?"
					}])

					// if there is enough product, it reduces the quantity in MySQL
					.then(function (answer) {
						if (answer.howmany <= chosenItem.stock_quantity) {

							let newQuantity = chosenItem.stock_quantity - answer.howmany;

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
									console.log("Product added to shopping cart.");
									
									viewCart();
								}
							);
						} else {
							console.log("We're sorry. There is not enough stock available.");
						}
					});
			});
	});
};

function viewCart() {

}

