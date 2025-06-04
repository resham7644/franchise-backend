var {productModel,getProductModel} = require('../models/productModel');
var colRef = getProductModel();

async function doSaveProduct(req,resp) {
    var proObj = new colRef(req.body);
    try{
        const savedDoc = await proObj.save();
        res.json({
            status: true,
            message: "Product Added successfully",
            doc: savedDoc
          });
    }
    catch(err){
        resp.json({status:false,msg:err.message});
    } 
}

async function doFetchAll(req, resp) {
    try {
      const { id } = req.params; // Assuming you're sending /route/:id

      const items = await colRef.find({ uploadedBy: id });
      resp.json(items);
    } catch (err) {
      console.error('Error fetching items:', err);
      resp.status(500).json({ message: 'Internal server error' });
    }
  }

const doDeleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedProduct = await colRef.findByIdAndDelete(id);
  
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.json({ message: 'Employee deleted successfully', deletedProduct });
    } catch (err) {
      console.error('Error deleting employee:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

 const doUpdateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      const updatedProduct = await colRef.findByIdAndUpdate(id, updates, {
        new: true, // returns the updated document
        runValidators: true, // validates against the schema
      });
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.json({ message: 'Employee updated successfully', updatedProduct });
    } catch (err) {
      console.error('Error updating employee:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = {doSaveProduct,doFetchAll,doDeleteProduct,doUpdateProduct}