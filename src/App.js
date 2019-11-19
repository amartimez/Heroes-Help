import React, { Component } from "react";

import "./App.css";
import SelectBox from "./Heroes/SelectBox.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { tsMethodSignature } from "@babel/types";

class App extends Component {
  /*inicializo el constructor para poder usar todos los elementos en la clase y en los componentes*/
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    /*Extraido los datos del JSON porporcionado almacenandolos en una variable llama ITems, y controlo la carga
     con una variable boolena*/
    fetch(
      "https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json"
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({
          isLoaded: true,
          items: json.Brastlewark
        });
      });
  }

  loadProfessions() {
    var { items } = this.state;
    let profesionsArray = [];
    let id = 0;
    let found = false;
    //recorro la variable con los datos del JSON y los almaceno en una nueva variable ITEM
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      found = false;
      /*Recorro la nueva variable con los datos de la array buscando las profesiones de los sujetos
       y almacenandolos en una nueva variable ITEMPROFESION que contiene el ID y las profesiones*/
      for (let x = 0; x < item.professions.length; x++) {
        let itemProfession = { value: item.professions[x], id: id };
        //Añado los datos a la nueva array con las profesiones cargadas igualando los datos a Item.Professions
        for (let y = 0; y < profesionsArray.length; y++) {
          //si los datos ya estan en la nueva array pasa al siguiente dato
          if (profesionsArray[y].value == itemProfession.value) {
            found = true;
            break;
          }
        }
        //si esta nueva profesion no existe, la almacenamos en la nueva array que es la que usara el selector box
        if (!found) {
          profesionsArray.push(itemProfession);
          id++;
        }
      }
    }

    return profesionsArray;
  }

  selectorChange(professionValue) {
    /*Esta funcion recorre de nuevo el archivo JSON almacenandolo en una variable _item */
    let items = this.state.items;
    let itemsFiltered = [];

    for (let i = 0; i < items.length; i++) {
      let _item = items[i];
      /*Despues buscamos dentro de la variable _item las profesiones y las almacenamos en la variable que 
      le pasamos a la función, para que esta haga la comparativa y almacene los datos en la nueva array creada
      itemsFiltered y carge los datos cada vez que se cumple la condición */
      for (let y = 0; y < _item.professions.length; y++) {
        if (professionValue === _item.professions[y]) {
          itemsFiltered.push(_item);
        }
      }
    }

    /* this.setState({
      isLoaded: true,
      items: itemsFiltered,
    }) */
  }

  render() {
    var { isLoaded, items } = this.state;
    //controlamos que los datos se carguen
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      /*en esta variable he almacenado la funcion para cargar los datos de los puestos de trabajo en el 
       componente selector box */
      var prof = this.loadProfessions();

      return (
        <div className="App">
          <h1>Please search about what do you need to find</h1>
          <div className="giff"></div>
          <div className="selector-box">
            <SelectBox
              name="Profesionals Avalaible"
              items={prof}
              /*No consigo hace funcionar el metodo onchange, porque 
               no he sabido programar el boton onclick del componente */
              onChange={this.selectorChange()}

              /*En el codigo siguiente es donde estructuro los datos devueltos del Json a traves de Boostrap */
            />
          </div>
          <div>
            <table class="table table-dark">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Age</th>
                  <th scope="col">Professions</th>
                  <th scope="col">Picture</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr>
                    <th scope="row" key={item.id}>
                      {item.id}
                    </th>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.professions.map(pro => pro + " , ")}</td>
                    <td>
                      <img src={item.thumbnail}></img>
                    </td>
                  </tr>
                ))}
                ;
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

export default App;
