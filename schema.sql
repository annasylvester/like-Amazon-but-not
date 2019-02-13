DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL (10,2) ,
  stock_quantity INT(10),
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Funky Glasses", "Accessories", 5.00, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sterling Silver Bracelet", "Accessories", 17.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("DSLR Camera", "Electronics", 500.00, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple Watch", "Electronics", 129.99, 43);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tervis Cups", "Kitchen", 18.59, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Crock Pot", "Kitchen", 29.98, 16);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hair Straightener", "Beauty", 16.79, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hair Curler", "Beauty", 14.88, 23);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Harry Potter and the Sorcer's Stone", "Books", 17.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Harry Potter and the Chamber of Secrets", "Books", 14.99, 50);

