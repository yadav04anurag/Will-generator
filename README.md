
## Setup and Installation

### Prerequisites

-   Node.js (v18 or higher)
-   MongoDB (a local instance or a cloud-hosted solution like MongoDB Atlas)
-   A Google Gemini API key

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2.  Install the necessary dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the `backend` directory by copying the `.env.example` file. Populate it with your specific credentials:
    ```
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    GEMINI_KEY=your_google_gemini_api_key
    PORT=5000
    ```

4.  Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2.  Install the necessary dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the `frontend` directory based on the `.env.example` file. Set the base URL for your backend API:
    ```
    VITE_API_BASE_URL=http://localhost:5000
    ```

4.  Start the frontend development server:
    ```bash
    npm run dev
    ```

5.  Open your browser and visit `http://localhost:5173` to view the application.

## Deployment

### Backend Deployment (on Vercel)

1.  Install the Vercel CLI globally:
    ```bash
    npm install -g vercel
    ```

2.  Navigate to the `backend` directory and run the deployment command:
    ```bash
    vercel
    ```

3.  Follow the on-screen prompts to complete the deployment.

### Frontend Deployment (on Vercel)

1.  Navigate to the `frontend` directory and run the deployment command:
    ```bash
    vercel
    ```

2.  Follow the on-screen prompts to complete the deployment.

## Environment Variables

### Backend (`.env`)

| Variable      | Description                               |
| ------------- | ----------------------------------------- |
| `MONGODB_URI` | The connection string for your MongoDB database. |
| `JWT_SECRET`  | A secret key used for signing JWT tokens. |
| `GEMINI_KEY`  | Your API key for the Google Gemini service. |
| `PORT`        | The port on which the backend server will run. |

### Frontend (`.env`)

| Variable            | Description                                  |
| ------------------- | -------------------------------------------- |
| `VITE_API_BASE_URL` | The base URL for making requests to the backend API. |

## Live Demo

🚀 **[View Live Demo on Vercel](https://willgenerator.vercel.app/)** 🚀

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
