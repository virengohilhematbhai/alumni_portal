const Gallery = require('../../models/Gallery');

let inMemoryGalleryAdmin = [
  {
    id: 'gal-1',
    title: 'Grand Annual Alumni Reunion 2025',
    category: 'Reunions',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    uploader: 'Admin / Faculty',
    date: '2025-01-15',
    status: 'Published',
  },


];

const getGalleryAdmin = async (req, res) => {
  try {
    let dbItems = [];
    try {
      const docs = await Gallery.find().sort({ createdAt: -1 });
      dbItems = docs.map((item) => ({
        id: item._id.toString(),
        title: item.title,
        category: item.category,
        imageUrl: item.imageUrl,
        uploader: item.uploader,
        date: item.date || (item.createdAt ? item.createdAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]),
        status: item.status || 'Published',
      }));
    } catch (e) {
      console.log('MongoDB gallery fetch skipped:', e.message);
    }

    const existingIds = new Set(dbItems.map((i) => i.id));
    const filteredMemory = inMemoryGalleryAdmin.filter((i) => !existingIds.has(i.id));

    res.json([...dbItems, ...filteredMemory]);
  } catch (error) {
    console.error('Error fetching admin gallery:', error);
    res.status(500).json({ message: 'Failed to fetch admin gallery', error: error.message });
  }
};

const createGalleryItem = async (req, res) => {
  try {
    const { title, category, imageUrl, uploader } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ message: 'Image URL is required' });
    }

    let createdDoc = null;
    try {
      createdDoc = await Gallery.create({
        title: title || 'Campus Memory',
        category: category || 'Campus Life',
        imageUrl,
        uploader: uploader || (req.user ? req.user.name : 'Faculty Member'),
        date: new Date().toISOString().split('T')[0],
        status: 'Published',
      });
    } catch (e) {
      console.log('MongoDB Gallery create skipped:', e.message);
    }

    const newItem = {
      id: createdDoc ? createdDoc._id.toString() : `gal-${Date.now()}`,
      title: title || 'Campus Memory',
      category: category || 'Campus Life',
      imageUrl,
      uploader: uploader || (req.user ? req.user.name : 'Faculty Member'),
      date: new Date().toISOString().split('T')[0],
      status: 'Published',
    };

    inMemoryGalleryAdmin.unshift(newItem);
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating gallery item:', error);
    res.status(500).json({ message: 'Failed to add gallery image', error: error.message });
  }
};

const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    try {
      await Gallery.findByIdAndDelete(id);
    } catch (e) {
      // Ignored if non-Mongo ID
    }
    inMemoryGalleryAdmin = inMemoryGalleryAdmin.filter((item) => item.id !== id);
    res.json({ message: 'Gallery image deleted successfully', id });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    res.status(500).json({ message: 'Failed to delete gallery image', error: error.message });
  }
};

module.exports = {
  getGalleryAdmin,
  createGalleryItem,
  deleteGalleryItem,
};
