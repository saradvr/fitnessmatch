import Checkbox from './Checkbox'

function Filter({filterName, name}){
  return(
    <>
      {!!filterName && filterName.length > 0 && filterName.map(( item )  => {
        return (
            <Checkbox
              id = {item.toLowerCase().replace(/ /g, "")}
              name = {name.toLowerCase().replace(/ /g, "")}
              value = {item.toLowerCase().replace(/ /g, "")}
              children= {item}
            />
        )
      })  
    }
    </>
  )
}

export default Filter