import React, { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [password, setPassword] = useState("");

  //useRef Hook
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
    <div>
      <h1 className="text-4xl text-center font-semibold uppercase mt-10 text-black">
        Password Generator
      </h1>

      <div className="w-full bg-white max-w-2xl mx-auto m-8 p-5 rounded-lg">
        <div className="w-full p-2 flex justify-between items-center">
          <input
            type="text"
            placeholder="Password"
            className="w-full p-2 rounded-l-lg border-1 border-gray-300 outline-0"
            value={password}
            onChange={(e) => {
              e.target.value;
            }}
            readOnly
            ref={passwordRef}
          />
          <button
            className="border-0 bg-[rebeccapurple] px-3.5 py-2.5 rounded-r-lg text-white cursor-pointer active:bg-[rebeccapurple]/80 duration-100"
            onClick={copyText}
          >
            Copy
          </button>
        </div>

        <div className="flex justify-between px-5 py-3">
          <input
            type="range"
            min={5}
            max={50}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
          <div className="flex gap-3 uppercase">
            <label htmlFor="inputNumber">Numbers</label>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="inputNumber"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />

            <label htmlFor="specialChar">Special Character</label>
            <input
              type="checkbox"
              defaultChecked={specialChar}
              id="specialChar"
              onChange={() => {
                setSpecialChar((prev) => !prev);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
