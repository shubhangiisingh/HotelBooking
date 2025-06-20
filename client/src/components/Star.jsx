// import React from 'react'
// import { assets } from '../assets/assets'

// const Star = ({rating =4}) => {
//   return (
//     <>
//        {Array(5).fill('').map((_, index) => (
//    <img src={rating > index ? assets.starIconFilled : assets.starIconOutlined} alt="star-icon" className='w-4.5 h-4.5' />
//       ))}
//     </>
//   )
// }

// export default Star
import React from 'react';
import { assets } from '../assets/assets'; // Assuming star icon is here

const Star = ({ rating = 4, count = 5 }) => {
  return (
    <div className="flex">
      {[...Array(count)].map((_, index) => (
        <img
          key={index}
          src={rating > index ? assets.starIconFilled : assets.starIconOutlined} // Make sure this is correctly imported
          alt="star"
          className="w-4 h-4"
        />
      ))}
    </div>
  );
};

export default Star;
