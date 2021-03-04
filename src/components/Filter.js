import Checkbox from './Checkbox'

function Filter(filterName){
  return(
    <>
      {!!filterName && filterName.length > 0 && filterName.map(( item )  => {
        return (
            <Checkbox
              nameFor = {item}
              nameId = {item}
              nameValue = {item}
              children= {item}
            />
        )
      })  
    }
    </>
  )
}

export default Filter