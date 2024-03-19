# myStore - My own store for shopping
<img src="https://github.com/Devil1205/myStore/blob/main/client/src/Images/navbarLogo2.png?raw=true" alt="myStore" width="150px"> 
 
This project is a robust ecommerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides a seamless shopping experience for users, allowing them to browse through a variety of products, add items to their cart, and securely complete their purchases.

## Key Features

1. **User Authentication:** Secure user authentication system enables users to create accounts, log in, and manage their profiles.
2. **Product Catalog:** Extensive catalog of products with detailed descriptions, images, and pricing information.
3. **Shopping Cart:** Intuitive shopping cart functionality allows users to add, remove, and update items before proceeding to checkout.
4. **Payment Integration:** Seamless integration with popular payment gateways for secure and convenient transactions.
5. **Order Management:** Comprehensive order management system for tracking orders, managing shipments, and viewing order history.
6. **Responsive Design:** Fully responsive design ensures a seamless experience across various devices and screen sizes.

## Technologies Used

- **Frontend:** React.js, Redux, HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Payment Integration:** Stripe
- **Deployment:** Render
- **Styling Library:** MUI, MdBootstrap, Bootstrap5

## Getting Started

1. **Clone the repository:**

   ```
   git clone https://github.com/Devil1205/myStore.git
   ```

2. **Install dependencies:**

Make sure you have Node.js and npm installed on your system. Then, navigate to the project directory and run:
```
npm install
```

3. **Set up environment variables:**

Create a .env file in the root directory and add the following variables:
```
URI=MONGO_Url
JWT_SECRET = JWT_SECRET
JWT_EXPIRY = JWT_EXPIRY_TIME
COOKIE_EXPIRY = COOKIE_EXPIRY_TIME
MAIL_ID = MAIL_ID_FOR_RESET_PASSWORD
MAIL_PASSWORD = MAIL_ID_PASSWORD
MAIL_SERVICE = gmail(or other)
CLOUDINARY_NAME = CLOUDINARY_NAME
CLOUDINARY_API_KEY = CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET = CLOUDINARY_API_SECRET
STRIPE_API = STRIPE_API_KEY
STRIPE_SECRET = STRIPE_SECRET_KEY
```
Replace all variable values with your actual values.

4. **Run the development server:**

Start the development server by running:
```
npm run start
```
Open your web browser and go to http://localhost:5000 to view the application running locally on your machine.

Enjoy the application! 🎉


