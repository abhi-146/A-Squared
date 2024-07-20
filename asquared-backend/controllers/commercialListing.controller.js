const CommercialListing = require('../models/CommercialListing'); // Update model name if needed

exports.createCommercialListing = async (req, res) => {
  try {
    const commercialListing = new CommercialListing(req.body); // Update model name
    await commercialListing.save();
    res.status(201).json(commercialListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createBulkCommercialListings = async (req, res) => {
  try {
    const commercialListings = req.body;

    if (!Array.isArray(commercialListings)) {
      return res.status(400).json({ error: 'Request body must be an array of commercial listings.' });
    }

    const createdListings = await CommercialListing.insertMany(commercialListings); // Update model name
    res.status(201).json(createdListings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAllCommercialListings = async (req, res) => {
  try {
    await CommercialListing.deleteMany({});
    res.status(200).json({ message: 'All commercial listings deleted successfully.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCommercialListings = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const page = parseInt(req.query.page) || 1;
    const city = req.query.city ? req.query.city.toLowerCase() : '';
    const skip = (page - 1) * limit;

    let query = CommercialListing.find(); // Update model name

    if (city) {
      query = query.where('location').regex(new RegExp(city, 'i'));
    }

    const commercialListings = await query.sort({ createdAt: -1 }).skip(skip).limit(limit).exec(); // Update model name
    const totalItems = await CommercialListing.countDocuments(city ? { location: { $regex: new RegExp(city, 'i') } } : {});

    res.status(200).json({
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      commercialListings
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCommercialListingById = async (req, res) => {
  try {
    const commercialListing = await CommercialListing.findById(req.params.id); // Update model name
    if (!commercialListing) return res.status(404).json({ error: 'CommercialListing not found' });
    res.status(200).json(commercialListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateCommercialListing = async (req, res) => {
  try {
    const commercialListing = await CommercialListing.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); // Update model name
    if (!commercialListing) return res.status(404).json({ error: 'CommercialListing not found' });
    res.status(200).json(commercialListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCommercialListing = async (req, res) => {
  try {
    const commercialListing = await CommercialListing.findByIdAndDelete(req.params.id); // Update model name
    if (!commercialListing) return res.status(404).json({ error: 'CommercialListing not found' });
    res.status(200).json({ message: 'CommercialListing deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.searchAndFilterCommercialListings = async (req, res) => {
  try {
    const {
      searchTerm, minBeds, minBaths, propertyType, minPrice, maxPrice, furnishing, minArea, maxArea
    } = req.body;

    const { page = 1 } = req.query;
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

    const commercialListings = await CommercialListing.find(filters)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalItems = await CommercialListing.countDocuments(filters);

    res.status(200).json({
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: parseInt(page),
      commercialListings
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.uploadImages = async (req, res) => {
  try {
    const commercialListingId = req.params.id; // Update variable name if needed

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

    const commercialListing = await CommercialListing.findById(commercialListingId); // Update model name
    if (!commercialListing) {
      return res.status(404).json({ error: 'CommercialListing not found' });
    }

    commercialListing.displayImages.push(...imageUrls);
    await commercialListing.save();

    res.status(200).json({
      message: 'Files uploaded and commercial listing updated successfully',
      files: req.files,
      commercialListing
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.deleteImage = async (req, res) => {
  try {
    const commercialListingId = req.params.id;
    const imageUrl = req.body.imageUrl;

    const commercialListing = await CommercialListing.findById(commercialListingId);
    if (!commercialListing) {
      return res.status(404).json({ error: 'CommercialListing not found' });
    }

    // Find the index of the image URL to delete
    const index = commercialListing.displayImages.indexOf(imageUrl);
    if (index === -1) {
      return res.status(404).json({ error: 'Image not found in commercial listing' });
    }

    // Remove the image URL from displayImages array
    commercialListing.displayImages.splice(index, 1);
    await commercialListing.save();

    res.status(200).json({
      message: 'Image deleted successfully',
      imageUrl,
      commercialListing
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
