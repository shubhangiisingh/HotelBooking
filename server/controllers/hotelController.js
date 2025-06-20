// import Hotel from "../models/Hotel.js";
// import User from "../models/User.js";

// export const registerHotel = async(req, res) => {
//     try{
//         const {name, address, contact, city} = req.body;
//         const owner =  req.user._id;
//         //Check if User Already Registered
//         const hotel =  await Hotel.findOne({owner})
//         if(hotel){
//           return res.json({success: false, message: "Hotel Already Registered"})
//         }
//         await Hotel.create({name, address, contact, owner, city});
//         await User.findByIdAndUpdate(owner, {role: "hotelOwner"});
//         res.json({success: true, message: "Hotel Registered Successfully"})
//     }
//     catch(error){
//         res.json({success: false, message: error.message})
//     }
// }


import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
  try {
    // ✅ SAFETY CHECK for req.user
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized: User not found in request" });
    }

    const { name, address, contact, city } = req.body;
    const owner = req.user._id;

    // Check if user already registered a hotel
    const hotel = await Hotel.findOne({ owner });
    if (hotel) {
      return res.json({ success: false, message: "Hotel Already Registered" });
    }

    await Hotel.create({ name, address, contact, owner, city });
    await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

    res.json({ success: true, message: "Hotel Registered Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

