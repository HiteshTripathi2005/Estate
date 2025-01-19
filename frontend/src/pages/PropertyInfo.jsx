import React from "react";
import InfoMain from "../components/info/InfoMain";
import AuthNavbar from "./../components/common/AuthNavbar";

const PropertyInfo = () => {
  return (
    <div>
      <AuthNavbar />
      <div className="mt-20">
        <InfoMain />
      </div>
    </div>
  );
};

export default PropertyInfo;
