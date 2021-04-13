import Checkbox from './Checkbox/index.js'

function Filter({
  filterName, 
  nameCheckbox, 
  checks,
  handleChange,
  marginLeft,
}){
  return(
    <>
      {!!filterName && filterName.length > 0 && filterName.map(({_id, name})  => {
        const removeAccents = (str) => {
          return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        } 
        let value = removeAccents(name)
        value = value.toLowerCase().replace(/ /g, "")
        const isChecked = checks.includes(_id)

        return (
            <Checkbox
              key = {_id}
              id = {_id}
              name = {nameCheckbox}
              value = {value}
              isChecked = {isChecked}
              children= {name}
              handleChange = {handleChange}
              marginLeft = {marginLeft}
            />
        )
      })  
    }
    </>
  )
}

export default Filter