import {User} from "../../models/userModel.js";

const deleteUserHandler = async (req, res) => {
  try {
    const userId = req.params.id;
   

    // Only admin can delete users
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can delete users",
      });
    }

    // Prevent admin from deleting themselves
    if (userId === req.user.id.toString()) {

      return res.status(400).json({
        message: "You cannot delete your own account",
      });
    }

    // Find user
    const user = await User.findById(userId);
    

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Delete user
    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      message: "User deleted successfully",
    });

  } catch (error) {
    console.error("Delete user error:", error);

    return res.status(500).json({
      message: "Failed to delete user",
    });
  }
};

export default deleteUserHandler;