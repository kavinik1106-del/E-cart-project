import AdminCustomer from "../models/admin.model.js";


// Get all customers (Admin)
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await AdminCustomer.findAll({
      attributes: { exclude: ["password"] }, // hide password
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ success: true, customers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single customer by ID
export const getCustomerById = async (req, res) => {
  try {
    const customer = await AdminCustomer.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });

    if (!customer) {
      return res.status(404).json({ success: false, error: "Customer not found" });
    }

    res.status(200).json({ success: true, customer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete customer (Admin)
export const deleteCustomer = async (req, res) => {
  try {
    const customer = await AdminCustomer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json({ success: false, error: "Customer not found" });
    }

    await customer.destroy();
    res.status(200).json({ success: true, message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
