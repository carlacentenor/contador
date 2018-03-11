// Importamos el store
import {createStore } from 'redux';


//Estados iniciales , solo necesito el estado de number que es mi resultado , es lo que va ir cambiando 
// con los clicks
const initialState = {
  number: 0
};

// Creamos el reducer por cada acción 
// En este caso hay una sola acción y habra un sólo reducer
// Un reducer necesita un estado y una acción para retornar un nuevo estado
const reducerCounter = (state = initialState, action)=> {

  switch(action.type){
    case 'INCREMENT' : 
    return {
      number:state.number +1 // Creamos el caso con la acción declarada para este reducer, aqui podemos crear las funciones que queremos que realice para que cambie el valor de estado.
   // En este caso yo quiero que number aumente en uno con cada acción de click
    }
    default :
    return state;
  }
}

// Creamos el store que va a ser como la cajita donde se debe  guardar toda la información que cambia.
// El store es una función que recibe como parámetro la función reducer creada anteriormente 'reducerCounter'

const store = createStore(reducerCounter); 

export default store;

// exportamos este store para que el componente App lo obtenga y lo pase como parametro a nuestro Componente Counter
// y nuestro Counter obtenga así siempre la información actualizada en este caso del valor number