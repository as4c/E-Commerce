![Screenshot from 2024-03-22 09-49-10](https://github.com/as4c/E-Commerce/assets/84590258/2899e6a1-1d36-4bdf-b12e-16665c9c7395)
![Screenshot from 2024-03-22 09-47-17](https://github.com/as4c/E-Commerce/assets/84590258/dbca9e11-bd77-4d32-9aa1-92fd688dea4d)
<div>
    <img src="https://github.com/as4c/E-Commerce/assets/84590258/2899e6a1-1d36-4bdf-b12e-16665c9c7395" alt="Screenshot 1" style="width: 45%; float: left; margin-right: 5px;">
    <img src="https://github.com/as4c/E-Commerce/assets/84590258/dbca9e11-bd77-4d32-9aa1-92fd688dea4d" alt="Screenshot 2" style="width: 45%; float: left;">
</div>

# E-Commerce Django Project

This is an eCommerce web application built with Django and React.js. It utilizes Django Rest Framework (DRF) for building RESTful APIs in the backend and incorporates features such as user authentication, product management, search functionality, order processing, and product categories. For order processing, the Razorpay is integrated.

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
  - React Router Dom: Library for handling client-side routing in a React application.
![Screenshot from 2024-03-22 09-47-59](https://github.com/as4c/E-Commerce/assets/84590258/26aba92a-742e-4db8-96ec-a9a68bd1bcd1)
![Upl![Screenshot from 2024-03-22 09-49-28](https://github.com/as4c/E-Commerce/assets/84590258/3a3fce0d-6651-4ccf-a6ba-a17714170f7d)
oadin![Screenshot from 2024-03-22 09-49-36](https://github.com/as4c/E-Commerce/assets/84590258/ed97db1f-238c-43eb-a20b-0c391fe66f14)
g Screenshot from 2024-03-22 09-49-10.png…]()


## Installation and Setup

1. Clone the repository:
```
git clone https://github.com/as4c/E-Commerce.git
```

2. Change into the project directory:
```
cd ecommerce-django-project
```

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

- Razorpay : Set up your Razorpay api credentials in the appropriate Django settings file.
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
