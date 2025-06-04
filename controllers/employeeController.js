var {employeeModel,getEmployeeModel} = require('../models/employeeModel')
var colRef = getEmployeeModel();

async function doSaveEmployee(req,resp) {
    var empObj = new colRef(req.body);
    try{
        const savedDoc = await empObj.save();
        res.json({
            status: true,
            message: "Employee Added successfully",
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
  
  const doDeleteEmp = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedEmployee = await colRef.findByIdAndDelete(id);
  
      if (!deletedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.json({ message: 'Employee deleted successfully', deletedEmployee });
    } catch (err) {
      console.error('Error deleting employee:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const doUpdateEmp = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      const updatedEmployee = await colRef.findByIdAndUpdate(id, updates, {
        new: true, // returns the updated document
        runValidators: true, // validates against the schema
      });
  
      if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.json({ message: 'Employee updated successfully', updatedEmployee });
    } catch (err) {
      console.error('Error updating employee:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  

module.exports = {doSaveEmployee,doFetchAll,doDeleteEmp,doUpdateEmp}