# like-Amazon-but-not
Using MSQL, Node.js and Inquirer

## Assignment
* Create a Node App that connects to MySQL database
* Use Inquirer to step through app functionality
* The Customer app should be able to:
    1. Browse products
    2. Place products in cart
    3. View cart
* The Manager app should be able to:
    1. View Products for Sale
    2. View Low Inventory
    3. Add to Inventory
    4. Add New Product

## Technologies Used
* Node.js
* JavaScript
* Inquirer
* MySQL

## Demo Time!

### Customer App
To see that this app is working, let's look at our database first. (Keep an eye on the crock pot...)   
![Img](images/customer_before.png)

```bash
node bAmazonCustomer.js
```  
As soon as the user calls the app, 3 options are shown: BUY, VIEW CART or EXIT.  

![Gif](gifs/customer_step1.gif)  

If the user chooses to BUY, all available products are shown.  
![Gif](gifs/customer_step2.gif)

The user can then scroll through and choose the product they wish to buy. When they hit enter, that item is added to their cart.  
![Gif](gifs/customer_step3.gif)  

The app automatically sends the user back to the start menu. If the user chooses to VIEW CART, what they just added will be shown with the collective total of their cart displayed.  
![Gif](gifs/customer_step4.gif)  

Looking back at our database, we can see that the stock quantity for crock pots was decreased! Yay! It works!  
![Img](images/customer_after.png)  

And of course, the user can exit the app at any time.  
![Gif](gifs/customer_step5.gif)  

### Manager App
To see that this app is working, let's look at our database first.    
![Img](images/manager_before.png)

```bash
node bAmazonCustomer.js
```  
As soon as the user calls the app, 5 options are shown: VIEW PRODUCTS FOR SALE, VIEW LOW INVENTORY, ADD TO INVENTORY, ADD NEW PRODUCT or EXIT.  
![Gif](gifs/manager_step1.gif)  

If the user chooses to VIEW PRODUCTS FOR SALE, all available products are shown.  
![Gif](gifs/manager_step2.gif)

If the user chooses to VIEW LOW INVENTORY, all items with inventory below 5 are shown. 
![Gif](gifs/manager_step3.gif)  

If the user chooses to ADD TO INVENTORY, the user can scroll through the avaiable products and choose the one they would like to add inventory to.
![Gif](gifs/customer_step4.gif)  
![Gif](gifs/customer_step5.gif)  
![Gif](gifs/customer_step6.gif)  
![Gif](gifs/customer_step7.gif)  
![Gif](gifs/customer_step8.gif)  

Looking back at our database, we can see that the stock quantity for crock pots was decreased! Yay! It works!  
![Img](images/customer_after.png)  

And of course, the user can exit the app at any time.  
![Gif](gifs/customer_step5.gif)  

