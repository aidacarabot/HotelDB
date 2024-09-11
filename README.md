# 🏨 HotelDB API

HotelDB API es un sistema de gestión de hoteles que permite la creación, actualización, eliminación y consulta de hoteles y clientes asociados. Este proyecto está construido con Node.js, Express y MongoDB, utilizando Mongoose para la gestión de la base de datos.

## ✨ **Características**

- 🏢 **Gestión de Hoteles:** CRUD (Crear, Leer, Actualizar, Eliminar) de hoteles.
- 👥 **Gestión de Clientes:** CRUD de clientes asociados a los hoteles.
- 🔒 **Autenticación y Autorización de Usuarios:** Control de acceso basado en roles (admin y user) con JWT para la autenticación.
- 🛠️ **Integración Sencilla:** Fácil integración con aplicaciones frontend.

## ⚙️ **Instalación**

1. **Clona este repositorio:**
    ```bash
    git clone https://github.com/aidact3/HotelDB.git
    ```
2. **Navega al directorio del proyecto:**
    ```bash
    cd HotelDB
    ```
3. **Instala las dependencias:**
    ```bash
    npm install
    ```
4. **Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:**
    ```
    DB_URL=mongodb://localhost:27017/hoteldb
    JWT_SECRET=your_jwt_secret
    ```

5. **Ejecuta el servidor:**
    ```bash
    npm start
    ```

## 📋 **Endpoints**

### **Usuarios**

- **🔐 Registro de Usuario**
    - **POST** `/api/users/register`
    - **Descripción:** Registra un nuevo usuario en el sistema.
    - **Body:**
        ```json
        {
            "userName": "nombre_de_usuario",
            "password": "contraseña"
        }
        ```
    - **Respuesta Exitosa:**
        ```json
        {
            "_id": "id_del_usuario",
            "userName": "nombre_de_usuario",
            "role": "user"
        }
        ```

- **🔓 Login de Usuario**
    - **POST** `/api/users/login`
    - **Descripción:** Inicia sesión en el sistema y devuelve un token JWT.
    - **Body:**
        ```json
        {
            "userName": "nombre_de_usuario",
            "password": "contraseña"
        }
        ```
    - **Respuesta Exitosa:**
        ```json
        {
            "user": {
                "_id": "id_del_usuario",
                "userName": "nombre_de_usuario"
            },
            "token": "token_jwt"
        }
        ```

- **🔄 Actualizar Rol de Usuario**
    - **PUT** `/api/users/role/:id`
    - **Descripción:** Actualiza el rol de un usuario (solo admins).
    - **Headers:** `Authorization: Bearer <token>`
    - **Body:**
        ```json
        {
            "role": "admin" // o "user"
        }
        ```
    - **Respuesta Exitosa:**
        ```json
        {
            "_id": "id_del_usuario",
            "userName": "nombre_de_usuario",
            "role": "admin"
        }
        ```

- **🗑️ Eliminar Usuario**
    - **DELETE** `/api/users/:id`
    - **Descripción:** Elimina un usuario (un admin puede eliminar cualquier usuario, un usuario puede eliminarse a sí mismo).
    - **Headers:** `Authorization: Bearer <token>`
    - **Respuesta Exitosa:**
        ```json
        {
            "message": "User deleted successfully."
        }
        ```

### **Clientes**

- **➕ Crear Cliente**
    - **POST** `/api/clients`
    - **Descripción:** Crea un nuevo cliente asociado a un usuario.
    - **Body:**
        ```json
        {
            "name": "nombre_del_cliente",
            "email": "email_del_cliente",
            "phone": "telefono_del_cliente",
            "user": "id_del_usuario_asociado"
        }
        ```
    - **Respuesta Exitosa:**
        ```json
        {
            "_id": "id_del_cliente",
            "name": "nombre_del_cliente",
            "email": "email_del_cliente",
            "phone": "telefono_del_cliente",
            "user": "id_del_usuario_asociado"
        }
        ```

- **📄 Obtener Todos los Clientes**
    - **GET** `/api/clients`
    - **Descripción:** Obtiene la lista de todos los clientes.
    - **Respuesta Exitosa:**
        ```json
        [
            {
                "_id": "id_del_cliente",
                "name": "nombre_del_cliente",
                "email": "email_del_cliente",
                "phone": "telefono_del_cliente",
                "user": {
                    "userName": "nombre_de_usuario"
                }
            },
            // Otros clientes...
        ]
        ```

- **🔍 Obtener Cliente por ID**
    - **GET** `/api/clients/:id`
    - **Descripción:** Obtiene los detalles de un cliente por su ID.
    - **Respuesta Exitosa:**
        ```json
        {
            "_id": "id_del_cliente",
            "name": "nombre_del_cliente",
            "email": "email_del_cliente",
            "phone": "telefono_del_cliente",
            "user": {
                "userName": "nombre_de_usuario"
            }
        }
        ```

- **🔄 Actualizar Cliente**
    - **PUT** `/api/clients/:id`
    - **Descripción:** Actualiza los datos de un cliente.
    - **Body:** Los campos que deseas actualizar.
    - **Respuesta Exitosa:**
        ```json
        {
            "_id": "id_del_cliente",
            "name": "nombre_del_cliente_actualizado",
            "email": "email_del_cliente_actualizado",
            "phone": "telefono_del_cliente_actualizado",
            "user": {
                "userName": "nombre_de_usuario"
            }
        }
        ```

- **🗑️ Eliminar Cliente**
    - **DELETE** `/api/clients/:id`
    - **Descripción:** Elimina un cliente por su ID.
    - **Respuesta Exitosa:**
        ```json
        {
            "message": "Client deleted successfully."
        }
        ```

### **Hoteles**

- **🏨 Crear Hotel**
    - **POST** `/api/hotels`
    - **Descripción:** Crea un nuevo hotel.
    - **Body:**
        ```json
        {
            "name": "nombre_del_hotel",
            "city": "ciudad_del_hotel",
            "country": "pais_del_hotel",
            "client": "id_del_cliente_asociado",
            "user": "id_del_usuario_asociado"
        }
        ```
    - **Respuesta Exitosa:**
        ```json
        {
            "_id": "id_del_hotel",
            "name": "nombre_del_hotel",
            "city": "ciudad_del_hotel",
            "country": "pais_del_hotel",
            "client": "id_del_cliente_asociado",
            "user": "id_del_usuario_asociado"
        }
        ```

- **📄 Obtener Todos los Hoteles**
    - **GET** `/api/hotels`
    - **Descripción:** Obtiene la lista de todos los hoteles.
    - **Respuesta Exitosa:**
        ```json
        [
            {
                "_id": "id_del_hotel",
                "name": "nombre_del_hotel",
                "city": "ciudad_del_hotel",
                "country": "pais_del_hotel",
                "client": {
                    "name": "nombre_del_cliente"
                },
                "user": {
                    "userName": "nombre_de_usuario"
                }
            },
            // Otros hoteles...
        ]
        ```

- **🔍 Obtener Hotel por ID**
    - **GET** `/api/hotels/:id`
    - **Descripción:** Obtiene los detalles de un hotel por su ID.
    - **Respuesta Exitosa:**
        ```json
        {
            "_id": "id_del_hotel",
            "name": "nombre_del_hotel",
            "city": "ciudad_del_hotel",
            "country": "pais_del_hotel",
            "client": {
                "name": "nombre_del_cliente"
            },
            "user": {
                "userName": "nombre_de_usuario"
            }
        }
        ```

- **🔄 Actualizar Hotel**
    - **PUT** `/api/hotels/:id`
    - **Descripción:** Actualiza los datos de un hotel.
    - **Body:** Los campos que deseas actualizar.
    - **Respuesta Exitosa:**
        ```json
        {
            "_id": "id_del_hotel",
            "name": "nombre_del_hotel_actualizado",
            "city": "ciudad_del_hotel_actualizado",
            "country": "pais_del_hotel_actualizado",
            "client": {
                "name": "nombre_del_cliente"
            },
            "user": {
                "userName": "nombre_de_usuario"
            }
        }
        ```

- **🗑️ Eliminar Hotel**
    - **DELETE** `/api/hotels/:id`
    - **Descripción:** Elimina un hotel por su ID.
    - **Respuesta Exitosa:**
        ```json
        {
            "message": "Hotel deleted successfully."
        }
        ```

## **🛠️ Tecnologías Utilizadas**

- **Node.js:** Entorno de ejecución para el servidor.
- **Express:** Framework para la creación de APIs.
- **MongoDB:** Base de datos NoSQL para almacenar los datos de los clientes y hoteles.
- **Mongoose:** ODM para interactuar con MongoDB de forma más sencilla.
- **JWT:** Para la autenticación de usuarios.