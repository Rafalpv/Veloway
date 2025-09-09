# Veloway 🚴‍♂️

<img width="350" height="229" alt="logo_veloway" src="https://github.com/user-attachments/assets/fee1da05-6b0c-4226-b158-e97a877b98fb" />


Veloway is a **service-based platform for cycling route management** that combines route planning, performance analysis, and social features.  
Its main innovation is the integration of a **microservices architecture** with **generative AI** to simplify route creation and personalization.

<table width="100%">
  <tr>
    <td width="33%" align="center">
      <img width="1920" height="1080" alt="Login" src="https://github.com/user-attachments/assets/c363c7f4-723b-4f3f-858f-25d50fa7d9cd" />
    </td>
    <td width="33%" align="center">
      <img width="1920" height="1080" alt="Admin" src="https://github.com/user-attachments/assets/95da7dd8-985c-45e7-8884-9f0bd05a8618" />
    </td>
    <td width="33%" align="center">
    <img width="1920" height="1080" alt="MisRutas" src="https://github.com/user-attachments/assets/2fd6ce62-3e05-4897-bd77-452244ffe258" />
    </td>
  </tr>
  <tr>
    <td width="33%" align="center">
      <img width="1920" height="1080" alt="CrearRuta" src="https://github.com/user-attachments/assets/2e371610-3a5b-4cd2-8dfd-90dc95ec35e0" />
    </td>
    <td width="33%" align="center">
      <img width="1920" height="1080" alt="CrearRuta2" src="https://github.com/user-attachments/assets/55a5db92-b555-46c0-8cef-9501fa950c08" />
    </td>
    <td width="33%" align="center">
      <img width="1920" height="1080" alt="SaveRuta" src="https://github.com/user-attachments/assets/01c2d961-e2b0-4cb3-bb4b-625c659cf639" />
    </td>
  </tr>
  <tr>
    <td width="33%" align="center">
      <img width="1920" height="1080" alt="ModoOscuro" src="https://github.com/user-attachments/assets/98879162-6119-4f7c-9ce5-4569be40df9a" />
    </td>
    <td width="33%" align="center">
    <img width="1920" height="1080" alt="RegistrarActividad" src="https://github.com/user-attachments/assets/9d215a6c-73fd-4c2c-b5d0-ea7d71a89fc4" />
    </td>
    <td width="33%" align="center">
    <img width="1920" height="1080" alt="MisActividades" src="https://github.com/user-attachments/assets/7ad3f1bf-b1bb-44b1-9d22-ac9b8aa7872e" />
    </td>
  </tr>
</table>


With Veloway, cyclists can:
- Create and customize routes using an interactive map.
- Generate routes automatically by interacting with an **AI-powered chat** in natural language.
- Analyze and track their cycling activities (distance, time, elevation, speed, etc.).
- Share routes with the community and explore recommendations.

---

## 🚀 Features

- **Microservices architecture** for modularity and scalability.
- **REST API** for communication between services.
- **AI integration** using OpenAI API for conversational route generation.
- **Google Maps API** for geospatial data and route visualization.
- **Frontend** built with React for an intuitive user interface.
- **Backend** powered by Node.js + Express with Sequelize for database management.

---

## 🛠️ Tech Stack

- **Frontend:** React, TailwindCSS  
- **Backend:** Node.js, Express, Sequelize, Swagger
- **Database:** PostgreSQL, MongoDB (can be adapted to other SQL engines) 
- **APIs:** Google Maps API, OpenAI API  
- **Architecture:** Microservices + API Gateway  
- **Containerization (optional):** Docker  

---

## ⚙️ Installation & Setup (Local)

Veloway is structured as a **monorepo with multiple packages** (frontend, backend, etc.).  
This means that dependencies for all services can be installed and managed directly from the project root.

Follow these steps to run Veloway locally on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/veloway.git
cd veloway
```

### 2. Install Dependencies
```bash
npm run install
```

### 3. Run the project
```bash
npm run dev
```
This will start:
    Frontend → http://localhost:5137
    Backend →  http://localhost:3000

#### 3.1 Running Individual Microservices

To run each microservice separately (useful for debugging or development in isolation), you can navigate to the server folder and start them individually:and to start each microservice separated

```bash
cd ./server
npm run dev-auth
npm run dev-users
npm run dev-routes
npm run dev-act
```
Each microservice will run on its own port, managed through your .env configuration.

### 4. Environment Variables

This project uses a `.env` file to store sensitive configuration values.  
Create a `.env` file in the root directory and define the following variables:

- `PORT` – Port where the server will run (e.g., `3000`)  
- `DB_HOST` – Database host  
- `DB_USER` – Database username  
- `DB_PASSWORD` – Database password  
- `DB_NAME` – Database name  
- `JWT_SECRET` – Secret key for authentication tokens  
- `API_KEY` – (if applicable, e.g., for external services)

> ⚠️ Never commit your `.env` file to the repository. Instead, use a `.env.example` file as a template.
