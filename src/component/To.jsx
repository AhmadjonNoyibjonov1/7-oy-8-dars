import React, { useEffect, useState } from 'react';
import countriesData from "../Country.json";

function CurrencyConverter() {
  const [openOptions, setOpenOptions] = useState(false);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (countriesData.length > 0) {
      setSelectedFrom(countriesData[0]);
      setSelectedTo(countriesData[1]); // Ikkinchi davlatni boshlang'ich sifatida tanlash
    }
  }, []);

  const handleSelectCountry = (country, type) => {
    if (type === "from") {
      setSelectedFrom(country);
    } else {
      setSelectedTo(country);
    }
    setOpenOptions(false);
  };

  return (
    <div className="flex justify-between mt-16">
      <input 
        type="number" 
        placeholder="Amount to convert" 
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input input-bordered w-72 p-3 max-h-12 rounded-md max-w-xs border-2" 
      />
      <div>
        <p className='mt-[-36px] mb-2 text-lg font-bold'>From</p>
        <div 
          onClick={() => setOpenOptions(!openOptions)} 
          className="border-2 w-80 flex p-3 h-12 rounded justify-between cursor-pointer"
        >
          {selectedFrom && (
            <>
              <img src={selectedFrom.flag} alt={`${selectedFrom.name} flag`} className='w-8' />
              <span>
                {selectedFrom.currencies && (
                  `${Object.keys(selectedFrom.currencies)[0]} - ${Object.values(selectedFrom.currencies)[0].name}`
                )}
              </span>
            </>
          )}
          <span>
            {!openOptions ? (
              <i className="fa-solid fa-chevron-down"></i>
            ) : (
              <i onClick={() => setOpenOptions(false)} className="fa-solid fa-xmark"></i>
            )}
          </span>
        </div>

        {openOptions && (
          <ul className="options shadow-lg px-3 w-72 bg-white overflow-y-scroll h-80 rounded">
            {countriesData.map((country, index) => (
              <li 
                key={index} 
                className="flex gap-5 mt-2 items-center cursor-pointer hover:bg-slate-300 text-sm"
                onClick={() => handleSelectCountry(country, "from")}
              >
                <img src={country.flag} alt={`${country.name} flag`} className='w-8 h-6' />
                <span>
                  {country.currencies && (
                    `${Object.keys(country.currencies)[0]} - ${Object.values(country.currencies)[0].name}`
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <p className='mt-[-36px] mb-2 text-lg font-bold'>To</p>
        <div 
          onClick={() => setOpenOptions(!openOptions)} 
          className="border-2 w-80 flex p-3 h-12 rounded justify-between cursor-pointer"
        >
          {selectedTo && (
            <>
              <img src={selectedTo.flag} alt={`${selectedTo.name} flag`} className='w-8' />
              <span>
                {selectedTo.currencies && (
                  `${Object.keys(selectedTo.currencies)[0]} - ${Object.values(selectedTo.currencies)[0].name}`
                )}
              </span>
            </>
          )}
          <span>
            {!openOptions ? (
              <i className="fa-solid fa-chevron-down"></i>
            ) : (
              <i onClick={() => setOpenOptions(false)} className="fa-solid fa-xmark"></i>
            )}
          </span>
        </div>

        {openOptions && (
          <ul className="options shadow-lg px-3 w-72 bg-white overflow-y-scroll h-80 rounded">
            {countriesData.map((country, index) => (
              <li 
                key={index} 
                className="flex gap-5 mt-2 items-center cursor-pointer hover:bg-slate-300 text-sm"
                onClick={() => handleSelectCountry(country, "to")}
              >
                <img src={country.flag} alt={`${country.name} flag`} className='w-8 h-6' />
                <span>
                  {country.currencies && (
                    `${Object.keys(country.currencies)[0]} - ${Object.values(country.currencies)[0].name}`
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CurrencyConverter;
