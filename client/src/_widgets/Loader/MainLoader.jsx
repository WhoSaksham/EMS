import React from "react";
import SyncLoader from "react-spinners/SyncLoader";
import "./loader.scss";

const MainLoader = () => {
  const override = {
    display: "block",
    borderColor: "var(--primary)",
  };
  return (
    <>
      <div className="h-100 w-100 d-flex align-items-center justify-content-center">
        <div className="in_screen_loader">
        <SyncLoader
          color={"var(--primary)"}
          cssOverride={override}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      </div>
    </>
  );
};

export default MainLoader;
