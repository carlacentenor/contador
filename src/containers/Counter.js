import React, { Component } from 'react';
// importamos el connect que va  a conectar los componentes con Redux
import {connect} from 'react-redux';
// importamos las acciones
import {increment} from '../actions/actions-counter'

class Counter extends Component {
  render() {
    return (
      <div className="Counter">
        <div>
         <p>Número:{this.props.number} </p>
       </div>
       <button  onClick={this.props.incrementNumber}>+</button>
      </div>
    );
  }
}

// Obtiene los estados
// Desde esta función manda el estado al reducer
function mapStateToProps(state) {
  console.log('mapStateToProps', state);
  return {
       number: state.number,
  }
}

//Dispara las acciones
// Por lo que investigue retorna funciones que dentro de estas esta el dispatch() donde lo colocamos la acción que queremos que haga
// este increment lo importamos arriba
// Desde esta función manda la acción al reducer
function mapDispatchToProps(dispatch) {
return {
  incrementNumber: () => {
     dispatch(increment)
    }
  }
}

// Connect es una Función de alto nivel recibe mapStareToProps(solo lectura) y mapDispatchToProps(disparador de acciones) y el componente(en este caso Counter)
// Aqui conecta lo mandado al reducer ( la acción y el estado) para que en el reducer genere el nuevo estado
export default connect(mapStateToProps,mapDispatchToProps)(Counter);