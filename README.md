# Mehbang-CRUD-Angular


## Prerequisites

- Node.js (v18 or later)
- Angular CLI (v16)

## Installation

1. Clone the repository:
- `git clone https://github.com/noonhe/Mehbang-CRUD-Angular.git` 

2. Install dependencies:
- `npm install`

3. run the code:
- `ng serve`

## Environment Setup

The project uses environment files to manage configuration for different environments. You can find these files in the `src/environments` directory.

- `environment.ts`: Development environment configuration
- `environment.staging.ts`: Staging environment configuration
- `environment.prod.ts`: Production environment configuration

To use environment variables:

1. Set the variables in the appropriate environment file:
```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://dummy.restapiexample.com/api/v1',
  showErrorDescriptions: true
};
```

## Building for Production
To build the application for production:
`build --prod`
The build artifacts will be stored in the `dist/` directory.


## Project Structure

- @shell\Shell module : contains the main layout and header of the app
- @features\Employee module : contains add/update , employeeList and employeeDetail components
- @data folder contains services and shared data
- @styles folder contains shared styles
- @models folder contains emploee data models (types and interfaces) used in the app

## Branches

this project has three brances : main , staging and development