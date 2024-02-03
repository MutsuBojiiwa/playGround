

import React, { useState, useMemo } from 'react';







export default function Home() {
  const [display, setDisplay] = useState("0");
  const [result, setResult] = useState(0);
  const [isInput, setIsInput] = useState(false);
  const [calcStatus, setCalcStatus] = useState('');
  const [active, setActive] = useState({ plus: false, minus: false, multiple: false, divide: false, });
  const [length, setLength] = useState(1);


  const numberClick = (e) => {
    const num = e.target.value;
    if (display === '0' || !isInput) {
      setDisplay(num);
      setLength(1);
    }
    if (display === '-0') {
      setDisplay('-' + num);
      setLength(1);
    }
    if (length < 9) {
      if (isInput) {
        setDisplay((display + num));
        setLength((display + num).length);
      }
    }
    setIsInput(true);
    setActive({ plus: false, minus: false, multiple: false, divide: false, });

  };

  const decimalPointClick = (e) => {
    const num = e.target.value;
    if (!isInput) {
      setDisplay('0' + num);
    } else if (display.indexOf('.') < 0) {
      setDisplay(display + num);

    }
    setIsInput(true);
    setActive({ plus: false, minus: false, multiple: false, divide: false, });
  }

  const plus = () => {
    setCalcStatus('plus');
    calc();
    setActive({ plus: true, minus: false, multiple: false, divide: false, });
  };

  const minus = () => {
    setCalcStatus('minus');
    calc();
    setActive({ plus: false, minus: true, multiple: false, divide: false, });
  };

  const multiple = () => {
    setCalcStatus('multiple');
    calc();
    setActive({ plus: false, minus: false, multiple: true, divide: false, });
  };

  const divide = () => {
    setCalcStatus('divide');
    calc();
    setActive({ plus: false, minus: false, multiple: false, divide: true, });
  };

  const calc = () => {
    let newResult;
    if (calcStatus === 'plus') {
      newResult = result + Number(display);
    } else if (calcStatus === 'minus') {
      newResult = result - Number(display);
    } else if (calcStatus === 'multiple') {
      newResult = result * Number(display);
    } else if (calcStatus === 'divide') {
      newResult = result / Number(display);
      if (newResult === Infinity) {
        newResult = 'エラー';
      }
    } else {
      newResult = Number(display);
    }

    if(String(newResult).length > 9){
      newResult = 'overflow'
      setResult(0);
      setDisplay(String(newResult));
      setIsInput(false);
    }else{
      setResult(Number(newResult));
      setDisplay(String(newResult));
      setIsInput(false);
      setLength(display.length);
    }


  }

  const equal = () => {
    calc();
    setResult(0);
    setCalcStatus('');
    setActive({ plus: false, minus: false, multiple: false, divide: false, });
    setLength(display.length);
  };

  const clear = () => {
    setDisplay('0');
    setResult(0);
    setIsInput(false);
    setCalcStatus('');
    setActive({ plus: false, minus: false, multiple: false, divide: false, });
  };

  const toggleSign = () => {
    let newResult
    if (display.indexOf('-') < 0) {
      newResult = '-' + display;
    } else {
      newResult = display.slice(1);
    }
    setDisplay(String(newResult));
  }

  const percentage = () => {
    const newResult = Number(display) / 100;
    setDisplay(String(newResult));
  }


  return (
    <>
      <h1>シンプル計算機</h1>
      <div className='mainContents'>
        <div className='display'>
          <p className={length > 6 ? "numLength" + length : ""}>{display}</p>
        </div>
        <button className='special' onClick={clear}>C</button>
        <button className='special' onClick={toggleSign}>+/-</button>
        <button className='special' onClick={percentage}>%</button>
        <button className={`symbol ${active.divide ? "active" : ""}`} onClick={divide}>÷</button>
        <button className='number' value={7} onClick={numberClick}>7</button>
        <button className='number' value={8} onClick={numberClick}>8</button>
        <button className='number' value={9} onClick={numberClick}>9</button>
        <button className={`symbol ${active.multiple ? "active" : ""}`} onClick={multiple}>×</button>
        <button className='number' value={4} onClick={numberClick}>4</button>
        <button className='number' value={5} onClick={numberClick}>5</button>
        <button className='number' value={6} onClick={numberClick}>6</button>
        <button className={`symbol ${active.minus ? "active" : ""}`} onClick={minus}>-</button>
        <button className='number' value={1} onClick={numberClick}>1</button>
        <button className='number' value={2} onClick={numberClick}>2</button>
        <button className='number' value={3} onClick={numberClick}>3</button>
        <button className={`symbol ${active.plus ? "active" : ""}`} onClick={plus}>+</button>
        <button className='number zero' value={0} onClick={numberClick}>0</button>
        <button className='number' value={'.'} onClick={decimalPointClick}>.</button>
        <button className='symbol' onClick={equal}>=</button>

      </div>
    </>
  );
};

