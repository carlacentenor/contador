import React, { Component } from 'react';
//Importa tu componente que vas insertar y el store que creamos en el archivo increment-reducer.js 
import Counter from '../containers/Counter';
import store from '../reducers/increment-reducer';

// En App que es nuestro componente principal le estamos insertando nuestro componente Counter (Componente Contenedor)
// Este Counter va a recibir como props a store y ahi obtiene la información de cada estado en este caso del valor de number
class App extends Component {
  render() {
    return (
      <div className="App">
          <Counter store ={store} />
      </div>
    );
  }
}

export default App;
