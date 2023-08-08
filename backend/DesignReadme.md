# Database and API Documentation

This readme document provides an overview of the databases and APIs utilized in the system.

## Databases 

### Admins
- The **admins** database stores information related to administrators. Initially, there will be only one admin.
  - **Functions**:
    - Approve restaurant registrations.
  - **Fields**:
    - Name
    - Username
    - Email
    - Password
    - Role

### Customers
- The **customers** database holds customer information. Customers can register, log in, follow restaurants, add restaurants to their favorites, search for restaurants, view restaurant details, menus, and manage their location settings.
  - **Functions**:
    - Follow restaurants
    - Add restaurants to favorites
    - Search for restaurants
    - View restaurant information
    - View restaurant menus
    - Manage location settings
  - **Fields**:
    - Name
    - Username
    - Email
    - Password
    - Role
    - Phone number

### Favorites
- The **favorites** database contains records of restaurants added to a customer's favorites list.
  - **Functions**: None (API restrictions apply)
  - **Fields**:
    - Customer reference
    - Restaurant place ID

### Pending Requests
- The **pending requests** database stores restaurant registration information pending approval by the admin.
  - **Functions**: 
    - Track pending requests
  - **Fields**:
    - Restaurant ID
    - Admin ID

### Restaurants
- The **restaurants** database stores restaurant information. Restaurants can register, log in, and require admin approval.
  - **Functions**: None (API restrictions apply)
  - **Fields**:
    - Name
    - Address
    - Username
    - Email
    - Password
    - Role
    - Phone number
    - Status

## APIs

### Common APIs

#### Admin Access (May be accessible by other user roles)

- **Register Admin**: Create a new admin account. (POST)
  - `/api/admins/`
- **Admin Login**: Authenticate admin credentials. (POST)
  - `/api/admins/login`
- **Get Admin Information**: Retrieve admin details. (GET)
  - `/api/admins/me`
- **Approve Restaurants**: Approve pending restaurant registrations. (PUT)
  - `/api/admins/approve/:id`
- **Get Pending Requests**: Retrieve pending restaurant registration requests. (GET)
  - `/api/admins/pending`

#### Customer Access (May be accessible by other user roles)

- **Register Customer**: Register a new customer account. (POST)
  - `/api/customers/`
- **Customer Login**: Authenticate customer credentials. (POST)
  - `/api/customers/login`
- **Get Customer Information**: Fetch customer details. (GET)
  - `/api/customers/me`
- **Add Favorite Restaurant**: Add a restaurant to favorites. (POST)
  - `/api/favorites/`
- **Get Favorite Restaurants**: Retrieve favorite restaurants. (GET)
  - `/api/favorites/`
- **Delete Favorite Restaurant**: Remove a restaurant from favorites. (DELETE)
  - `/api/favorites/:id`

#### Restaurant Access (May be accessible by other user roles)

- **Register Restaurant**: Register a new restaurant account. (POST)
  - `/api/restaurants/`
- **Restaurant Login**: Authenticate restaurant credentials. (POST)
  - `/api/restaurants/login`
- **Get Restaurant Information**: Retrieve restaurant details. (GET)
  - `/api/restaurants/me`

Please ensure to consult this documentation for accurate API usage and database field reference.