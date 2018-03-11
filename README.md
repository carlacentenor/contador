# Contador con redux y react
## Hice el intento pero a ver si entienden lo que entendí

Pasos :
1. Despues de identificar los estados iniciales,    acciones y componentes e instalar redux :
 Crear las carpetas :
  * actions : Creamos el archivo donde van a estar las acciones
  * components : Creamos todos los componentes con react los presentacionales o flojos jiji
  * containers : Los componentes que van a tener alguna acción van aca
  * reducers : Los archivos reducer, dice en lo que he leido es que es un reducer por cada acción. En este caso hay uno porque tengo una acción.
2. Cree mi componente Counter.js en la carpeta container porque este componente va a tener la acción de incrementar. Un componente común y silvestre.

```javascript
import React, { Component } from 'react';

class Counter extends Component {
  render() {
    return (
      <div className="Counter">
        <div>
         <p>Número:</p>
       </div>
       <button>Aumentar</button>
      </div>
    );
  }
}

export default Counter;

```
3. Coloque mi componente dentro del componente App.js

```javascript
import React, { Component } from 'react';
import Counter from '../containers/Counter';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Counter/>
      </div>
    );
  }
}
export default App;

```
4. Hasta ahi todo normal, para efectos de orden coloque mi App.js en la carpeta components , como es un componente mas lo puse ahi. y Claro importe el Componente Counter, sino no lo reconoce.

5. Luego creamos las acciones en este caso yo tengo solo una : "incrementar". y creo un archivo actions-counter.js en la carpeta actions, y creo mi objeto de acción incrementar con su tipo.
```javascript

export  const increment = {
  type: 'INCREMENT'
  
}

```
Le pongo export porque lo voy a llamar desde otros archivos.

6. Luego vamos a crear los reducer, que como hemos leido y reeleido el reducer recibe un estado y acción y devuelve un nuevo estado, o algo así.
En mi carpeta reducer creo mi archivo increment-reducer.js que es el reducer de mi acción incrementar.

7. En este archivo vamos a crear el store. En terminos bonitos lei que es la tiendita donde guarda toda la información y la devuelve al componente. Entonce como quiero esa tienda actualizada vamos a crear lo siguiente.

* Importamos el createstore de redux

```javascript
import {createStore } from 'redux'; 
```

* Declaramos nuestros estados iniciales
En mi caso el 'number' es lo único que va a cambiar cuando yo hago click.

```javascript
const initialState = {
  number: 0
};
```
* Creo mi función reducer , recibe dos parametros mi estado y acción.
Dentro des este reducer se establece un switch con los nombre de tipos de acciones que hemos creado antes, para que sepa que hacer cuando llega una acción determinada.
Es aqui donde entra nuestros conocimiento de javascript porque en el return tu puedes hacerle al valor del state lo que tu quieras : sumarle, restarle , multiplicarle, cambiarle el valor, poner una función, etc. 
En este caso yo quiero solo que cuando le presionen click se le sume 1.
y puedes tener muchos casos pero al final un default retornando el state. Es como asegurarte que ante cualquier caso siempre se devuelva algo.

```javascript
const reducerCounter = (state = initialState, action)=> {

  switch(action.type){
    case 'INCREMENT' : 
    return {
      number:state.number +1 
    }
    default :
    return state;
  }
}


```
* Luego creamos nuestra función store. Recuerda ese createStore lo importamos arriba es una función de redux. Aqui estamos creando nuestra tiendita con los productos necesarios : en este caso nuestro producto estrella  el reducer.

El store va a guardar lo que obtiene como resultado del reducer y lo va a mandar al componente, para que lo visualicemos.

```javascript
const store = createStore(reducerCounter); 
export default store;
```

8. Aqui terminamos todo en el reducer y toda nuestra información ya esta en el store, ahora solo falta que el componente la obtenga . Vamos a nuestro componente Counter.js
En nuestro componente Conter tenemos que conectarlo con redux para que obtenga la info de store asi que necesitamos al connect.

* Importamos el connect
```javascript
import {connect} from 'react-redux';
```
* Importamos las acciones que vamos a usar en este componente
```javascript
import {increment} from '../actions/actions-counter'
```
* Creamos las dos funciones que necesitamos para el connect : el mapStateToProps y el mapDispatchToProps.

* Creamos nuestra función mapStateToProps que obtiene los estados, siempre recibe de parametro el state.

``` javascript
function mapStateToProps(state) {
   return {
       number: state.number,
  }
}
```
* Creamos nuestra función mapDispatchToProps que manda a ejecutar las acciones.
* En esta función siempre recibe el dispatch de parametro.
y en su return declaras la función que va a mandar el tipo de acción al reducer para que ejecute el cambio de estado.
Dentro de esta función se coloca el dispatch() y como parametro nuestra acción importada al principio. para cada acción puedes crear otra función con otra acción y asi.
```javascript
function mapDispatchToProps(dispatch) {
return {
  incrementNumber: () => {
     dispatch(increment)
    }
  }
}

```

* Luego es export final va a cambiar porque queremos exportar el connect para que funcione todo
Recuerda que el connect es un función de alto nivel que tiene las dos funciones anteriores declaras. y como parametro el componente al cual se le va a inyectar la información en este caso Counter. Todo esto traducido en esta linea.

Lei que a veces necesitamos declarar solo una , pero hay que saber cuando poner las dos y solo una.
Si solo quieres lectura de datos sin accion el mapStateToProps es suficiente , la creas solita y solita la pones en el connect.

Si quieres lectura y accion colocas las dos, algo asi lei.  
En este caso quiero las dos porque necesito ver la info actualizada con la acción del click.

```javascript
export default connect(mapStateToProps,mapDispatchToProps)(Counter);
```
* Y ahora donde colocas el evento, bueno este el momento que me dio felicidad porque vi funcionar mi boton jajaja.
Colocamos las props number en la etiqueta p, ya que ha quiero ver mi valor cambiando

y en el boton Colocamos el evento onClick, en este evento colocamos this.props.incrementNumber, recuerdas que la función "incrementNumber" la creamos abajo dentro de  mapDispatchToProp , bueno ahi esta ahora si la llamamos para que funcione.

```javascript
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

```

9. Ahora falta lo último. y creo más importante , nuestro insertar nuestro store, porque sino nuestra tiendita no va a poder vender su información .

Vamos al app.js ya que ahi esta nuestro componente declarado y alojado.

* Importamos el store 
```javascript
import store from '../reducers/increment-reducer';

```
* Ahora la info del store tiene que entrar como props a Counter para que obtenga toda la información.

```javascript
class App extends Component {
  render() {
    return (
      <div className="App">
          <Counter store ={store} />
      </div>
    );
  }
}

```
y ya esta con eso ya funciona yeeee

10. Esto lo hice leyendo y viendo tutoriales , pero aun hay dudas porque como este ejemplo es basico hay cosas que aun no tengo claras para componente mas avanzados pero creo que practicando esto se puede empezar a practicar con react-redux. Lo siguiente que hice fue crear mas botones mas acciones para ver la secuencia mas dinamica.

Espero les sirva, no se si esta siguiendo las buenas practicas pero es lo que entendí.
