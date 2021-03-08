import Checkbox from './Checkbox'

function Filter({
  filterName, 
  name, 
  checks, 
  handleChange 
}){
  return(
    <>
      {!!filterName && filterName.length > 0 && filterName.map(( item )  => {
        // item = 'Bajar de peso'
        // name = 'bajardepeso'
        // id= 'bajardepeso'
        const itemValue = item.toLowerCase().replace(/ /g, "")
        const isChecked = checks.includes(itemValue) //true

        return (
            <Checkbox
              key = {itemValue}
              id = {itemValue}
              name = {name}
              value = {itemValue}
              isChecked = {isChecked}
              children= {item}
              handleChange = {handleChange}
            />
        )
      })  
    }
    </>
  )
}

export default Filter