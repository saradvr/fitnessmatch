import Filter from "./Filter";

function FilterContainer({
  disciplines, 
  checkDisciplines, 
  specializations, 
  checkSpecializations, 
  minFee, 
  maxFee,
  handleChange,
}){
  return(
    <>
      <h2>Disciplinas</h2>
      <Filter
        filterName={disciplines}
        name='checkDisciplines'
        checks = {checkDisciplines}
        handleChange = {handleChange}
      />
      <h2>Especialidades</h2>
      <Filter
        filterName={specializations}
        name='checkSpecializations'
        checks = {checkSpecializations}
        handleChange = {handleChange}
      />
      <h2>Rangos de precios</h2>
      <label htmlFor="minimo">Mínimo</label>
      <input type="text" id="minimo" name="minFee" value={minFee} onChange={handleChange} /> 
        - 
      <input type="text" id="maximo" name="maxFee" value={maxFee} onChange={handleChange} /> 
      <label htmlFor="maximo">Máximo</label>

    </>
  )
}

export default FilterContainer