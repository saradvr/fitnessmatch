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
      <input type="checkbox" id="rango_uno" name="rangoPrecios" value="rangoUno"/> 
      <label htmlFor="rango_uno">10.000 - 25.000</label>
      <input type="checkbox" id="rango_dos" name="rangoPrecios" value="rangoDos"/> 
      <label htmlFor="rango_dos">26.000 - 50.000</label>
      <input type="checkbox" id="rango_tres" name="rangoPrecios" value="rangoTres"/> 
      <label htmlFor="rango_tres">51.000 - 75.000</label>
    </>
  )
}

export default FilterContainer