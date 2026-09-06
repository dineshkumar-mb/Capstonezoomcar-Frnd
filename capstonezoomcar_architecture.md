# Capstone Zoomcar Clone - Architecture Diagram

Based on a review of both the `Capstonezoomcar-Frnd` and `Capstonezoomcar-Bknd` codebases, here is the system architecture for your full-stack MERN application.

## High-Level Architecture

The application follows a standard MERN (MongoDB, Express, React, Node.js) architecture with an integrated payment gateway (Stripe).

```mermaid
flowchart TB
    subgraph Client [Frontend: React Application (Vite)]
        direction TB
        UI[User Interface Components <br> React, Material UI, AntD, Bootstrap]
        Pages[Pages <br> Home, AdminHome, Booking, Auth]
        State[Global State <br> Redux Toolkit]
        Router[Routing <br> React Router DOM]
        API_Client[API Client <br> Axios]
        Stripe_Client[Payment UI <br> React Stripe.js]

        UI --> Pages
        Pages --> Router
        Pages --> State
        Pages <--> API_Client
        Pages --> Stripe_Client
    end

    subgraph Server [Backend: Node.js / Express API]
        direction TB
        App[Express App <br> server.js]
        Middleware[Middleware <br> CORS, JSON Parser]
        
        subgraph Routes [API Routes]
            UserRoute[/api/users/]
            CarRoute[/api/cars/]
            BookingRoute[/api/bookings/]
            PaymentRoute[/payment]
        end
        
        subgraph Models [Mongoose Data Models]
            UserModel[User Schema]
            CarModel[Car Schema]
            BookingModel[Booking Schema]
        end

        App --> Middleware
        Middleware --> Routes
        Routes --> Models
    end

    subgraph Database [Data Storage]
        MongoDB[(MongoDB <br> Cloud / Local)]
    end

    subgraph ExternalServices [External Services]
        Stripe[Stripe API <br> Payment Gateway]
    end

    %% Connections between major layers
    API_Client -- "HTTP GET/POST/PUT/DELETE" --> App
    Models -- "Mongoose ODM" --> MongoDB
    
    %% Stripe Integrations
    Stripe_Client -. "Tokenize Payment" .-> Stripe
    PaymentRoute -- "Create Checkout Session" --> Stripe
```

## Component Breakdown

### 1. Frontend (`Capstonezoomcar-Frnd`)
- **Framework:** React initialized with Vite for fast builds and hot-reloading.
- **State Management:** Redux Toolkit is used to manage global state across the app.
- **Routing:** Handled by `react-router-dom`. Provides access to key pages like `Home`, `AdminHome`, `Login`, `Register`, `BookingCar`, and CRUD operations for cars (`AddCar`, `EditCar`, `DeleteCar`).
- **Styling & UI:** A rich mix of UI libraries is utilized, including Material UI, Ant Design, React Bootstrap, and standard CSS.
- **API Communication:** `axios` handles all asynchronous requests to the backend server.
- **Payments:** Integrated with `@stripe/react-stripe-js` to securely collect payment details via `checkoutform.jsx`.

### 2. Backend (`Capstonezoomcar-Bknd`)
- **Framework:** Node.js with Express framework (`server.js`).
- **Routing:** Contains structured RESTful API endpoints for:
  - **Users** (`usersRoute.js`): Authentication (using `bcryptjs` for password hashing and JWT for session tokens) and user management.
  - **Cars** (`carsRoute.js`): Logic for fetching, adding, updating, and deleting cars.
  - **Bookings** (`bookingsRoute.js`): Managing vehicle reservations.
- **Payment Processing:** A dedicated `/payment` route interacts with the Stripe API to create secure checkout sessions.
- **Database Mapping:** Uses Mongoose to define schemas (`userModel.js`, `carModel.js`, `bookingModel.js`) and interface with MongoDB.

### 3. Database
- **MongoDB:** A NoSQL database that stores the persistent data. Relationships exist between Users, Cars, and Bookings (e.g., a Booking document referencing a specific User and Car ID).

### 4. External Integrations
- **Stripe:** Used securely on both the frontend (collecting card details) and backend (generating checkout sessions) to facilitate the car rental booking transactions.
