import React from "react";

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
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          className="w-full sm:flex-1 outline-none"
          type="email"
          placeholder="Enter your Email"
          required
        />
        <button
          type="submit"
          // className="bg-gray-900  text-white text-xs px-10 py-4 cursor-pointer"

          className="inline-flex items-center px-10 py-4 gap-3 bg-gradient-to-r bg-gray-900 cursor-pointer text-white   font-semibold shadow hover:shadow-xl hover:bg-blue-300 transition transform hover:scale-[1.02]"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
