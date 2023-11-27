const { addSupplierToDb } = require("../services/inventory/supplier.js");

const handleNewSupplier = async (req, res) => {
  try {
    const { SupplierName, ContactInformation } = req.body;

    const newSupplier = await addSupplierToDb(SupplierName, ContactInformation);

    return res.status(201).json({ success: `New Supplier added with id: ${newSupplier}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `from Schedule Controller => ${err.message}` });
  }
};

module.exports = handleNewSupplier;
