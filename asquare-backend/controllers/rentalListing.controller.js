const RentalListing = require('../models/RentalListing');

exports.createRentalListing = async (req, res) => {
  try {
    const rentalListing = new RentalListing(req.body);
    await rentalListing.save();
    res.status(201).json(rentalListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createBulkRentalListings = async (req, res) => {
  try {
    const rentalListings = req.body;
    
    if (!Array.isArray(rentalListings)) {
      return res.status(400).json({ error: 'Request body must be an array of rental listings.' });
    }

    const createdListings = await RentalListing.insertMany(rentalListings);
    res.status(201).json(createdListings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAllRentalListings = async (req, res) => {
  try {
    await RentalListing.deleteMany({});
    res.status(200).json({ message: 'All rental listings deleted successfully.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



exports.getRentalListings = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const city = req.query.city ? req.query.city.toLowerCase() : ''; 
    const skip = (page - 1) * limit;

    let query = RentalListing.find();

    if (city) {
      query = query.where('location').regex(new RegExp(city, 'i'));
    }

    const rentalListings = await query.sort({ createdAt: -1 }).skip(skip).limit(limit).exec();
    const totalItems = await RentalListing.countDocuments(city ? { location: { $regex: new RegExp(city, 'i') } } : {});

    res.status(200).json({
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      rentalListings
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



exports.getRentalListingById = async (req, res) => {
  try {
    const rentalListing = await RentalListing.findById(req.params.id);
    if (!rentalListing) return res.status(404).json({ error: 'RentalListing not found' });
    res.status(200).json(rentalListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateRentalListing = async (req, res) => {
  try {
    const rentalListing = await RentalListing.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!rentalListing) return res.status(404).json({ error: 'RentalListing not found' });
    res.status(200).json(rentalListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteRentalListing = async (req, res) => {
  try {
    const rentalListing = await RentalListing.findByIdAndDelete(req.params.id);
    if (!rentalListing) return res.status(404).json({ error: 'RentalListing not found' });
    res.status(200).json({ message: 'RentalListing deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.searchAndFilterRentalListings = async (req, res) => {
  try {
    const { 
      searchTerm, minBeds, minBaths, propertyType, minPrice, maxPrice, furnishing, minArea, maxArea , community
    } = req.body;

    const { page = 1, limit=10 } = req.query;

    let filters = {};

    if (searchTerm) {
      filters.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { location: { $regex: searchTerm, $options: 'i' } },
        { community: { $regex: searchTerm, $options: 'i' } },
        { 'developer.title': { $regex: searchTerm, $options: 'i' } }
      ];
    }

    if (minBeds) {
      filters.beds = { $gte: Number(minBeds) };
    }
    if (minBaths) {
      filters.baths = { $gte: Number(minBaths) };
    }
    if (propertyType) {
      filters.propertyType = propertyType;
    }
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) {
        filters.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        filters.price.$lte = Number(maxPrice);
      }
    }
    if (furnishing) {
      filters.furnishing = { $regex: furnishing, $options: 'i' };
    }
    if (minArea || maxArea) {
      filters.area = {};
      if (minArea) {
        filters.area.$gte = Number(minArea);
      }
      if (maxArea) {
        filters.area.$lte = Number(maxArea);
      }
    }
    if (community) {
      const formattedCommunity = community.replace(/_/g, ' ');
      filters.community = { $regex: formattedCommunity, $options: 'i' };
    }

    const rentalListings = await RentalListing.find(filters)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalItems = await RentalListing.countDocuments(filters);

    res.status(200).json({
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: parseInt(page),
      rentalListings
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.uploadImages = async (req, res) => {
  try {
    const rentalListingId = req.params.id;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

    const rentalListing = await RentalListing.findById(rentalListingId);
    if (!rentalListing) {
      return res.status(404).json({ error: 'RentalListing not found' });
    }

    rentalListing.displayImages.push(...imageUrls); 
    await rentalListing.save();

    res.status(200).json({
      message: 'Files uploaded and rental listing updated successfully',
      files: req.files,
      rentalListing
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.deleteImage = async (req, res) => {
  try {
    const rentalListingId = req.params.id;
    const imageUrl = req.body.imageUrl;

    const rentalListing = await RentalListing.findById(rentalListingId);
    if (!rentalListing) {
      return res.status(404).json({ error: 'RentalListing not found' });
    }

    // Find the index of the image URL to delete
    const index = rentalListing.displayImages.indexOf(imageUrl);
    if (index === -1) {
      return res.status(404).json({ error: 'Image not found in rental listing' });
    }

    // Remove the image URL from displayImages array
    rentalListing.displayImages.splice(index, 1);
    await rentalListing.save();

    res.status(200).json({
      message: 'Image deleted successfully',
      imageUrl,
      rentalListing
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
