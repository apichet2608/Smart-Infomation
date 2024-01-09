import React from "react";

export default function MainCard({
  isDarkMode,
  cardTitle,
  cardCount,
  cardIcon,
}) {
  return (
    <>
      <div
        className={`card shadow-md duration-300 hover:scale-105 ${
          isDarkMode ? "bg-zinc-800 text-slate-50" : "bg-white text-zinc-950"
        }`}
      >
        <div className="card-body grid grid-cols-2">
          <div className="col-span-1 my-auto">
            <h2 className="card-title text-xl whitespace-nowrap text-blue-500">
              {cardTitle}
            </h2>
            <p className="text-3xl font-bold">{cardCount}</p>
          </div>

          <div className="col-span-1">
            <img
              className="my-auto w-auto h-16 relative mx-auto sm:left-24 md:left-12"
              src={cardIcon}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
