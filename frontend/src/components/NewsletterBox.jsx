import React from "react";
import CustomButton from "./CustomButton";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center p-4">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Prime made the ATL proud, putting on a show every time he touched the
        turf. Electrify the game like one of the best corners ever in the Nike
        Diamond Turf 93. It features the iconic midfoot strap and modern
        game-breaking tech, like the Vapor Edge 360
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex mx-auto my-6 border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-gray-900"
      >
        {/* Input */}
        <input
          className="flex-1 px-4 py-3 outline-none border-none"
          type="email"
          placeholder="Enter your Email"
          required
        />

        {/* Button */}
        <CustomButton label="SUBSCRIBE" type="submit" />
      </form>
    </div>
  );
};

export default NewsletterBox;
