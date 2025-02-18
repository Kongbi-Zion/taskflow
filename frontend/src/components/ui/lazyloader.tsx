"use cleint";
import React from "react";
import DefaultLoader from "./loader";

const LazyLoader: React.FC = () => {
  return (
    <div className="flex h-screen w-screen text-center justify-center items-center text-primary-shade-600 bg-background dark:bg-dark-background">
      <div>
        <div className="flex justify-center">
          <DefaultLoader />
        </div>
        Please wait...
      </div>
    </div>
  );
};

export default LazyLoader;
