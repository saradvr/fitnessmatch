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

  const [isCollapseSpecializationsOpen, setIsCollapseSpecializationsOpen] = useState(false);
  const [isCollapseDisciplinesOpen, setIsCollapseDisciplinesOpen] = useState(false);
  const [isCollapsePriceRangeOpen, setIsCollapsePriceRangeOpen] = useState(false);

  const collapseSpecializations = useCallback(
    () => setIsCollapseSpecializationsOpen(!isCollapseSpecializationsOpen),
    [isCollapseSpecializationsOpen]
  )

  const collapseDisciplines = useCallback(
    () => setIsCollapseDisciplinesOpen(!isCollapseDisciplinesOpen),
    [isCollapseDisciplinesOpen]
  )

  const collapsePriceRange = useCallback(
    () => setIsCollapsePriceRangeOpen(!isCollapsePriceRangeOpen),
    [isCollapsePriceRangeOpen]
  )

  return(
    <form onSubmit={handleSubmit}>
      <h2 onClick={collapseSpecializations}>Objetivos</h2>
      <Collapse isOpened={isCollapseSpecializationsOpen}>
        <Filter
          filterName={specializations}
          nameCheckbox='checkSpecializations'
          checks = {checkSpecializations}
          handleChange = {handleChange}
        />
      </Collapse>
      <h2 onClick={collapseDisciplines}>Disciplinas</h2>
      <Collapse isOpened={isCollapseDisciplinesOpen}>
        <Filter
          filterName={disciplines}
          nameCheckbox='checkDisciplines'
          checks = {checkDisciplines}
          handleChange = {handleChange}
        />
      </Collapse>
      <h2 onClick={collapsePriceRange}>Rangos de precios</h2>
      <Collapse isOpened={isCollapsePriceRangeOpen}>
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