Bamazon - a node.js and mySQL Application.  node.js is used to execute commands from the user through the Inquirer npm package, and mySQL is used for storing inventory information.

To access Bamazon Customer, type in 'node bamazonCustomer.js' to command line.
To access Bamazon Manager, type in 'node bamazonManager.js' to command line.

Functionalities of each profile:

1) Bamazon Customer - can purchase items & view total, using item number ID (primary ID in mySQL)

2) Bamazon Manager - four commands:
    - View Products for Sale: displays all current inventory
    - View Low Inventory: displays any product with less than 5 inventory
    - Add to Inventory: add more inventory to an item already in stock
    - Add New Product: create a new product, set department, price, and quantity in stock