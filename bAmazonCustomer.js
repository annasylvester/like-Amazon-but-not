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
	buyProduct();
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



//     connection.query(
//         "UPDATE products SET ? WHERE ?",

//         [{
//                 stock_quantity: newQuantity
//             },

//             {

//             }
//         ],

//         function (error) {
//             if (error) throw err;
//             console.log("Bid placed successfully!");
//             start();
//         }
//     );



// } else {
//     // not enough stock available message...
//     console.log("There isn't enough stock of that product avaiable.");
//     buyProduct();
// }

////////


//     // bid was high enough, so update db, let the user know, and start over
//     connection.query(
//         "UPDATE auctions SET ? WHERE ?",
//         [{
//                 highest_bid: answer.bid
//             },
//             {
//                 id: chosenItem.id
//             }
//         ],
//         function (error) {
//             if (error) throw err;
//             console.log("Bid placed successfully!");
//             start();
//         }
//     );
// } else {
//     // bid wasn't high enough, so apologize and start over
//     console.log("Your bid was too low. Try again...");
//     start();
// }
// 			});
// 	});
// }

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

						inquirer
							.prompt([{
								name: "howmany",
								type: "input",
								message: "How many would you like to purchase?"
							}])

							.then(function (answer) {
									if (answer.howmany <= chosenItem.stock_quantity) {
										console.log("whoohoo theres enough stock");

										let newQuantity = chosenItem.stock_quantity - answer.howmany;
										console.log("new Quantity created");
										console.log(newQuantity);
									};

								// 	connection.query("UPDATE products SET ? WHERE ?",

								// 		[{
								// 				stock_quantity: newQuantity
								// 			},

								// 			{

								// 			}
								// 		],

								// 		function (error) {
								// 			if (error) throw err;
								// 			console.log("Bid placed successfully!");
								// 			start();
								// 		}
								// 	);



								// } else {
								// 	// not enough stock available message...
								// 	console.log("There isn't enough stock of that product avaiable.");
								// 	buyProduct();
								// }


							});
				});
	});
};