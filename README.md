# E-commerce-App (MERN stack Project)

Overview
The E-Commerce Web App is a full-stack MERN (MongoDB, Express, React, Node.js) application that provides a complete online shopping experience. Users can browse products, search for items, add them to their cart, and make payments securely via Stripe. The app supports Google login, real-time toast notifications, image uploads via Cloudinary, and includes a dedicated admin panel for managing products, orders, and users. Passwords are securely hashed using bcrypt, and API requests are managed via Axios.

Features

User Features:

- Browse products by categories and search for specific items.

- Add/remove products from the shopping cart.

- Secure checkout using Stripe payment gateway.

- Login using Google OAuth or traditional email/password.

- Real-time toast notifications for actions like order confirmation and errors.

- Upload images for products (handled via Cloudinary).

- Password security via bcrypt.

Admin Features:

- Add, update, or delete products.

- Manage orders and track delivery status.

Routing & Navigation:

- Frontend navigation powered by React Router DOM for smooth page transitions.

Technology Stack

Front-End:

- React: Responsive and interactive UI.

- Tailwind CSS: Modern styling.

- React Toastify: Real-time notifications.

- React Router DOM: Page routing and navigation.

- Axios: API request handling.

Back-End:

- Node.js & Express.js: Server-side logic and RESTful APIs.

- bcrypt: Password hashing for secure authentication.

Database:

- MongoDB: Stores users, products, and orders.

Authentication & Payment:

- JWT: Secure session management.

- Google OAuth: Login with Google accounts.

- Stripe: Secure online payment processing.

Image Management:

- Cloudinary: Upload and convert images to binary for storage.

State Management:

- React Hooks & Context API: Component and global state management.

![Project Structure Screenshot](https://i.postimg.cc/nhNtzD1m/Screenshot-2025-09-21-at-10-40-04-AM.png)

Installation

Prerequisites

- Node.js
- MongoDB

Steps

1. Clone the repository:

   bash
   git clone https://github.com/nabin171/E-commerce-App.git

2. Install dependencies for frontend,admin and backend:

   bash
   cd frontend && npm install
   cd ../backend && npm install
   cd ../admin && npm install

3. Set up environment variables:

- Create a `.env` file in the `backend/` directory with the following keys:

  ```env
     # MongoDB Database URI

     MONGO_URI=<your-mongodb-uri>

     # Cloudinary for Image Uploads

     CLOUDINARY_API_KEY=<your-cloudinary-api-key>
     CLOUDINARY_SECRET_KEY=<your-cloudinary-secret-key>
     CLOUDINARY_NAME=<your-cloudinary-name>

     # JWT Secret Key for Authentication

     JWT_SECRET=<your-jwt-secret>

     # Admin Credentials

     ADMIN_EMAIL=<your-admin-email>
     ADMIN_PASSWORD=<your-admin-password>

      # Stripe Payment Gateway

     STRIPE_SECRET_KEY=<your-stripe-secret-key>

     # Google OAuth for Login

     GOOGLE_CLIENT_ID=<your-google-client-id>
  ```

- Create a `.env` file in the `frontend/` directory with the following keys:

  ```

   # Backend API URL

   VITE_BACKEND_URL="http://localhost:4000"

   # Google OAuth Client ID

   VITE_GOOGLE_CLIENT_ID=<your-google-client-id>
  ```

- Create a `.env` file in the `admin/` directory with the following keys:

  ```

  # Backend API URL

  VITE_BACKEND_URL="http://localhost:4000"
  ```

4. Start the development servers:

   ```bash
   # Start the server
   cd backend && npm start

   # Start the client
   cd frontend && npm start

   # Start the admin
   cd admin && npm start
   ```

---

# Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push to your branch.
4. Create a pull request to the main repository.

## License

This project is licensed under the MIT License.

For any inquiries, feel free to contact me at:

- Email: [karki0008@gmail.com](mailto:nabinkarki@example.com)
- GitHub: [nabin171](https://github.com/nabin171)
  Let me know if you’d like to make further edits!
