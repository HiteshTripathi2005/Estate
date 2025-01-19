import React from "react";
import PersonalInfo from "../components/profile/PersonalInfo";
import UploadedProperty from "../components/profile/UploadedProperty";
import AuthNavbar from "../components/common/AuthNavbar";

export default function Profile() {
  return (
    <>
      <AuthNavbar />
      <div className="max-w-6xl mx-auto p-3 sm:p-4 md:p-6 max-sm:mt-14 max-lg:mt-16 mt-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center my-5 sm:mt-7 sm:mb-5 underline">
          Profile
        </h1>
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          <PersonalInfo />
          <UploadedProperty />
        </div>
      </div>
    </>
  );
}
