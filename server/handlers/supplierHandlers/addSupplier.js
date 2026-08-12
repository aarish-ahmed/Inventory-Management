import { Supplier } from "../../models/supplierModel.js";

const addSupplierHandler = async (req, res) => {
  try {
    const { name, address, contact } = req.body;

    const email = contact.email;
    const phone = contact.phone;

    const existingSupplier = await Supplier.findOne({
      user: req.user.id,
      $or: [
        {
          "contact.email": email,
        },
        {
          "contact.phone": phone,
        },
      ],
    });

    if (existingSupplier) {
      // Supplier exists but was soft-deleted
      if (!existingSupplier.isActive) {
        existingSupplier.isActive = true;
        existingSupplier.name = name;
        existingSupplier.address = address;
        existingSupplier.contact = contact;

        await existingSupplier.save();

        return res.status(200).json({
          message: "supplier reactivated successfully",
        });
      }

      // Supplier already exists and is active
      return res.status(409).json({
        message: "supplier already exist",
      });
    }

    const newSupplier = await Supplier.create({
      user: req.user.id,
      name,
      address,
      contact,
    });

    console.log(newSupplier);

    return res.status(200).json({
      message: "supplier added successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "addSupplierHandler error",
    });
  }
};

export default addSupplierHandler;