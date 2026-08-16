import Product from "../../models/productModel.js";
import { Supplier } from "../../models/supplierModel.js";
import { Transaction } from "../../models/transactionModel.js";
import mongoose from "mongoose";

const dashboardHandler = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    // ==========================================
    // BASIC COUNTS
    // ==========================================

    const totalProducts = await Product.countDocuments({
     
    });

    const totalSuppliers = await Supplier.countDocuments({
     
    });

    const totalTransactions = await Transaction.countDocuments({
     
    });


    // ==========================================
    // SALES / REVENUE
    // ==========================================

    const salesData = await Transaction.aggregate([
      {
        $match: {
        
          trxType: "sale",
        },
      },

      {
        $group: {
          _id: null,

          totalRevenue: {
            $sum: {
              $toDouble: "$subtotal",
            },
          },

          totalUnitsSold: {
            $sum: {
              $toDouble: "$quantity",
            },
          },
        },
      },
    ]);

    const totalRevenue =
      salesData.length > 0
        ? salesData[0].totalRevenue
        : 0;

    const totalUnitsSold =
      salesData.length > 0
        ? salesData[0].totalUnitsSold
        : 0;


    // ==========================================
    // PURCHASE COST
    // ==========================================

    const purchaseData = await Transaction.aggregate([
      {
        $match: {
         
          trxType: "purchase",
        },
      },

      {
        $group: {
          _id: null,

          totalPurchaseCost: {
            $sum: {
              $toDouble: "$subtotal",
            },
          },
        },
      },
    ]);

    const totalPurchaseCost =
      purchaseData.length > 0
        ? purchaseData[0].totalPurchaseCost
        : 0;


    // ==========================================
    // LOW STOCK PRODUCTS
    // ==========================================
    // Calculate total stock across all warehouses.
    // A product is considered low stock when
    // its TOTAL stock is below 10.

    const lowStockData = await Product.aggregate([
      {
        $match: {
         
        },
      },

      {
        $project: {
          totalStock: {
            $sum: {
              $map: {
                input: {
                  $ifNull: ["$warehouses", []],
                },

                as: "warehouse",

                in: {
                  $toDouble: {
                    $ifNull: [
                      "$$warehouse.stock",
                      0,
                    ],
                  },
                },
              },
            },
          },
        },
      },

      {
        $match: {
          totalStock: {
            $lt: 10,
          },
        },
      },

      {
        $count: "count",
      },
    ]);

    const lowStockProduct =
      lowStockData.length > 0
        ? lowStockData[0].count
        : 0;


    // ==========================================
    // LAST 12 MONTHS
    // ==========================================

    const now = new Date();

    const twelveMonthsAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 11,
      1
    );


    // ==========================================
    // MONTHLY TRANSACTION DATA
    // ==========================================

    const monthlyTransactions =
      await Transaction.aggregate([
        {
          $match: {
           

            createdAt: {
              $gte: twelveMonthsAgo,
            },
          },
        },

        {
          $group: {
            _id: {
              year: {
                $year: "$createdAt",
              },

              month: {
                $month: "$createdAt",
              },

              type: "$trxType",
            },

            amount: {
              $sum: {
                $toDouble: "$subtotal",
              },
            },

            quantity: {
              $sum: {
                $toDouble: "$quantity",
              },
            },
          },
        },

        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]);


    // ==========================================
    // CREATE 12 MONTHS
    // ==========================================

    const monthly = [];

    for (let i = 11; i >= 0; i--) {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - i,
        1
      );

      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      const monthName = date.toLocaleString(
        "en-US",
        {
          month: "short",
        }
      );


      // Sale data for this month
      const sale = monthlyTransactions.find(
        (item) =>
          item._id.year === year &&
          item._id.month === month &&
          item._id.type === "sale"
      );


      // Purchase data for this month
      const purchase = monthlyTransactions.find(
        (item) =>
          item._id.year === year &&
          item._id.month === month &&
          item._id.type === "purchase"
      );


      monthly.push({
        month: monthName,

        revenue: sale
          ? sale.amount
          : 0,

        cost: purchase
          ? purchase.amount
          : 0,

        unitsSold: sale
          ? sale.quantity
          : 0,

        purchases: purchase
          ? purchase.amount
          : 0,
      });
    }


    // ==========================================
    // RECENT SALES
    // ==========================================

    const recentSales =
      await Transaction.find({
      
        trxType: "sale",
      })
        .sort({
          createdAt: -1,
        })
        .limit(5)
        .lean();


    // ==========================================
    // RECENT PURCHASES
    // ==========================================

    const recentPurchases =
      await Transaction.find({
       
        trxType: "purchase",
      })
        .sort({
          createdAt: -1,
        })
        .limit(5)
        .lean();


    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({

      summary: {
        totalProducts,
        totalSuppliers,
        totalTransactions,

        totalRevenue,

        totalPurchaseCost,

        totalUnitsSold,

        lowStockProduct,
      },

      monthly,

      recentSales,

      recentPurchases,
    });


  } catch (error) {

    console.error(
      "Dashboard error:",
      error
    );

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default dashboardHandler;