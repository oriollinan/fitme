# FitMe - Fitness App

Welcome to the **FitMe** GitHub repository! This project is a cross-platform fitness application designed using **Flutter** for the frontend and **NestJS** for the backend. The app offers personalized workout plans, fitness tracking, and integration with various health data services.

## Table of Contents

- [Getting Started](#getting-started)
- [Backend](#backend)
- [Dev Container](#dev-container)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Testing](#testing)
- [Support](#support)
- [Stay in Touch](#stay-in-touch)
- [License](#license)

---

## Getting Started

This project is divided into two main parts:
- **Flutter Frontend**: Mobile app for users to track workouts, manage goals, and access fitness-related insights.
- **NestJS Backend**: Provides a robust API for the app, handles data storage, authentication, and integrates with third-party fitness APIs.

A few resources to help you get started with Flutter development:
- [Flutter documentation](https://docs.flutter.dev/)
- [Cookbook: Flutter useful samples](https://docs.flutter.dev/cookbook)

For NestJS, you can check out:
- [NestJS Documentation](https://docs.nestjs.com/)

---

## Backend

The NestJS backend for this app provides the API for fitness tracking and user management. You'll need a `.env` file to configure the environment variables required by the app. Check the `docker-compose.yml` file for a list of necessary environment variables.

### Running the API
- Start the backend in development mode using Docker or by running `npm run start:dev`.
- Access the API documentation at `/api/swagger`.

---

## Dev Container

This project comes with a development container setup to simplify working with the application. You need to have Docker and Docker Compose installed.

Steps to start:
1. Clone the repository.
2. Open the project in your IDE.
3. Use the option "Re-Open Folder in Dev Container" to get started with the pre-configured dev environment.

---

## Installation

To set up the project locally, follow these steps:

### Frontend
1. Install the Flutter SDK by following the instructions [here](https://flutter.dev/docs/get-started/install).
2. Run the following command to install dependencies:
   ```bash
    flutter pub get
   ```

### Backend
1. Navigate to the backend directory:
   ```bash
    cd fitness-backend
   ```
2. Install the dependencies
   ```bash
    npm i
   ```

## Running the App

### Frontend
   ```bash
    flutter run
   ```

### Backend
   ```bash
    # development mode
    npm run start:dev

    # production mode
    npm run start:prod
   ```

## Testing

### Frontend
You can run Flutter tests with:
   ```bash
    flutter test
   ```

### Backend
You can run the following command to test the API:
   ```bash
    # unit test
    npm run test

    # end-to-end tests
    npm run test:e2e

    # test coverage
    npm run test:cov
   ```

## Support
This project is open-source and licensed under the MIT License. If you'd like to support this project, feel free to contribute or check out ways to help out.
