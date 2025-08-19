# EcoScape Hub - Sustainable Landscaping Platform

EcoScape Hub is a comprehensive web application for sustainable landscaping services, featuring eco-friendly garden design, native plant landscaping, organic maintenance, and environmental consultation services.

## 🌱 Project Overview

EcoScape Hub connects environmentally conscious clients with sustainable landscaping professionals. The platform offers a complete solution for managing landscaping projects, booking services, and promoting eco-friendly practices.

### Key Features

- **Sustainable Services**: Native plant landscaping, organic lawn care, rain gardens, and eco-friendly consultation
- **Project Portfolio**: Showcase of completed sustainable landscaping projects
- **Online Booking**: Easy booking system for landscaping services
- **User Dashboard**: Personal dashboard for managing bookings and projects
- **Educational Content**: Blog and resources about sustainable landscaping practices
- **Contact System**: Professional contact forms and business information

## 🛠️ Technology Stack

### Backend

- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Nodemailer** for email functionality
- **Multer** for file uploads
- **Express Validator** for input validation
- **Rate limiting** and security middleware

### Frontend

- **React 19** with modern hooks
- **Vite** for fast development and building
- **Tailwind CSS** for modern, responsive design
- **Framer Motion** for smooth animations
- **React Router** for navigation
- **Axios** for API communication
- **React Icons** for consistent iconography

## 📁 Project Structure

```
EcoScape-Hub/
├── Backend/
│   ├── models/           # Database models (User, Project, Service, Booking)
│   ├── routes/           # API routes (auth, projects, services, bookings, contact, blog)
│   ├── middleware/       # Authentication and security middleware
│   ├── server.js         # Main server file
│   ├── package.json      # Backend dependencies
│   └── .env             # Environment variables
├── Frontend/
│   ├── src/
│   │   ├── components/   # Reusable components (Layout, LoadingSpinner, etc.)
│   │   ├── context/      # React Context (AuthContext)
│   │   ├── pages/        # Page components (Home, About, Services, Projects, etc.)
│   │   ├── utils/        # Utility functions and constants
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # React entry point
│   ├── public/           # Static assets
│   ├── package.json      # Frontend dependencies
│   └── vite.config.js    # Vite configuration
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/EcoScape-Hub.git
   cd EcoScape-Hub
   ```

2. **Backend Setup**

   ```bash
   cd Backend
   npm install
   ```

3. **Frontend Setup**

   ```bash
   cd ../Frontend
   npm install --legacy-peer-deps
   ```

4. **Environment Configuration**

   Create and configure the `.env` file in the Backend directory:

   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/ecoscape-hub

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d

   # Email Configuration
   EMAIL_FROM=noreply@ecoscapehub.com
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password

   # Frontend URL
   CLIENT_URL=http://localhost:5173
   ```

5. **Database Setup**

   Make sure MongoDB is running locally or set up MongoDB Atlas and update the `MONGODB_URI` in your `.env` file.

### Running the Application

1. **Start the Backend Server**

   ```bash
   cd Backend
   npm start
   ```

   The backend will run on http://localhost:5000

2. **Start the Frontend Development Server**
   ```bash
   cd Frontend
   npm run dev
   ```
   The frontend will run on http://localhost:5173

## 📱 Application Features

### Public Pages

- **Home**: Hero section, services overview, testimonials, and statistics
- **About**: Company information, mission, team, and timeline
- **Services**: Detailed service listings with booking options
- **Projects**: Portfolio of completed projects with filtering
- **Contact**: Contact form, business information, and location

### Authenticated Features

- **User Registration/Login**: Secure authentication system
- **Dashboard**: Personal dashboard with booking management
- **Service Booking**: Online booking system for landscaping services
- **Profile Management**: User profile and preferences

### Admin Features (Future Enhancement)

- **Project Management**: Add, edit, and manage projects
- **Service Management**: Manage service offerings and pricing
- **User Management**: Manage user accounts and permissions
- **Analytics**: Business insights and reporting

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Projects

- `GET /api/projects` - Get all projects (with filtering)
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project (admin)
- `PUT /api/projects/:id` - Update project (admin)

### Services

- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create new service (admin)
- `PUT /api/services/:id` - Update service (admin)

### Bookings

- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Contact

- `POST /api/contact` - Send contact form
- `POST /api/contact/newsletter` - Newsletter subscription

## 🎨 Design System

### Colors

- **Primary Green**: #16A34A (Sustainable/Nature theme)
- **Secondary Blue**: #3B82F6 (Trust/Professional)
- **Accent Colors**: Various shades for different states

### Typography

- **Font Family**: System fonts for performance
- **Headings**: Bold, large typography for impact
- **Body**: Clean, readable typography

### Components

- **Responsive Design**: Mobile-first approach
- **Animations**: Smooth Framer Motion animations
- **Icons**: React Icons for consistency
- **Forms**: Clean, accessible form designs

## 🌿 Sustainability Focus

### Environmental Features

- **Native Plant Database**: Information about local native plants
- **Carbon Footprint Tracking**: Track environmental impact of projects
- **Eco-Friendly Practices**: Promotion of sustainable landscaping methods
- **Educational Content**: Blog posts about sustainable practices

### Business Impact

- **Reduced Water Usage**: Water-efficient landscaping designs
- **Biodiversity Support**: Native plant gardens for local wildlife
- **Soil Health**: Organic and chemical-free maintenance practices
- **Waste Reduction**: Sustainable material usage and recycling

## 📈 Future Enhancements

### Technical Improvements

- **Real-time Chat**: Customer support chat system
- **Payment Integration**: Stripe/PayPal payment processing
- **Image Gallery**: Advanced image upload and management
- **Mobile App**: React Native mobile application
- **Progressive Web App**: PWA capabilities

### Business Features

- **Subscription Services**: Recurring maintenance subscriptions
- **Referral Program**: Customer referral system
- **Loyalty Points**: Reward system for repeat customers
- **Advanced Analytics**: Business intelligence dashboard
- **Multi-language Support**: Internationalization

### Sustainability Features

- **Carbon Calculator**: Calculate project carbon impact
- **Plant Care Guide**: Comprehensive plant care information
- **Weather Integration**: Weather-based service recommendations
- **Seasonal Planning**: Automated seasonal service suggestions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@ecoscapehub.com or create an issue in the GitHub repository.

## 🙏 Acknowledgments

- **Unsplash**: Beautiful nature photography
- **React Community**: Amazing tools and libraries
- **Tailwind CSS**: Excellent utility-first CSS framework
- **MongoDB**: Reliable database solution
- **Vercel/Netlify**: Deployment platforms

---

**EcoScape Hub** - Creating beautiful, sustainable landscapes for a better tomorrow 🌱
