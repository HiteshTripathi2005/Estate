import React from "react";
import { FaBath, FaBed, FaParking, FaRulerCombined } from "react-icons/fa";
import { MdChair } from "react-icons/md";

const Features = (props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-6 border-t border-b">
      {[
        {
          icon: <FaBed className="text-2xl text-blue-500" />,
          label: `${props.info.features?.bedrooms} Beds`,
        },
        {
          icon: <FaBath className="text-2xl text-blue-500" />,
          label: `${props.info.features?.bathrooms} Baths`,
        },
        {
          icon: <FaRulerCombined className="text-2xl text-blue-500" />,
          label: `${props.info.features?.squareFeet} sqft`,
        },
        {
          icon: <FaParking className="text-2xl text-blue-500" />,
          label: props.info.features?.parking ? "Parking" : "No Parking",
        },
        {
          icon: <MdChair className="text-2xl text-blue-500" />,
          label: props.info.features?.furnished ? "Furnished" : "Unfurnished",
        },
      ].map((feature, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {feature.icon}
          <span className="font-medium">{feature.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Features;
