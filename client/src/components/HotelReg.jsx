import React, { useState } from "react";
import { assets, cities } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const HotelReg = () => {
  const { setShowHotelReg, axios, getToken, setIsOwner, navigate } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const hotelData = {
      name: formData.get("name").trim(),
      contact: formData.get("contact").trim(),
      address: formData.get("address").trim(),
      city: formData.get("city"),
    };

    // Client-side validation
    if (!hotelData.name || hotelData.name.length < 3) {
      toast.error("Hotel name must be at least 3 characters long");
      setIsSubmitting(false);
      return;
    }
    if (!/^\+?\d{10,15}$/.test(hotelData.contact)) {
      toast.error("Please enter a valid phone number (10-15 digits)");
      setIsSubmitting(false);
      return;
    }
    if (!hotelData.address || hotelData.address.length < 5) {
      toast.error("Address must be at least 5 characters long");
      setIsSubmitting(false);
      return;
    }
    if (!hotelData.city || !cities.includes(hotelData.city)) {
      toast.error("Please select a valid city");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post("/api/hotels/", hotelData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setIsOwner(true); // Update UI to show "Dashboard"
        setShowHotelReg(false);
        navigate("/owner"); // Redirect to owner dashboard
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to register hotel");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-[100] flex items-center justify-center bg-black/70">
      <form
        onSubmit={handleSubmit}
        className="flex bg-white rounded-xl max-w-4xl max-md:mx-2"
      >
        <img
          src={assets.regImage}
          alt="reg-image"
          className="w-1/2 rounded-xl hidden md:block"
        />
        <div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10">
          <img
            src={assets.closeIcon}
            alt="close-icon"
            className="absolute top-4 right-4 w-4 h-4 cursor-pointer"
            onClick={() => setShowHotelReg(false)}
          />
          <p className="text-2xl mt-6 font-semibold">Register Your Hotel</p>
          <div className="w-full mt-4">
            <label htmlFor="name" className="font-medium text-gray-500">
              Hotel Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Type Here"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            />
          </div>
          <div className="w-full mt-4">
            <label htmlFor="contact" className="font-medium text-gray-500">
              Phone
            </label>
            <input
              id="contact"
              name="contact"
              type="text"
              placeholder="Type Here"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            />
          </div>
          <div className="w-full mt-4">
            <label htmlFor="address" className="font-medium text-gray-500">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="Type Here"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            />
          </div>
          <div className="w-full mt-4 max-w-60 mr-auto">
            <label htmlFor="city" className="font-medium text-gray-500">
              City
            </label>
            <select
              id="city"
              name="city"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option value={city} key={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className={`bg-indigo-500 hover:bg-indigo-600 transition-all text-white py-2.5 px-6 mr-auto rounded cursor-pointer mt-6 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelReg;