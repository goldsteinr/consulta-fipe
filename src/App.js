import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./App.css";

const App = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  useEffect(() => {
    axios
      .get("http://fipeapi.appspot.com/api/1/carros/marcas.json")
      .then(response => {
        console.log(response.data);
        setBrands(response.data);
      });
  }, []);

  const handleChange = selectedOption => {
    setSelectedBrand({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Select
          value={selectedBrand}
          onChange={handleChange}
          getOptionLabel={option => option.fipe_name}
          getOptionValue={option => option.id}
          options={brands}
        />
      </header>
    </div>
  );
};

export default App;
