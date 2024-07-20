const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const uploadRoutes = require('./routes/upload.route');

const offPlanListingRoutes = require('./routes/offPlanListing.route');
const rentalListingRoutes = require('./routes/rentalListing.route');
const commercialListingRoutes = require('./routes/commercialListing.route');
const userRoutes = require('./routes/user.route');
const tourRequestRoutes = require('./routes/tourRequest.route');
const newsletterRoutes = require('./routes/newsletter.route');
const buyListingRoutes = require('./routes/buyListing.route');
const contactUsUsersRouter = require('./routes/contactUsUsers.route');
const blogRouter = require('./routes/blog.route');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Enable CORS
app.use(cors());

// Static folder for serving uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/offplanlistings', offPlanListingRoutes);
app.use('/api/rentallistings', rentalListingRoutes);
app.use('/api/buylistings', buyListingRoutes);
app.use('/api/commerciallistings', commercialListingRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/tourrequests', tourRequestRoutes); 
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contactUsUsers', contactUsUsersRouter);
app.use('/api/blogs', blogRouter);

// Use the upload routes
app.use('/api', uploadRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
