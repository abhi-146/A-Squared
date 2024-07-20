const OffPlanListing = require('../models/OffPlanListing');

exports.createOffPlanListing = async (req, res) => {
  try {
    const {
      displayImages,
      title,
      rent,
      developer,
      location,
      community,
      baths,
      beds,
      area,
      lat,
      lon,
      city,
      information,
      description,
      paymentPlan,
      projectTimeline,
      units,
      masterplan,
      amenities
    } = req.body;

    // Create the OffPlanListing document
    const offPlanListing = new OffPlanListing({
      displayImages,
      title,
      rent,
      developer,
      location,
      community,
      baths,
      beds,
      area,
      lat,
      lon,
      city,
      information,
      description,
      paymentPlan,
      projectTimeline,
      units,
      masterplan,
      amenities
    });

    // Save the OffPlanListing document
    await offPlanListing.save();

    res.status(201).json(offPlanListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createOffPlanListingsBulk = async (req, res) => {
  try {
    const bulkData = req.body;
    const offPlanListings = await OffPlanListing.insertMany(bulkData);
    res.status(201).json(offPlanListings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOffPlanListings = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 9; 
    const page = parseInt(req.query.page) || 1;  
    const city = req.query.city ? req.query.city.toLowerCase() : ''; 
    const skip = (page - 1) * limit; 

    let query = OffPlanListing.find();

    // Apply city filter if specified
    if (city) {
      query = query.where('location').regex(new RegExp(city, 'i'));
    }

    // Execute query with pagination
    const offPlanListings = await query
      .sort({ createdAt: -1 }) 
      .skip(skip)          
      .limit(limit)       
      .exec();

    // Get total count of OffPlan Listings matching the query
    const totalItems = await OffPlanListing.countDocuments(city ? { city: { $regex: new RegExp(city, 'i') } } : {});

    // Calculate total pages based on total items and limit per page
    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      totalItems,
      totalPages,
      currentPage: page,
      offPlanListings
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.searchAndFilterOffPlanListings = async (req, res) => {
  try {
    const {
      searchTerm,
      minBeds,
      minBaths,
      propertyType,
      minPrice,
      maxPrice,
      furnishing,
      minArea,
      maxArea
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

    const offPlanListings = await OffPlanListing.find(filters)
    .sort({ createdAt: -1 }) 
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalItems = await OffPlanListing.countDocuments(filters);

    res.status(200).json({
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: parseInt(page),
      offPlanListings
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOffPlanListingById = async (req, res) => {
  try {
    const offPlanListing = await OffPlanListing.findById(req.params.id);
    if (!offPlanListing) return res.status(404).json({ error: 'OffPlanListing not found' });
    res.status(200).json(offPlanListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateOffPlanListing = async (req, res) => {
  try {
    const offPlanListing = await OffPlanListing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!offPlanListing) return res.status(404).json({ error: 'OffPlanListing not found' });
    res.status(200).json(offPlanListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteOffPlanListing = async (req, res) => {
  try {
    const offPlanListing = await OffPlanListing.findByIdAndDelete(req.params.id);
    if (!offPlanListing) return res.status(404).json({ error: 'OffPlanListing not found' });
    res.status(200).json({ message: 'OffPlanListing deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAllOffPlanListing = async (req, res) => {
  try {
    const offPlanListings = await OffPlanListing.deleteMany({});
    res.status(200).json({ message: `Successfully deleted ${offPlanListings.deletedCount} OffPlanListings` });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while deleting OffPlanListings' });
  }
};

exports.uploadDisplayImages = async (req, res) => {
  try {
    const offPlanListingId = req.params.id;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

    const offPlanListingItem = await OffPlanListing.findById(offPlanListingId);
    if (!offPlanListingItem) {
      return res.status(404).json({ error: 'OffPlan Listing not found' });
    }

    if (!offPlanListingItem.displayImages) {
      offPlanListingItem.displayImages = [];
    }

    offPlanListingItem.displayImages.push(...imageUrls);
    await offPlanListingItem.save();

    res.status(200).json({
      message: 'Files uploaded and OffPlan listing updated successfully',
      files: req.files,
      offPlanListingItem
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

exports.uploadMasterplanImages = async (req, res) => {
  try {
    const offPlanListingId = req.params.id;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

    const offPlanListingItem = await OffPlanListing.findById(offPlanListingId);
    if (!offPlanListingItem) {
      return res.status(404).json({ error: 'OffPlan Listing not found' });
    }

    offPlanListingItem.masterplan = offPlanListingItem.masterplan || [];
    offPlanListingItem.masterplan.push(...imageUrls);
    await offPlanListingItem.save();

    res.status(200).json({
      message: 'Masterplan images uploaded successfully',
      imageUrls,
      offPlanListingItem
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};


exports.uploadApartmentFloorImages = async (req, res) => {
  try {
    const offPlanListingId = req.params.id;
    console.log(offPlanListingId)

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

    const offPlanListingItem = await OffPlanListing.findById(offPlanListingId);
    if (!offPlanListingItem) {
      return res.status(404).json({ error: 'OffPlan Listing not found' });
    }

    const unit = offPlanListingItem.units.apartment;
    if (!unit) {
      return res.status(404).json({ error: 'Apartment unit not found' });
    }

    console.log(unit)

    unit.apartmentFloorImages = unit.apartmentFloorImages || [];
    unit.apartmentFloorImages.push(...imageUrls);
    await offPlanListingItem.save();

    res.status(200).json({
      message: 'Apartment floor images uploaded successfully',
      imageUrls,
      unit
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

exports.uploadPenthouseFloorImages = async (req, res) => {
  try {
    const offPlanListingId = req.params.id;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

    const offPlanListingItem = await OffPlanListing.findById(offPlanListingId);
    if (!offPlanListingItem) {
      return res.status(404).json({ error: 'OffPlan Listing not found' });
    }

    const unit = offPlanListingItem.units.penthouse;
    if (!unit) {
      return res.status(404).json({ error: 'Penthouse unit not found' });
    }

    unit.penthouseFloorImages = unit.penthouseFloorImages || [];
    unit.penthouseFloorImages.push(...imageUrls);
    await offPlanListingItem.save();

    res.status(200).json({
      message: 'Penthouse floor images uploaded successfully',
      imageUrls,
      unit
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

exports.uploadTownhouseFloorImages = async (req, res) => {
  try {
    const offPlanListingId = req.params.id;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

    const offPlanListingItem = await OffPlanListing.findById(offPlanListingId);
    if (!offPlanListingItem) {
      return res.status(404).json({ error: 'OffPlan Listing not found' });
    }

    const unit = offPlanListingItem.units.townhouse;
    if (!unit) {
      return res.status(404).json({ error: 'Townhouse unit not found' });
    }

    unit.townhouseFloorImages = unit.townhouseFloorImages || [];
    unit.townhouseFloorImages.push(...imageUrls);
    await offPlanListingItem.save();

    res.status(200).json({
      message: 'Townhouse floor images uploaded successfully',
      imageUrls,
      unit
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

exports.uploadDuplexFloorImages = async (req, res) => {
  try {
    const offPlanListingId = req.params.id;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

    const offPlanListingItem = await OffPlanListing.findById(offPlanListingId);
    if (!offPlanListingItem) {
      return res.status(404).json({ error: 'OffPlan Listing not found' });
    }

    const unit = offPlanListingItem.units.duplex;
    if (!unit) {
      return res.status(404).json({ error: 'Duplex unit not found' });
    }

    unit.duplexFloorImages = unit.duplexFloorImages || [];
    unit.duplexFloorImages.push(...imageUrls);
    await offPlanListingItem.save();

    res.status(200).json({
      message: 'Duplex floor images uploaded successfully',
      imageUrls,
      unit
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

exports.uploadVillaFloorImages = async (req, res) => {
  try {
    const offPlanListingId = req.params.id;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

    const offPlanListingItem = await OffPlanListing.findById(offPlanListingId);
    if (!offPlanListingItem) {
      return res.status(404).json({ error: 'OffPlan Listing not found' });
    }

    const unit = offPlanListingItem.units.villa;
    if (!unit) {
      return res.status(404).json({ error: 'Villa unit not found' });
    }

    unit.villaFloorImages = unit.villaFloorImages || [];
    unit.villaFloorImages.push(...imageUrls);
    await offPlanListingItem.save();

    res.status(200).json({
      message: 'Villa floor images uploaded successfully',
      imageUrls,
      unit
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};
