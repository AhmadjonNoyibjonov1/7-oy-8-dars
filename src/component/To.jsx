import React, { useEffect, useState } from "react";
import countriesData from "../Country.json";

function To() {
  const [openOptions, setOpenOptions] = useState({ from: false, to: false });
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    if (countriesData.length > 0) {
      setSelectedFrom(countriesData[0]);
      setSelectedTo(countriesData[1]);
    }
  }, []);

  const handleSelectCountry = (country, type) => {
    if (type === "from") {
      setSelectedFrom(country);
    } else {
      setSelectedTo(country);
    }
    setOpenOptions((prev) => ({ ...prev, [type]: false }));
  };

  const handleConvert = () => {

    if (selectedFrom && selectedTo) {
      let fromRate = Object.values(selectedFrom.currencies)[0].rateToUSD || 1;
      let toRate = Object.values(selectedTo.currencies)[0].rateToUSD || 1;
      let result = ((fromRate / toRate) * amount );
      setConvertedAmount(result.toFixed(2));
    } else {
      setConvertedAmount("0.00");
    }
  };

  return (
    <div className="flex flex-col items-center mt-16">
      <div className="flex justify-between w-full">
        <input
          type="number"
          placeholder="Amount to convert"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input input-bordered w-72 p-3 max-h-12 rounded-md max-w-xs border-2"
        />
        <div>
          <p className="mt-[-36px] mb-2 text-lg font-bold">From</p>
          <div
            onClick={() =>
              setOpenOptions((prev) => ({ ...prev, from: !prev.from }))
            }
            className="border-2 w-80 flex p-3 h-12 rounded justify-between cursor-pointer"
          >
            {selectedFrom && (
              <>
                <img
                  src={selectedFrom.flag}
                  alt={`${selectedFrom.name} flag`}
                  className="w-8"
                />
                <span>
                  {selectedFrom.currencies &&
                    `${Object.keys(selectedFrom.currencies)[0]} - ${
                      Object.values(selectedFrom.currencies)[0].name
                    }`}
                </span>
              </>
            )}
            <span>
              {!openOptions.from ? (
                <i className="fa-solid fa-chevron-down"></i>
              ) : (
                <i
                  onClick={() =>
                    setOpenOptions((prev) => ({ ...prev, from: false }))
                  }
                  className="fa-solid fa-xmark"
                ></i>
              )}
            </span>
          </div>

          {openOptions.from && (
            <ul className="options shadow-lg px-3 w-72 bg-white overflow-y-scroll h-80 rounded">
              {countriesData.map((country, index) => (
                <li
                  key={index}
                  className="flex gap-5 mt-2 items-center cursor-pointer hover:bg-slate-300 text-sm"
                  onClick={() => handleSelectCountry(country, "from")}
                >
                  <img
                    src={country.flag}
                    alt={`${country.name} flag`}
                    className="w-8 h-6"
                  />
                  <span>
                    {country.currencies &&
                      `${Object.keys(country.currencies)[0]} - ${
                        Object.values(country.currencies)[0].name
                      }`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <p className="mt-[-36px] mb-2 text-lg font-bold">To</p>
          <div
            onClick={() =>
              setOpenOptions((prev) => ({ ...prev, to: !prev.to }))
            }
            className="border-2 w-80 flex p-3 h-12 rounded justify-between cursor-pointer"
          >
            {selectedTo && (
              <>
                <img
                  src={selectedTo.flag}
                  alt={`${selectedTo.name} flag`}
                  className="w-8"
                />
                <span>
                  {selectedTo.currencies &&
                    `${Object.keys(selectedTo.currencies)[0]} - ${
                      Object.values(selectedTo.currencies)[0].name
                    }`}
                </span>
              </>
            )}
            <span>
              {!openOptions.to ? (
                <i className="fa-solid fa-chevron-down"></i>
              ) : (
                <i
                  onClick={() =>
                    setOpenOptions((prev) => ({ ...prev, to: false }))
                  }
                  className="fa-solid fa-xmark"
                ></i>
              )}
            </span>
          </div>

          {openOptions.to && (
            <ul className="options shadow-lg px-3 w-72 bg-white overflow-y-scroll h-80 rounded">
              {countriesData.map((country, index) => (
                <li
                  key={index}
                  className="flex gap-5 mt-2 items-center cursor-pointer hover:bg-slate-300 text-sm"
                  onClick={() => handleSelectCountry(country, "to")}
                >
                  <img
                    src={country.flag}
                    alt={`${country.name} flag`}
                    className="w-8 h-6"
                  />
                  <span>
                    {country.currencies &&
                      `${Object.keys(country.currencies)[0]} - ${
                        Object.values(country.currencies)[0].name
                      }`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button
        onClick={handleConvert}
        className="mt-5 p-3 bg-blue-500 text-white rounded-md"
      >
        Convert
      </button>

      <p className="mt-12 bg-[aqua] rounded">Amount: {convertedAmount}</p>
    </div>
  );
}

export default To;
