# Testimonials

**Testimonials** is a Next.js application designed to help users and companies gather feedback on their products and services. This platform allows users to submit feedback and companies to manage and view the collected feedback effectively.

## Features

- **User Authentication**: Secure login and registration with email/password and Google sign-in.
- **Feedback Collection**: Easy submission and management of feedback on products and services.
- **Dashboard**: User-friendly interface to view and manage feedback.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Database Integration**: Stores user data and feedback in a MongoDB database.
- **Security**: Utilizes JWT and OAuth for authentication and session management.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **React Hook Form**: Form management and validation.
- **Zod**: TypeScript-first schema validation.
- **NextAuth.js**: Authentication library.
- **Tailwind CSS**: Utility-first CSS framework.
- **MongoDB**: NoSQL database.
- **bcryptjs**: Password hashing library.
- **Axios**: HTTP requests library.

## Installation

To get started, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/testimonials.git
    ```

2. **Navigate into the project directory**:

    ```bash
    cd testimonials
    ```

3. **Install the dependencies**:

    ```bash
    npm install
    ```

4. **Set up environment variables**:

   Create a `.env.local` file in the root directory and add the following:

    ```env
    AUTH_SECRET=your-auth-secret
    NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
    NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=your-google-client-secret
    NEXTAUTH_SECRET=your-next-auth-secret
    MONGODB_URI=your-mongodb-connection-string
    ```

5. **Run the development server**:

    ```bash
    npm run dev
    ```

   Open `http://localhost:3000` in your browser to view the application.

## Usage

1. **Sign Up / Sign In**: Use email/password or Google to create an account or log in.
2. **Submit Feedback**: Access the feedback form to provide reviews on products and services.
3. **View Feedback**: Navigate to the dashboard to view and manage feedback submissions.

## Project Structure

- `pages/`: Contains route pages.
- `components/`: Reusable React components.
- `lib/`: Utility functions and database connection.
- `models/`: Mongoose schemas and models.
- `public/`: Static assets like images and fonts.
- `styles/`: Global styles and Tailwind CSS configuration.
- `schemas/`: Zod validation schemas.

## Contributing

We welcome contributions to the project! To contribute:

1. **Fork the repository**.
2. **Create a new branch**: `git checkout -b feature/your-feature`.
3. **Make your changes**.
4. **Commit your changes**: `git commit -am 'Add new feature'`.
5. **Push to your branch**: `git push origin feature/your-feature`.
6. **Create a Pull Request**.

Please follow coding guidelines and add tests for new features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [NextAuth.js](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [Axios](https://axios-http.com/)
