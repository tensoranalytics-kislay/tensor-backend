# Playful Backend

A TypeScript-based Express.js backend server with MongoDB integration for handling contact form submissions.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure your environment:
   - Copy `config.example.env` to `.env`
   - Update the values in `.env` according to your needs
   - Ensure MongoDB is running and accessible

## Features

- Contact form submission API
- Data validation
- MongoDB integration
- TypeScript type safety

## Configuration

The application uses a configuration system located in `src/configs/`:

### App Configuration (`app.config.ts`)

- Environment settings
- Server configuration
- Rate limiting options

### Database Configuration (`database.config.ts`)

- MongoDB connection settings
- Connection pool settings
- Retry mechanism

### Authentication (`auth.config.ts`)

- JWT settings
- Password hashing options
- Token expiration times

### CORS Configuration (`cors.config.ts`)

- Origin settings
- Methods and headers
- Preflight options

### Logging Configuration (`logger.config.ts`)

- Log levels and formats
- File and console transport options
- Log rotation settings

## Environment Variables

The application uses environment variables for configuration. Here are the key categories:

### Application

- `NODE_ENV`: Application environment (development/production/test)
- `PORT`: Server port
- `HOST`: Server host
- `API_PREFIX`: API route prefix

### Database

- `DB_TYPE`: Database type (postgres/mysql/mongodb)
- `DB_HOST`: Database host
- `DB_PORT`: Database port
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password
- See `config.example.env` for more database options

### Security

- `JWT_SECRET`: JWT signing key
- `CORS_ORIGIN`: Allowed origins
- `PASSWORD_SALT_ROUNDS`: Password hashing rounds

### Logging

- `LOG_LEVEL`: Logging level (error/warn/info/debug)
- `LOG_FORMAT`: Log format (json/simple/detailed)
- See `config.example.env` for more logging options

For a complete list of all available configuration options, please refer to `config.example.env`.

## Development

To start the development server with hot-reload:

```bash
npm run dev
```

## Production

To build the project:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## API Endpoints

### Contact Form

- **POST /api/v1/contacts**: Submit a new contact form

### Other Endpoints

- **GET /api/v1/health**: System health check
- **GET /**: Welcome message

## MongoDB Schema

The contact form schema includes:

- Name (required)
- Email (required, validated)
- Company (optional)
- Contact Number (required, validated)
- Message (optional)
- Timestamps (automatic)

## API Example

### Submit a Contact Form

**Endpoint:** POST /api/v1/contacts

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "company": "Example Inc.",
  "contactNumber": "+1234567890",
  "message": "I would like to learn more about your services."
}
```

**Minimal Request Body:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "contactNumber": "+1234567890"
}
```

**Success Response:**

```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "company": "Example Inc.",
    "contactNumber": "+1234567890",
    "message": "I would like to learn more about your services.",
    "createdAt": "2023-08-15T10:30:40.123Z",
    "updatedAt": "2023-08-15T10:30:40.123Z"
  }
}
```
