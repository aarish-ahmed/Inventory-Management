
const logoutHandler = async (req, res) => {
    try {
        await res.clearCookie('Token')
        return res.status(201).json({
        message:'logout successful'
    })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "logoutHandler error",
        });
    }
};  
export default logoutHandler