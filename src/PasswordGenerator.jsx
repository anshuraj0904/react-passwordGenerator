import { useState, useCallback, useEffect, useRef } from "react";

function PasswordGenerator() {
  const [length, setLength] = useState(8);
  const [passwordValue, setPasswordValue] = useState("");
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [specialCharactersAllowed, setSpecialCharactersAllowed] =useState(false);


  const generatePassword = useCallback(()=>{
    let pass = ''
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numbersAllowed) str += "0123456789"

    if(specialCharactersAllowed) str += "!@#$%^&*()_+[]{}|;:,.<>?/~`"

    for(let i =1;i<length;i++){
        const charIndex = Math.floor(Math.random() * str.length + 1)  // This will give us a random number between 0 and str.length - 1
        pass += str.charAt(charIndex) // This means, we're appending the character at the index char to the pass string.
    }

    setPasswordValue(pass)
  }, [length, numbersAllowed, specialCharactersAllowed])
 

  // So, now, let us define, when we want the above function to be called.
  // 1. When the length is changed
  // 2. When either of the two checkboxes are checked or unchecked.
  // 3. When the component mounts for the first time.
// We'll use useEffect for this.

    useEffect(()=>{
        generatePassword()
    },[length, numbersAllowed, specialCharactersAllowed])

    
    const copyPasswordToClipboard = () => {
        window.navigator.clipboard.writeText(passwordValue)   // clipboard has this option to copy the text to clipboard using writeText method.
        passwordRef.current?.select() // selects the text in the input field.
    }

  // So, we're done with the styling and all. Now, we'll work upon password generation logic, but more than that, which hook to use, when we want to re-render the logic evertytime there's a change in either of length or the two checkboxes. 
 // We can use useCallback, but in this case, we can use useEffect as well. Before that, let us read about these hooks. 
 
   const passwordRef = useRef(null) // Creating a reference to the input field, so that we can select the text in it when we click on the copy button.


  return (
    <>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-xl">
          <h1 className="text-3xl font-bold text-white underline text-center mb-8">
            Password Generator
          </h1>

          {/* Password display and copy button */}
          <div className="flex items-center w-full h-14">
            <input
              className="flex-1 bg-gray-100 text-black px-4 py-2 rounded-l-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 h-full"
              type="text"
              value={passwordValue}
              placeholder="Generated Password"
              minLength={8}
              maxLength={100}
              ref={passwordRef}
              readOnly
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 shadow-md transition-all duration-200 h-full"
              onClick={copyPasswordToClipboard}>
              Copy
            </button>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between mt-10 gap-6 text-white">
            {/* Slider with length label */}
            <div className="flex items-center gap-4 w-full sm:w-1/2">
              <label
                htmlFor="length"
                className="text-sm text-gray-300 whitespace-nowrap"
              >
                Length:{" "}
                <span className="text-orange-400 font-semibold">{length}</span>
              </label>
              <input
                id="length"
                type="range"
                name="length"
                min={8}
                max={100}
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="flex-1 h-2 bg-gray-200 rounded-lg cursor-pointer accent-blue-600"
              />
            </div>

            {/* Checkboxes */}
            <div className="flex gap-6 items-center justify-end w-full sm:w-1/2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  defaultChecked={numbersAllowed}
                  onChange={() => setNumbersAllowed((prev) => !prev)}
                  className="accent-blue-600"
                />
                <label htmlFor="numbers" className="text-sm">Include Numbers</label>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  defaultChecked={specialCharactersAllowed}
                  onChange={() => setSpecialCharactersAllowed((prev) => !prev)}
                  className="accent-blue-600"
                />
                <label htmlFor="specialChars" className="text-sm">Special Characters</label>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasswordGenerator;
