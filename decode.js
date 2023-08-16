import React, { useState, useEffect } from "react";

const decode = () => {
  const [latestCipher, setLatestCipher] = useState("");
  const [integerArray, setIntegerArray] = useState([]);
  const [actualMessage, setActualMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((response) => response.json())
      .then((data) => {
        setLatestCipher(data.ciphervalue);
      })
      .catch((error) => {
        console.error("Error fetching latest cipher:", error);
      });
  }, []);

  function handleMessageDisplay() {
    const n = document.getElementById("n").value;
    const e = document.getElementById("e").value;
    const inputString = latestCipher;
    const splitArray = inputString.split("&");
    const parsedArray = splitArray.map((str) => parseInt(str, 10));
    setIntegerArray(parsedArray);

    let p,q;
    for(let i=(Math.sqrt(n)); i>1; i=i-2)
    {
       if(n%i === 0)
       {
        p = i;
        q = n/i;
       }
    }

    const phi = (p - 1) * (q - 1);

    let d = 1;
    let k = 1;
    while (true) {
      d = phi * k + 1;
      if (d % e === 0) {
        d = d / e;
        break;
      }
      k++;
    }

    let msg = "";
    let a = 0;
    for (let i = 0; i < integerArray.length - 1; i++) {
      if (d > 5) {
        a = recursivePowerMod(integerArray[i], d, n);
      }
      a = a + 95;
      msg = msg.concat(String.fromCharCode(a));
    }

    setActualMessage(msg);
    console.log(msg)
  }

  function recursivePowerMod(base, exponent, divisor) {
    if (exponent === 0) {
      return 1 % divisor; // Any number to the power of 0 is 1
    } else if (exponent <= 3) {
      return Math.pow(base, exponent) % divisor; // Calculate and return directly
    } else {
      const remainingExponent = exponent % 3;
      const newBase = Math.pow(base, 3) % divisor;
      const recursiveResult = recursivePowerMod(
        newBase,
        Math.floor(exponent / 3),
        divisor
      );
      return (recursiveResult * Math.pow(base, remainingExponent)) % divisor;
    }
  }

  return 
  (
    <>
    <div>
        <h4>{actualMessage}</h4>
    </div>
    </>
  )
};

export default decode;
