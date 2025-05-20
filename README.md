# 🏨 HotelDB API

HotelDB API is a hotel management system that allows creating, updating, deleting, and querying hotels and associated clients. This project is built with Node.js, Express, and MongoDB, using Mongoose for database management.

## ✨ **Features**

- 🏢 **Hotel Management:** CRUD (Create, Read, Update, Delete) operations for hotels.
- 👥 **Client Management:** CRUD for clients associated with hotels.
- 🔒 **User Authentication and Authorization:** Role-based access control (admin and user) with JWT for authentication.
- 🛠️ **Easy Integration:** Simple integration with frontend applications.

## ⚙️ **Installation**

1. **Clone this repository:**
    ```bash
    git clone https://github.com/aidact3/HotelDB.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd HotelDB
    ```
3. **Install dependencies:**
    ```bash
    npm install
    ```
4. **Create a `.env` file in the root with the following variables:**
    ```
    DB_URL=mongodb://localhost:27017/hoteldb
    JWT_SECRET=your_jwt_secret
    ```

5. **Run the server:**
    ```bash
    npm start
    ```

## 📋 **Endpoints**

### **Users**

- **🔐 User Registration**
    - **POST** `/api/users/register`
    - **Description:** Registers a new user in the system.
    - **Body:**
        ```json
        {
            "userName": "username",
            "password": "password"
        }
        ```
    - **Successful Response:**
        ```json
        {
            "_id": "user_id",
            "userName": "username",
            "role": "user"
        }
        ```

- **🔓 User Login**
    - **POST** `/api/users/login`
    - **Description:** Logs in and returns a JWT token.
    - **Body:**
        ```json
        {
            "userName": "username",
            "password": "password"
        }
        ```
    - **Successful Response:**
        ```json
        {
            "user": {
                "_id": "user_id",
                "userName": "username"
            },
            "token": "jwt_token"
        }
        ```

- **🔄 Update User Role**
    - **PUT** `/api/users/role/:id`
    - **Description:** Updates user role (admins only).
    - **Headers:** `Authorization: Bearer <token>`
    - **Body:**
        ```json
        {
            "role": "admin" // or "user"
        }
        ```
    - **Successful Response:**
        ```json
        {
            "_id": "user_id",
            "userName": "username",
            "role": "admin"
        }
        ```

- **🗑️ Delete User**
    - **DELETE** `/api/users/:id`
    - **Description:** Deletes a user (an admin can delete any user; a user can delete themselves).
    - **Headers:** `Authorization: Bearer <token>`
    - **Successful Response:**
        ```json
        {
            "message": "User deleted successfully."
        }
        ```

### **Clients**

- **➕ Create Client**
    - **POST** `/api/clients`
    - **Description:** Creates a new client associated with a user.
    - **Body:**
        ```json
        {
            "name": "client_name",
            "email": "client_email",
            "phone": "client_phone",
            "user": "associated_user_id"
        }
        ```
    - **Successful Response:**
        ```json
        {
            "_id": "client_id",
            "name": "client_name",
            "email": "client_email",
            "phone": "client_phone",
            "user": "associated_user_id"
        }
        ```

- **📄 Get All Clients**
    - **GET** `/api/clients`
    - **Description:** Gets a list of all clients.
    - **Successful Response:**
        ```json
        [
            {
                "_id": "client_id",
                "name": "client_name",
                "email": "client_email",
                "phone": "client_phone",
                "user": {
                    "userName": "username"
                }
            }
        ]
        ```

- **🔍 Get Client by ID**
    - **GET** `/api/clients/:id`
    - **Description:** Gets details of a client by ID.
    - **Successful Response:**
        ```json
        {
            "_id": "client_id",
            "name": "client_name",
            "email": "client_email",
            "phone": "client_phone",
            "user": {
                "userName": "username"
            }
        }
        ```

- **🔄 Update Client**
    - **PUT** `/api/clients/:id`
    - **Description:** Updates client data.
    - **Body:** Fields to update.
    - **Successful Response:**
        ```json
        {
            "_id": "client_id",
            "name": "updated_client_name",
            "email": "updated_client_email",
            "phone": "updated_client_phone",
            "user": {
                "userName": "username"
            }
        }
        ```

- **🗑️ Delete Client**
    - **DELETE** `/api/clients/:id`
    - **Description:** Deletes a client by ID.
    - **Successful Response:**
        ```json
        {
            "message": "Client deleted successfully."
        }
        ```

### **Hotels**

- **🏨 Create Hotel**
    - **POST** `/api/hotels`
    - **Description:** Creates a new hotel.
    - **Body:**
        ```json
        {
            "name": "hotel_name",
            "city": "hotel_city",
            "country": "hotel_country",
            "client": "associated_client_id",
            "user": "associated_user_id"
        }
        ```
    - **Successful Response:**
        ```json
        {
            "_id": "hotel_id",
            "name": "hotel_name",
            "city": "hotel_city",
            "country": "hotel_country",
            "client": "associated_client_id",
            "user": "associated_user_id"
        }
        ```

- **📄 Get All Hotels**
    - **GET** `/api/hotels`
    - **Description:** Gets a list of all hotels.
    - **Successful Response:**
        ```json
        [
            {
                "_id": "hotel_id",
                "name": "hotel_name",
                "city": "hotel_city",
                "country": "hotel_country",
                "client": {
                    "name": "client_name"
                },
                "user": {
                    "userName": "username"
                }
            }
        ]
        ```

- **🔍 Get Hotel by ID**
    - **GET** `/api/hotels/:id`
    - **Description:** Gets details of a hotel by ID.
    - **Successful Response:**
        ```json
        {
            "_id": "hotel_id",
            "name": "hotel_name",
            "city": "hotel_city",
            "country": "hotel_country",
            "client": {
                "name": "client_name"
            },
            "user": {
                "userName": "username"
            }
        }
        ```

- **🔄 Update Hotel**
    - **PUT** `/api/hotels/:id`
    - **Description:** Updates hotel data.
    - **Body:** Fields to update.
    - **Successful Response:**
        ```json
        {
            "_id": "hotel_id",
            "name": "updated_hotel_name",
            "city": "updated_hotel_city",
            "country": "updated_hotel_country",
            "client": {
                "name": "client_name"
            },
            "user": {
                "userName": "username"
            }
        }
        ```

- **🗑️ Delete Hotel**
    - **DELETE** `/api/hotels/:id`
    - **Description:** Deletes a hotel by ID.
    - **Successful Response:**
        ```json
        {
            "message": "Hotel deleted successfully."
        }
        ```

## **🛠️ Technologies Used**

- **Node.js:** Server runtime environment.
- **Express:** Framework for building APIs.
- **MongoDB:** NoSQL database to store client and hotel data.
- **Mongoose:** ODM to interact with MongoDB easily.
- **JWT:** For user authentication.
