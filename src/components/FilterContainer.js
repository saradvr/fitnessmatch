import Filter from "./Filter";

function FilterContainer({disciplines,specializations}){
  return(
    <>
      <h2>Disciplinas</h2>
      <Filter
        filterName={disciplines}
        name='disciplinas'
      />
      <h2>Especialidades</h2>
      <Filter
        filterName={specializations}
        name='especialidades'
      />
      <h2>Rangos de precios</h2>
      <label htmlFor="minimo">Mínimo</label>
      <input type="text" id="minimo" name="minimo" /> 
        - 
      <input type="text" id="maximo" name="maximo" /> 
      <label htmlFor="maximo">Máximo</label>

    </>
  )
}

export default FilterContainer