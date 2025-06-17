
import React, { useState } from "react";
import Title from "../components/Title";
import { assets, userBookingsDummyData } from "../assets/assets";

const MyBookings = () => {
  const [bookings, setBookings] = useState(userBookingsDummyData);

  return (
    <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
      <Title
        title="My Bookings"
        subTitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks."
        align="left"
      />
      <div className="max-w-6xl mt-8 w-full text-gray-800">
        {/* Table Head */}
        <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-3 font-medium text-base">
          <div>Hotels</div>
          <div>Date & Timings</div>
          <div>Payment</div>
        </div>

        {/* Booking List */}
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t"
          >
            {/* Column 1: Hotel Info */}
            <div className="flex flex-col md:flex-row">
              <img
                src={booking.room.images[0]}
                alt="hotel-img"
                className="min-md:w-44 w-full md:w-44 h-32 rounded shadow object-cover"
              />
              <div className="flex flex-col gap-1.5 max-md:mt-3 md:ml-4">
                <p className="font-playfair text-2xl">
                  {booking.hotel.name}
                  <span className="font-inter text-sm">
                    {" "}
                    ({booking.room.roomType})
                  </span>
                </p>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <img src={assets.locationIcon} alt="location-img" />
                  <span>{booking.hotel.address}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <img src={assets.guestsIcon} alt="guest-img" />
                  <span>Guests: {booking.guests}</span>
                </div>
                <p className="text-base">Total: ${booking.totalPrice}</p>
              </div>
            </div>

            {/* Column 2: Check-In/Check-Out */}
            <div className="flex flex-row gap-4 md:justify-start items-start  md:mt-10">
              <div>
                <p className="font-medium">Check-In:</p>
                <p className="text-sm text-gray-500">
                  {new Date(booking.checkInDate).toDateString()}
                </p>
              </div>
              <div>
                <p className="font-medium">Check-Out:</p>
                <p className="text-sm text-gray-500">
                  {new Date(booking.checkOutDate).toDateString()}
                </p>
              </div>
            </div>

            {/* Column 3: (payment status) */}
          <div className="flex flex-col items-start justify-center pt-3">
  <div className="flex items-center gap-2">
    {/* Dot */}
    <div className={`h-3 w-3 rounded-full ${booking.isPaid ? "bg-green-500" : "bg-red-500"}`}></div>

    {/* Text */}
    <p className={`text-sm ${booking.isPaid ? "text-green-500" : "text-red-500"}`}>
      {booking.isPaid ? "Paid" : "Unpaid"}
    </p>
  </div>
  {!booking.isPaid && (
    <button className="px-4 py-1.5 mt-4 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer">Pay Now</button>
  )}
</div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
