const { salesModel,getSalesModel } = require('../models/salesModel');
const colRef = getSalesModel();

// POST /sales
const doUploadSale = async (req, res) => {
  try {

    var salesObj = new colRef(req.body);
    const savedSale = await salesObj.save();
    res.status(201).json({ message: 'Sale uploaded successfully', sale: savedSale });

  } catch (error) {
    console.error('Error uploading sale:', error);
    res.status(500).json({ message: 'Server error while uploading sale' });
  }
};

async function doFetchAll(req, resp) {
  try {
    const { id } = req.params; // Assuming you're sending /route/:id

    const items = await colRef.find({ uploadedBy: id })
      .populate("product", "name")     // only populate the 'name' field of product
      .populate("employee", "name");   // only populate the 'name' field of employee

    resp.json(items);
  } catch (err) {
    console.error('Error fetching items:', err);
    resp.status(500).json({ message: 'Internal server error' });
  }
}


module.exports = { doUploadSale, doFetchAll};
