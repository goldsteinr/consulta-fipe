import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./App.css";

const App = () => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [modelsYears, setModelsYears] = useState([]);
  const [carDetails, setCarDetails] = useState(null);

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  useEffect(() => {
    axios
      .get("http://fipeapi.appspot.com/api/1/carros/marcas.json")
      .then(response => {
        setBrands(response.data);
      });
  }, []);

  const handleBrandChange = selectedOption => {
    setSelectedBrand(selectedOption);
    setSelectedModel(null);
    setSelectedYear(null);
    setCarDetails(null);
    axios
      .get(
        `http://fipeapi.appspot.com/api/1/carros/veiculos/${
          selectedOption.id
        }.json`
      )
      .then(response => {
        setModels(response.data);
      });
  };

  const handleModelChange = selectedOption => {
    setSelectedModel(selectedOption);
    axios
      .get(
        `http://fipeapi.appspot.com/api/1/carros/veiculo/${selectedBrand.id}/${
          selectedOption.id
        }.json`
      )
      .then(response => {
        setModelsYears(response.data);
      });
  };
  const handleModelsYearChange = selectedOption => {
    setSelectedYear(selectedOption);
    axios
      .get(
        `http://fipeapi.appspot.com/api/1/carros/veiculo/${selectedBrand.id}/${
          selectedModel.id
        }/${selectedOption.id}.json`
      )
      .then(response => {
        console.log(response.data);
        setCarDetails(response.data);
      });
  };

  const restart = () => {
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedYear(null);
    setCarDetails(null);
  };

  return (
    <div className="App">
      <h1>Quanto vale meu carro?</h1>
      {!carDetails && (
        <>
          <Select
            className="select"
            value={selectedBrand}
            onChange={handleBrandChange}
            getOptionLabel={option => option.fipe_name}
            getOptionValue={option => option.id}
            options={brands}
            placeholder="Escolha a marca:"
          />

          {models.length > 0 && (
            <>
              <div className="divider" />
              <Select
                className="select"
                value={selectedModel}
                onChange={handleModelChange}
                getOptionLabel={option => option.fipe_name}
                getOptionValue={option => option.id}
                options={models}
                placeholder="Escolha o modelo:"
              />
            </>
          )}

          {modelsYears.length > 0 && (
            <>
              <div className="divider" />
              <Select
                className="select"
                value={selectedYear}
                onChange={handleModelsYearChange}
                getOptionLabel={option => option.name}
                getOptionValue={option => option.id}
                options={modelsYears}
                placeholder="Escolha o ano:"
              />
            </>
          )}
        </>
      )}
      {carDetails && (
        <>
          <section className="card">
            <p className="name">Modelo: {carDetails.name}</p>
            <p>Marca: {carDetails.marca}</p>
            <p>Ano: {carDetails.ano_modelo}</p>
            <p>Combustível: {carDetails.combustivel}</p>
            <p className="price">{carDetails.preco}</p>
          </section>
          <button className="btn" onClick={restart}>
            Escolher outro carro
          </button>
        </>
      )}
    </div>
  );
};

export default App;
