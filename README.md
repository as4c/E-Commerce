# eCommerce Django Project

This is an eCommerce web application built with Django and React.js. It utilizes Django Rest Framework (DRF) for building RESTful APIs in the backend and incorporates features such as user authentication, product management, search functionality, order processing, and product categories. For order processing, the Braintree API is integrated.

## Features

- User Authentication: Users can register, log in, and manage their accounts.
- Add and Delete Products: Admin users can add new products and delete existing ones.
- Search Product: Users can search for products based on various criteria.
- Order Management: Users can place orders, view their order history, and track order status.
- Categories of Products: Products are categorized into different categories for easy navigation.
- Razorpay Payment Gateway Integration: Integrated Braintree API for secure payment processing.

## Technologies Used

- Backend:
  - Django: Python-based web framework for building robust web applications.
  - Django Rest Framework (DRF): Toolkit for building RESTful APIs.
  - Razorpay : Payment gateway integration for processing orders.

- Frontend:
  - React.js: JavaScript library for building interactive user interfaces.
  - React Router: Library for handling client-side routing in a React application.
  - Axios: HTTP client library for making API requests.

## Installation and Setup

1. Clone the repository:

git clone https://github.com/as4c/E-Commerce.git

csharp


2. Change into the project directory:

cd ecommerce-django-project

markdown


3. Set up the backend:
- Create and activate a virtual environment.
- Install the required Python dependencies:
  ```
  pip install -r requirements.txt
  ```
- Update the database settings in the `settings.py` file.
- Apply database migrations using `python manage.py migrate`.
- Start the Django development server using `python manage.py runserver`.

4. Set up the frontend:
- Change into the `ecomfrontend` directory: `cd ecomfrontend`
- Install the required Node.js dependencies: `npm install`
- Start the React development server: `npm start`

5. Open your web browser and visit `http://localhost:3000` to access the eCommerce application.

## Configuration

Before running the app, make sure to configure the following settings:

- Braintree API: Set up your Braintree API credentials in the appropriate Django settings file.
- Database Configuration: Update the database settings in the `settings.py` file.

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/fix: `git checkout -b feature/my-feature`
3. Make your changes and commit them: `git commit -m "Add new feature"`
4. Push the changes to your forked repository: `git push origin feature/my-feature`
5. Open a pull request on the original repository.

## License

This project is licensed under the [MIT License](LICENSE).
