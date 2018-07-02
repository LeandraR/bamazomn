var mysql = require('mysql');
var inquire = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    password: 'password',
    user: 'root',
    database: 'bamazon_db'
});

connection.connect(function (err) {
    console.log("connected as id " + connection.threadId + "\n");
});

var tbl = "products";
var get = "SELECT * from " + tbl;

connection.query(get, function (err, result) {
    if (err) {
        throw err;
        connection.end();
    };
    console.log("We have the following items for sale: ")
    for (var i = 0; i< result.length; i++){
        console.log(result[i].item_id + ". " + result[i].product_name + " $" + result[i].price);
    }
    purchase();
});


function purchase() {
    inquire.prompt([{
            type: 'input',
            message: 'Which item would you like to buy? Type in the ID',
            name: 'id'
        },
        {
            type: 'input',
            message: 'How many would you like to purchase?',
            name: 'quantity'
        }
    ]).then(function (data) {

        var product = parseInt(data.id);
        var quantity = parseInt(data.quantity);


        connection.query('SELECT * FROM products WHERE item_id=' + product + ";", function (err, result) {
            if (err) {
                throw err;
                connection.end();
            };

            var cost = result[0].price;
            var itemChosen = result[0].product_name;
            var stock = result[0].stock_quantity;

            if (stock < quantity) {
                console.log('Sorry, insufficient quantity in stock!')
            } else {
                connection.query('UPDATE products SET stock_quantity = ' + (parseInt(stock) - quantity) + " WHERE item_id =" + product + ";", function (err, result) {
                    if (err) {
                        console.log(err)
                    };
                });
            };
            console.log("Your Total is: $" + quantity * cost + " for " + quantity + " " + itemChosen);
        });
    });
};
