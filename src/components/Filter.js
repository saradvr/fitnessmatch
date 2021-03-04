import Checkbox from './Checkbox'

function Filter({filterName, name}){
  return(
    <>
      {!!filterName && filterName.length > 0 && filterName.map(( item )  => {
        return (
            <Checkbox
              nameFor = {item.toLowerCase().replace(/ /g, "")}
              nameId = {item.toLowerCase().replace(/ /g, "")}
              name = {name.toLowerCase().replace(/ /g, "")}
              nameValue = {item.toLowerCase().replace(/ /g, "")}
              children= {item}
            />
        )
      })  
    }
    </>
  )
}

export default Filter