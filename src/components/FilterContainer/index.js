import React, {useState, useCallback} from 'react';
import {Collapse} from 'react-collapse'
import Filter from "../Filter";
import Button from "../Button/index";
import {StyledFiltrosH2,StyledSection,StyledLabels,StyledInput,StyledTitle,StyledCaret,StyledDiv} from './styles';

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
    <StyledSection>
      <form onSubmit={handleSubmit}>
        <StyledFiltrosH2>ENTRENADORES</StyledFiltrosH2>
        <StyledTitle onClick={collapseSpecializations}>Objetivos <StyledCaret></StyledCaret></StyledTitle>
        <Collapse isOpened={isCollapseSpecializationsOpen}>
          <Filter
            filterName={specializations}
            nameCheckbox='checkSpecializations'
            checks = {checkSpecializations}
            handleChange = {handleChange}
          />
        </Collapse>
        <StyledTitle onClick={collapseDisciplines}>Disciplinas <StyledCaret></StyledCaret></StyledTitle>
        <Collapse isOpened={isCollapseDisciplinesOpen}>
          <Filter
            filterName={disciplines}
            nameCheckbox='checkDisciplines'
            checks = {checkDisciplines}
            handleChange = {handleChange}
          />
        </Collapse>
        <StyledTitle onClick={collapsePriceRange}>Rangos de precios <StyledCaret></StyledCaret></StyledTitle>
        <Collapse isOpened={isCollapsePriceRangeOpen}>
          <StyledLabels htmlFor="minimo">Mínimo</StyledLabels>
          <StyledInput type="text" id="minimo" name="minFee" value={minFee} onChange={handleChange} /> 
          <StyledLabels htmlFor="maximo">Máximo</StyledLabels>  
          <StyledInput type="text" id="maximo" name="maxFee" value={maxFee} onChange={handleChange} /> 
        </Collapse>
        <StyledDiv>
          <Button
            type="submit"
          >
            Aplicar
          </Button>
        </StyledDiv>
      </form>
    </StyledSection>
  )
}

export default FilterContainer