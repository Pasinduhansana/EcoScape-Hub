# EcoScape Hub Backend

## Description

Backend API for EcoScape Hub - A sustainable landscaping platform that connects eco-conscious customers with professional landscaping services.

## Features

- User authentication and authorization
- Project portfolio management
- Service catalog management
- Booking system
- Contact forms and email notifications
- Blog content management
- RESTful API design
- Input validation and security

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Nodemailer for email
- Express Validator for input validation
- Helmet for security
- Rate limiting

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the `.env` file and update with your configuration:

   ```bash
   cp .env .env.local
   ```

4. Update environment variables in `.env`:

   - Set your MongoDB connection string
   - Configure email settings for notifications
   - Set a secure JWT secret
   - Update other configuration as needed

5. Start the development server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000/api`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Projects

- `GET /api/projects` - Get all projects (with filtering)
- `GET /api/projects/:id` - Get single project
- `GET /api/projects/featured/list` - Get featured projects
- `GET /api/projects/categories/list` - Get project categories
- `POST /api/projects` - Create project (Admin)
- `PUT /api/projects/:id` - Update project (Admin)
- `DELETE /api/projects/:id` - Delete project (Admin)

### Services

- `GET /api/services` - Get all services
- `GET /api/services/:slug` - Get single service
- `GET /api/services/featured/list` - Get featured services
- `GET /api/services/categories/list` - Get service categories
- `POST /api/services` - Create service (Admin)
- `PUT /api/services/:id` - Update service (Admin)
- `DELETE /api/services/:id` - Delete service (Admin)

### Bookings

- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get single booking
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id/status` - Update booking status (Admin)
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `GET /api/bookings/admin/all` - Get all bookings (Admin)

### Contact

- `POST /api/contact` - Submit contact form
- `GET /api/contact/info` - Get contact information
- `POST /api/contact/newsletter` - Subscribe to newsletter

### Blog

- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:slug` - Get single blog post
- `GET /api/blog/featured/list` - Get featured posts
- `GET /api/blog/categories/list` - Get blog categories
- `GET /api/blog/search/:query` - Search blog posts

## Environment Variables

| Variable       | Description               | Default                                |
| -------------- | ------------------------- | -------------------------------------- |
| `NODE_ENV`     | Environment mode          | development                            |
| `PORT`         | Server port               | 5000                                   |
| `MONGODB_URI`  | MongoDB connection string | mongodb://localhost:27017/ecoscape_hub |
| `JWT_SECRET`   | JWT signing secret        | Required                               |
| `EMAIL_HOST`   | SMTP host                 | smtp.gmail.com                         |
| `EMAIL_PORT`   | SMTP port                 | 587                                    |
| `EMAIL_USER`   | SMTP username             | Required                               |
| `EMAIL_PASS`   | SMTP password             | Required                               |
| `FRONTEND_URL` | Frontend URL for CORS     | http://localhost:3000                  |

## Security Features

- Helmet for security headers
- Rate limiting to prevent abuse
- Input validation and sanitization
- JWT token authentication
- Password hashing with bcrypt
- CORS configuration

## Development

### Running in Development

```bash
npm run dev
```

### Running in Production

```bash
npm start
```

### Testing

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License
