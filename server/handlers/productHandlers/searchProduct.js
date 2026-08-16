import Product from "../../models/productModel.js";

const searchProductHandler = async (req, res) => {
  try {
    const search = req.query.q?.trim();

    if (!search) {
      return res.status(200).json([]);
    }

    const products = await Product.find({
      user: req.user.id,
      $or: [
        {
          productname: {
            $regex: search,
            $options: "i",
          },
        },
        {
          sku: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    })
      .populate("supplier", "name")
      .limit(10);

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "searchProductHandler error",
    });
  }
};

export default searchProductHandler;