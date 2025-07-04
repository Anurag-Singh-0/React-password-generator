import React, { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowercase = "abcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let specialCharacters = "!@#$%^&*()_+[]{}|;:,.<>?";
    let pass = "";
    let characters = uppercase + lowercase;

    if (numberAllowed) characters += numbers;
    if (specialChar) characters += specialCharacters;

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * characters.length + 1);
      pass += characters.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, specialChar]);

  const copyText = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, specialChar, generatePassword]);


  return (
    <div className="min-h-screen bg-[cornflowerblue] flex flex-col pt-8">
      <h1 className="text-3xl sm:text-5xl text-center font-semibold uppercase mt-8 sm:mt-10 text-white">
        Password Generator
      </h1>

      <div className="w-full bg-white max-w-lg sm:max-w-2xl mx-auto my-6 sm:my-8 p-4 sm:p-8 rounded-lg shadow-2xl">
        {/* Password input and copy button */}
        <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-0 p-2 justify-between items-stretch sm:items-center">
          <input
            type="text"
            placeholder="Password"
            className="w-full p-2 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none border border-gray-300 outline-0 text-base sm:text-lg"
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button
            className="border-0 bg-[rebeccapurple] px-4 py-2 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none text-white cursor-pointer active:bg-[rebeccapurple]/80 duration-100 text-base sm:text-lg"
            onClick={copyText}
          >
            Copy
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 px-2 sm:px-5 py-3">
          {/* Range and Length label together always */}
          <div className="flex flex-row items-center gap-2 w-full sm:w-auto">
            <input
              type="range"
              min={5}
              max={50}
              value={length}
              className="cursor-pointer w-full sm:w-40"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-sm sm:text-base whitespace-nowrap">
              Length: {length}
            </label>
          </div>
          {/* Checkboxes grouped together on small screens */}
          <div className="flex flex-row gap-4 items-center justify-center sm:flex-row uppercase">
            <div className="flex flex-row items-center gap-1">
              <label htmlFor="inputNumber" className="text-xs sm:text-sm">
                Numbers
              </label>
              <input
                type="checkbox"
                checked={numberAllowed}
                id="inputNumber"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
            </div>
            <div className="flex flex-row items-center gap-1">
              <label htmlFor="specialChar" className="text-xs sm:text-sm">
                Special Character
              </label>
              <input
                type="checkbox"
                checked={specialChar}
                id="specialChar"
                onChange={() => {
                  setSpecialChar((prev) => !prev);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default App;
