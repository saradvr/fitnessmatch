import React, {useState, useCallback} from 'react';
import {Collapse} from 'react-collapse'
import Filter from "../Filter";
import Button from "../Button/index";
import {StyledFiltrosH2,StyledSection,StyledLabels,StyledInput,StyledTitle,StyledCaret,StyledDiv} from './styles';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getSpecializations, toggleSpecialization } from '../../store/specializationsReducer'
import { getDisciplines, toggleDiscipline } from '../../store/disciplinesReducer'
import { changeMaxFee, changeMinFee } from '../../store/pricesRangeReducer'
import { getCoaches } from '../../store/coachesReducer';

function FilterContainer(){
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

  const dispatch = useDispatch()

  const { 
    loadingSpecializations, 
    errorSpecializations, 
    specializations, 
    checkSpecializations,
    loadingDisciplines, 
    errorDisciplines, 
    disciplines,
    checkDisciplines,
    minFee,
    maxFee,
  } = useSelector(({
    specializationReducer, 
    disciplineReducer, 
    pricesRangeReducer
  }) => ({
    loadingSpecializations: specializationReducer.loading,
    errorSpecializations: specializationReducer.error,
    specializations: specializationReducer.specializations,
    checkSpecializations: specializationReducer.checkSpecializations,
    loadingDisciplines: disciplineReducer.loading,
    errorDisciplines: disciplineReducer.error,
    disciplines: disciplineReducer.disciplines,
    checkDisciplines: disciplineReducer.checkDisciplines,
    minFee: pricesRangeReducer.minFee,
    maxFee: pricesRangeReducer.maxFee,
  }))

  useEffect(() => {
    dispatch(getSpecializations())
    dispatch(getDisciplines())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return(
    <StyledSection>
      <form onSubmit={e => {
        e.preventDefault()
        dispatch(
          getCoaches({
            minFee,
            maxFee,
            checkSpecializations,
            checkDisciplines
          })
        )
      }}>
        <StyledFiltrosH2>ENTRENADORES</StyledFiltrosH2>
        <StyledTitle 
          onClick={collapseSpecializations}
        >
          Objetivos 
          <StyledCaret />
        </StyledTitle>
        <Collapse isOpened={isCollapseSpecializationsOpen}>
          {loadingSpecializations && <p>Cargando objetivos disponibles...</p>}
          {errorSpecializations && <p>Algo salió mal</p>}
          <Filter
            filterName={specializations}
            nameCheckbox='checkSpecializations'
            checks = {checkSpecializations}
            handleChange = {e => dispatch(toggleSpecialization(checkSpecializations.includes(e.target.id), e.target.id))}
            marginLeft = '20px'
          />
        </Collapse>
        <StyledTitle onClick={collapseDisciplines}>Disciplinas <StyledCaret></StyledCaret></StyledTitle>
        <Collapse isOpened={isCollapseDisciplinesOpen}>
          {loadingDisciplines && <p>Cargando objetivos disponibles...</p>}
          {errorDisciplines && <p>Algo salió mal</p>}
          <Filter
            filterName={disciplines}
            nameCheckbox='checkDisciplines'
            checks = {checkDisciplines}
            handleChange = {e => dispatch(toggleDiscipline(checkDisciplines.includes(e.target.id), e.target.id))}
            marginLeft = '20px'
          />
        </Collapse>
        <StyledTitle onClick={collapsePriceRange}>Rangos de precios <StyledCaret></StyledCaret></StyledTitle>
        <Collapse isOpened={isCollapsePriceRangeOpen}>
          <StyledLabels htmlFor="minimo">Mínimo</StyledLabels>
          <StyledInput 
            type="text" 
            id="minimo" 
            name="minFee" 
            value={minFee} 
            onChange={e => dispatch(changeMinFee(e.target.value))} 
          /> 
          <StyledLabels htmlFor="maximo">Máximo</StyledLabels>  
          <StyledInput 
            type="text" 
            id="maximo" 
            name="maxFee" 
            value={maxFee} 
            onChange={e => dispatch(changeMaxFee(e.target.value))} 
          /> 
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