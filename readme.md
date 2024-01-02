# IMS - Inventory Management System

The IMS is an easy-to-use tool that helps fashion businesses keep track of their stock. It shows how many items you have, their worth in market, and what you need to order. It's designed to work well with other systems, and it's built with up-to-date technology, so it can handle your business as it grows. The system is split into two parts - the part you interact with (frontend) and the part that works in the background (backend), making it easier to manage and fix if needed.

## System Requirements

For this project, you will need the following installed on your system:

- Node.js: Node.js is a JavaScript runtime that allows you to run JavaScript on your server. You can download Node.js from the [official website](https://nodejs.org/).

- MongoDB: MongoDB is a NoSQL database that provides high performance, high availability, and easy scalability. You can download MongoDB from the [official website](https://www.mongodb.com/).

Please ensure that you have these installed before proceeding with the installation of the IMS.

## Installation

To get started with IMS, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/bmqube/inventory-ms.git

   ```

2. **Navigate to the client folder (frontend):**

   ```bash
   cd inventory-ms/client

   ```

3. **Install dependencies:**

   ```bash
   npm install

   ```

4. **Navigate to the server folder (backend):**

   ```bash
   cd ../server

   ```

5. **Install server dependencies:**
   ```bash
   npm install
   ```

<br>

## Usage

1. **Run the backend:**

   ```bash
   npm start

   ```

Your backend server should be running on http://localhost:8000.

2. **Run the frontend:**

   ```bash
   cd ../client
   npm run build
   npm start

   ```

Open your browser and visit http://localhost:3000 to see the frontend in action.

<br>

## Tech Stack

- Frontend: Next.js
- Backend: Express.js
- DBMS: MongoDB
- Others: Nodemailer
