import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/Doctorschema.js";

export const updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedUser,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to update user" });
    }
};

export const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to delete user" });
    }
};

export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User found", data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch user" });
    }
};

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json({ success: true, message: "Users found", data: users });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch users" });
    }
};

export const getUserProfile = async (req, res) => {
    const userId = req.userId;

    try {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'Profile info retrieved', data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to retrieve user profile" });
    }
};

export const getMyAppointments = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.userId });
        const doctorIds = bookings.map(el => el.doctor.id);
        const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select('-password');
        res.status(200).json({ success: true, message: 'Appointments retrieved', data: doctors });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to retrieve appointments" });
    }
};
