# **Simple Custom Content Management Platform**

It provides an essential structure that can be used in multiple small projects.

It features:

- It is based on Vue 3 and uses the composition API.
- It has tailwindcss for styling
- Uses the vue-router for routing.
- Uses pinia for state management.
- Supports multiple languages using the `vue-i18n` library.
- It has a basic layout with a sidebar and a topbar with menu options configured.
- It uses Firebase authentication and storage, and Firestore is used for data storage. It is using the `vuefire` library.

### Project Highlights

- Dynamic sidebar and topbar menu and pages
- Firebase authentication with sign-in, sign-up, password reset, and email verification.
- Custom emails in Firebase functions
- Required Profile information on sign-up
- Messaging system using Firebase Firestore

### TODO

- Switching from Firebase to [PocketBase](https://pocketbase.io) for data storage and authentication. This Go-based backend offers an excellent alternative to Firebase while providing an admin-friendly interface for data management.

### Running the Application

To run the application, follow these steps:

1. **Install Dependencies**:

   ```bash
   npm install
   cd function
   npm install
   ```

2. **Set Environment Variables**:
   Create a `.env` file in the root directory of your project and add the following variables:

   ```env
   VITE_APP_ID=debug
   VITE_APP_TITLE=Debug
   VITE_APP_DESCRIPTION='This is a placeholder description. Please update it in the .env file.'
   VITE_APP_PRIMARY_COLOR=be1e2d
   VITE_APP_PRIMARY_LIGHT_COLOR=f9bdbd
   VITE_APP_SECONDARY_COLOR=a97c50
   VITE_APP_PRIMARY_LOGO=logo-ecomoda-test.png
   VITE_APP_SECONDARY_LOGO=logo-eu.png
   VITE_APP_PROJECT_WEB_URL=https://www.wittyprogramming.dev/
   VITE_APP_FIREBASE_API_KEY=your_firebase_api_key
   VITE_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_APP_FIREBASE_APP_ID=your_firebase_app_id
   VITE_APP_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   VITE_APP_USE_FIREBASE_EMULATOR=false
   ```

   An `.env.example` is available.

   Create a `.env` file in the `functions` directory and add the following variables:

   ```env
   SMTP_USER = <your-smtp-user>
   SMTP_PASSWORD = <your-smtp-password>
   SMTP_SERVER = smtp.your-server.com
   SMTP_PORT = 587
   APP_DOMAIN = "debug.localhost"
   APP_NAME = "Debug"
   ```

   An `.env.example` is available.

3. **Run the Development Server**:
   Initially, it needs to run the function build before running the serve command.

   ```bash
   cd functions
   npm run build:watch
   ```

   Then, start the Firebase emulator

   ```bash
   npm run emulators:start
   ```

   And then run the serve command.

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

### Platform Configuration

For more configuration options, check the `src/helpers/site-settings.ts` and `src/helpers/navigation-menu.ts` files.

### Copyright Notice

© Zagor Solutions Ltd 2025. All rights reserved.

This code is not licensed for use, modification, or distribution without explicit permission from the copyright holder.
