import React, {useState, useCallback} from 'react';
import {Collapse} from 'react-collapse'
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

  const [isCheckboxCollapseOpen1, setIsCheckboxCollapseOpen1] = useState(false);
  const [isCheckboxCollapseOpen2, setIsCheckboxCollapseOpen2] = useState(false);
  const [isInputsCollapseOpen, setIsInputsCollapseOpen] = useState(false);

  const onClick1 = useCallback(
    () => setIsCheckboxCollapseOpen1(!isCheckboxCollapseOpen1),
    [isCheckboxCollapseOpen1]
  )

  const onClick2 = useCallback(
    () => setIsCheckboxCollapseOpen2(!isCheckboxCollapseOpen2),
    [isCheckboxCollapseOpen2]
  )

  const onClick3 = useCallback(
    () => setIsInputsCollapseOpen(!isInputsCollapseOpen),
    [isInputsCollapseOpen]
  )

  return(
    <form onSubmit={handleSubmit}>
      <h2 onClick={onClick1}>Objetivos</h2>
      <Collapse isOpened={isCheckboxCollapseOpen1}>
        <Filter
          filterName={specializations}
          nameCheckbox='checkSpecializations'
          checks = {checkSpecializations}
          handleChange = {handleChange}
        />
      </Collapse>
      <h2 onClick={onClick2}>Disciplinas</h2>
      <Collapse isOpened={isCheckboxCollapseOpen2}>
        <Filter
          filterName={disciplines}
          nameCheckbox='checkDisciplines'
          checks = {checkDisciplines}
          handleChange = {handleChange}
        />
      </Collapse>
      <h2 onClick={onClick3}>Rangos de precios</h2>
      <Collapse isOpened={isInputsCollapseOpen}>
        <label htmlFor="minimo">Mínimo</label>
        <input type="text" id="minimo" name="minFee" value={minFee} onChange={handleChange} /> 
          - 
        <input type="text" id="maximo" name="maxFee" value={maxFee} onChange={handleChange} /> 
        <label htmlFor="maximo">Máximo</label>
      </Collapse>
      <Button
        type="submit"
      >
        Aplicar filtros
      </Button>

    </form>
  )
}

export default FilterContainer