import React from "react";

const CustomButton = ({ label, onClick, type = "button", className = "" }) => {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className="inline-flex items-center gap-3 bg-gray-800 text-slate-300 px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-700 transition transform hover:scale-[1.02]"
      >
        {label}
      </button>
    </div>
  );
};

export default CustomButton;
