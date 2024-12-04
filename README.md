🌐 Referrify

This project involves creating a web application using Ruby on Rails (RoR) for the backend and React for the frontend, with Material-UI integrated for styling the React components.

Table of Contents 📑

    Features
    Prerequisites
    Technology Stack
    Getting Started
    Testing the Application
    API Endpoints

Features ✨

    🔐 Authentication.
    📧 Referral System.

Prerequisites 🛠️

To run this app locally, ensure you have the following installed:

    Ruby 3.0.0
    Rails 7.1.5
    PostgreSQL
    Node.js & Yarn
    Esbuild (for JavaScript bundling)

Technology Stack
RUBY

Installed ruby version

    Ruby 3.0.0: Programming language used in Rails development.
    with RVM
        \curl -sSL https://get.rvm.io -o rvm.sh
        rvm install ruby-3.0.0
    with rbenv
        curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash
        rbenv install rbenv-3.0.0

RAILS

Installed rails version

    Rails 7.1.5: Backend framework for web development.

Postgresql

Installed postgresql version

    Postgresql: Database management system.

### Getting Started 🚀

  1. Clone the repository:
  - git clone https://github.com/rishishinedev/Referrify

  2. `cd referrify`

  3. Run `bundle install`

  4. Run `yarn install`

  5. Run `rails assets:precompile`

  6. `create database.yml from example_database.yml and update the usename and password`

  7. Run `rails db:setup`

  8. Run `rails s`

## Testing the Application 🧪

### Running Tests
To run the test suite, use:
```bash
bundle exec rspec spec
```

## API Endpoints

 ### `POST \signup`
  #### Request URL -
    http://localhost:3000/api/v1/users
  #### Request BODY - 
    {
      "user": {
        "email": "johndoe@example.com",
        "password": "password123"
      }
    }
  #### Response -
    {
      "message": "Signed up successfully",
      "user": {
        "id": 1,
        "email": "johndoe@example.com",
        "created_at": "2024-12-04T09:05:19.693Z",
        "updated_at": "2024-12-04T09:05:19.693Z",
        "referral_code": "f8e96b72d59608ba40de"
      }
    }
 ### `POST \login`
  #### Request URL -
    http://localhost:3000/api/v1/users/sign_in
  #### Request BODY - 
    {
      "user": {
        "email": "johndoe@example.com",
        "password": "password123"
      }
    }

 ### `POST \referrals`
  #### Request URL -
    http://localhost:3000/api/v1/users/referrals
  #### Request BODY - 
    {
      recipient_email: "non-user@gmail.com"
    }
