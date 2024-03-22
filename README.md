![Screenshot from 2024-03-22 09-47-17](https://github.com/as4c/E-Commerce/assets/84590258/dbca9e11-bd77-4d32-9aa1-92fd688dea4d)

# E-Commerce Django Project

This is an eCommerce web application built with Django and React.js. It utilizes Django Rest Framework (DRF) for building RESTful APIs in the backend and incorporates features such as user authentication, product management, search functionality, order processing, and product categories. For order processing, the Razorpay is integrated.
### check it out here https://bewra.vercel.app
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
## Screenshots 
<div style="display: flex;">
    <img src="https://github.com/as4c/E-Commerce/assets/84590258/44a8452e-b080-4cbb-a8cc-de7f0bfd87d8" alt="Screenshot 1" style="width: 45%; margin-right: 5px;">
    <img src="https://github.com/as4c/E-Commerce/assets/84590258/8d5b125d-41f1-4a28-bbf6-d47ef74d370b" alt="Screenshot 2" style="width: 45%;">
</div>

<div style="display: flex;">
    <img src="https://github.com/as4c/E-Commerce/assets/84590258/73fdbd0f-aea2-422a-9eac-ac978d23f08a" alt="Screenshot 3" style="width: 45%; margin-right: 5px;">
    <img src="https://github.com/as4c/E-Commerce/assets/84590258/cec49631-06ee-443c-ad36-3d6822755e22" alt="Screenshot 4" style="width: 45%;">
</div>

<div style="display: flex;">
    <img src="https://github.com/as4c/E-Commerce/assets/84590258/403cec07-cb37-4891-bcb5-50fc5127a578" alt="Screenshot 5" style="width: 45%; margin-right: 5px;">
    <img src="https://github.com/as4c/E-Commerce/assets/84590258/cf00195e-e879-43f6-8a10-a6ebb3e3c8b4" alt="Screenshot 6" style="width: 45%;">
</div>


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
