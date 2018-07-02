var mysql = require('mysql');
var inquire = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    password: 'password',
    user: 'root',
    database: 'bamazon_db'
});


var tbl = "products";
var get = "SELECT * from " + tbl;

var options = ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'];

inquire.prompt([{
    type: 'list',
    choices: options,
    message: 'Which command would you like to execute?',
    name: 'id'
}]).then(function (data) {

    switch (data.id) {
        case options[0]:
            console.log(data.id);
            query();
            break;

        case options[1]:
            low();
            break;

        case options[2]:
            add();
            break;

        case options[3]:
            insert();
            break;
    }

});


function query (){
    connection.query(get + ";", function (err, result) {
        if (err) {
            throw err;
            connection.end();
        };
        console.log("We have the following items in our inventory: ");
        for (var i = 0; i < result.length; i++) {
            console.log(result[i].item_id + ". " + result[i].product_name + " $" + result[i].price + " Quantity: " + result[i].stock_quantity);
        }
    });
};

function low() {
    connection.query("SELECT * FROM bamazon_db.products WHERE stock_quantity < 5;", function (err, result) {
        if (err) {
            throw err;
            connection.end();
        }
        console.log("Low inventory on the following items: ");
        for (var i = 0; i < result.length; i++) {
            console.log(result[i].item_id + ". " + result[i].product_name + " $" + result[i].price + " Quantity: " + result[i].stock_quantity);
        };
    });
};


function add(){
    query();
     inquire.prompt([{
             type: 'input',
             message: 'Which item would you like to add inventory for?',
             name: 'id'
         },
        {
            type: 'input',
            message: 'How many would you like to add to the current inventory?',
            name: 'quantity'
        }]).then(function (data) {
            connection.query('SELECT * FROM products WHERE item_id=' + parseInt(data.id) + ";", function (err, result) {
                        if (err) {
                            throw err;
                            connection.end();
                        };
            console.log(result[0].stock_quantity);
            var updateQuery = 'UPDATE products SET stock_quantity = ' + (parseInt(result[0].stock_quantity) + parseInt(data.quantity)) + " WHERE item_id = " + parseInt(data.id) + ";";
            connection.query(updateQuery, function (err, result) {
                if (err) {
                    console.log(err)
                };
                console.log("You have successfully added " + data.quantity + " items");
            });
        });
    });
};


function insert(){
    inquire.prompt([{
                type: 'input',
                message: 'What product would you like to add?',
                name: 'name'
            },
            {
                type: 'input',
                message: 'What department does it belong to?',
                name: 'department'
            },
            {
                type: 'input',
                message: 'How much does this item cost?',
                name: 'price'
            },
            {
                type: 'input',
                message: 'How many items to add to inventory?',
                name: 'inventory'
            }
        ]).then(function (data) {

             var newProduct = `INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES('${data.name}', '${data.department}', '${data.price}', '${data.inventory}');`

              connection.query(newProduct, function (err, result) {
                  if (err) {
                      throw err;
                      connection.end();
                  };
                  console.log("You have successfully added " + data.inventory + " of " + data.name + " to " + data.department + " department");
              });
        });





};



