const BuyListing = require('../models/BuyListing'); // Update model name if needed

exports.createBuyListing = async (req, res) => {
  try {
    const buyListing = new BuyListing(req.body); // Update model name
    await buyListing.save();
    res.status(201).json(buyListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createBulkBuyListings = async (req, res) => {
  try {
    const buyListings = req.body;
    
    if (!Array.isArray(buyListings)) {
      return res.status(400).json({ error: 'Request body must be an array of buy listings.' });
    }

    const createdListings = await BuyListing.insertMany(buyListings); // Update model name
    res.status(201).json(createdListings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAllBuyListings = async (req, res) => {
  try {
    await BuyListing.deleteMany({});
    res.status(200).json({ message: 'All buy listings deleted successfully.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBuyListings = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const page = parseInt(req.query.page) || 1;
    const city = req.query.city ? req.query.city.toLowerCase() : ''; 
    const skip = (page - 1) * limit;

    let query = BuyListing.find(); // Update model name

    if (city) {
      query = query.where('location').regex(new RegExp(city, 'i'));
    }

    const buyListings = await query.sort({ createdAt: -1 }).skip(skip).limit(limit).exec(); // Update model name
    const totalItems = await BuyListing.countDocuments(city ? { location: { $regex: new RegExp(city, 'i') } } : {});

    res.status(200).json({
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      buyListings
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBuyListingById = async (req, res) => {
  try {
    const buyListing = await BuyListing.findById(req.params.id); // Update model name
    if (!buyListing) return res.status(404).json({ error: 'BuyListing not found' });
    res.status(200).json(buyListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateBuyListing = async (req, res) => {
  try {
    const buyListing = await BuyListing.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); // Update model name
    if (!buyListing) return res.status(404).json({ error: 'BuyListing not found' });
    res.status(200).json(buyListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBuyListing = async (req, res) => {
  try {
    const buyListing = await BuyListing.findByIdAndDelete(req.params.id); // Update model name
    if (!buyListing) return res.status(404).json({ error: 'BuyListing not found' });
    res.status(200).json({ message: 'BuyListing deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.searchAndFilterBuyListings = async (req, res) => {
  try {
    const { 
      searchTerm, minBeds, minBaths, propertyType, minPrice, maxPrice, furnishing, minArea, maxArea, community 
    } = req.body;

    const { page = 1 } = req.query;
    const limit = 10;
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

    const buyListings = await BuyListing.find(filters)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalItems = await BuyListing.countDocuments(filters);

    res.status(200).json({
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: parseInt(page),
      buyListings
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.uploadImages = async (req, res) => {
  try {
    const buyListingId = req.params.id; 

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

    const buyListing = await BuyListing.findById(buyListingId); 
    if (!buyListing) {
      return res.status(404).json({ error: 'BuyListing not found' });
    }

    buyListing.displayImages.push(...imageUrls);
    await buyListing.save();

    res.status(200).json({
      message: 'Files uploaded and buy listing updated successfully',
      files: req.files,
      buyListing
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.deleteImage = async (req, res) => {
  try {
    const buyListingId = req.params.id;
    const imageUrl = req.body.imageUrl;

    const buyListing = await BuyListing.findById(buyListingId);
    if (!buyListing) {
      return res.status(404).json({ error: 'BuyListing not found' });
    }

    // Find the index of the image URL to delete
    const index = buyListing.displayImages.indexOf(imageUrl);
    if (index === -1) {
      return res.status(404).json({ error: 'Image not found in buy listing' });
    }

    // Remove the image URL from displayImages array
    buyListing.displayImages.splice(index, 1);
    await buyListing.save();

    res.status(200).json({
      message: 'Image deleted successfully',
      imageUrl,
      buyListing
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
