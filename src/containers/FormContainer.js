import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";

//constants
import { dateRanges } from "../constants/date-range";

export default function FormContainer(props) {
  const [select, setSelect] = useState(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [currentYear, setCurrentYear] = useState();

  useEffect(() => {
    var d = new Date();
    var n = d.getFullYear();
    setCurrentYear(n);
  }, []);

  useEffect(() => {
    console.log(select);
  }, [select]);

  const handleStart = (event) => {
    var date = event.target.value;
    setStart(event.target.value);
    var startDelta = date - currentYear;
    var entries = Object.entries(dateRanges);
    var custom = true;
    for (var i = 0; i < entries.length; i++) {
      if (
        entries[i][1][0] === startDelta &&
        entries[i][1][1] === end - currentYear
      ) {
        setSelect(entries[i][0]);
        custom = false;
        break;
      }
    }
    if (custom) {
      setSelect("Custom");
    }
  };

  const handleEnd = (event) => {
    var date = event.target.value;
    var endDelta = date - currentYear;
    var entries = Object.entries(dateRanges);
    var custom = true;
    for (var i = 0; i < entries.length; i++) {
      if (
        entries[i][1][1] === endDelta &&
        entries[i][1][0] === start - currentYear
      ) {
        setSelect(entries[i][0]);
        custom = false;
        break;
      }
    }
    if (custom) {
      setSelect("Custom");
    }
    setEnd(event.target.value);
  };

  const handleSelect = (event) => {
    var value = event.target.value;
    setStart(currentYear + dateRanges[value][0]);
    setEnd(currentYear + dateRanges[value][1]);
    setSelect(value);
  };

  const clickButton = (event) => {
    console.log(start, end);
    event.preventDefault();
  };

  return (
    <form className="form__container">
      <Select
        title="Select option"
        name="select"
        value={select}
        placeholder="Select range"
        handleChange={handleSelect}
        options={Object.keys(dateRanges)}
      />
      <Input
        name="input"
        title="Start"
        type="number"
        value={start}
        placeholder="Start Date"
        handleChange={handleStart}
      />
      <Input
        name="input"
        title="End"
        type="number"
        value={end}
        placeholder="End date"
        handleChange={handleEnd}
      />
      <Button title="Submit" action={clickButton} />
    </form>
  );
}
