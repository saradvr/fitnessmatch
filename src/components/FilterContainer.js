import Filter from "./Filter";
import Button from "./Button";

function FilterContainer({
  disciplines, 
  checkDisciplines, 
  specializations, 
  checkSpecializations, 
  minFee, 
  maxFee,
  handleChange,
  handleSubmit,
}){
  return(
    <form onSubmit={handleSubmit}>
      <h2>Objetivos</h2>
      <Filter
        filterName={specializations}
        nameCheckbox='checkSpecializations'
        checks = {checkSpecializations}
        handleChange = {handleChange}
      />
      <h2>Disciplinas</h2>
      <Filter
        filterName={disciplines}
        nameCheckbox='checkDisciplines'
        checks = {checkDisciplines}
        handleChange = {handleChange}
      />
      <h2>Rangos de precios</h2>
      <label htmlFor="minimo">Mínimo</label>
      <input type="text" id="minimo" name="minFee" value={minFee} onChange={handleChange} /> 
        - 
      <input type="text" id="maximo" name="maxFee" value={maxFee} onChange={handleChange} /> 
      <label htmlFor="maximo">Máximo</label>

      <Button
        type="submit"
      >
        Aplicar filtros
      </Button>

    </form>
  )
}

export default FilterContainer