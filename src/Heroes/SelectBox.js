import React from "react";
import "./styles.css";
import "../App.js";

class SelectBox extends React.Component {
  /*inicializo el constructor para poder usar todos los elementos en la clase y en los componentes*/
  state = {
    ...this.props,
    items: this.props.items || [],
    showItems: false,
    selectedItem: this.props.items && this.props.items[0],
    showResult: 0
  };

  dropDowm = () => {
    /*Realizo la accion del desplegable con las opciones*/
    this.setState(prevState => ({
      showItems: !prevState.showItems
    }));
  };

  selectItem = item =>
    this.setState({
      /*Identifico la opción selecionada y oculto los demas items*/
      selectedItem: item,
      showItems: false
    });

  render() {
    const { items, selectedItem } = this.state;

    return (
      <div
        className="selec-box--box"
        style={{ width: this.state.width || 400 }}
      >
        <div className="select-box--container">
          <div className="select-box--selected-item">
            {this.state.selectedItem.value}
          </div>
          <div className="select-box--arrow" onClick={this.dropDowm}>
            <spam
              className={`${
                this.state.showItems
                  ? "select-box--arrow-up"
                  : "select-box--arrow-down"
              }`}
            />
          </div>
          <div
            /* onChange={this.onChange} value={selectedItem.value} */ style={{
              display: this.state.showItems ? "block" : "none"
            }}
            className="select-box--items"
          >
            {items.map(item => (
              <div
                /* En este div es donde cambiamos la seleccion del usuario, el cuial sustituye la opcion actual 
              por la seleccionada   */
                key={item.value}
                onClick={() => this.selectItem(item)}
                className={selectedItem === item ? "selected" : ""}
              >
                {item.value}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

/* export const selCh = (n)=>{
  selectorChange(slideIndex += n);
} */

export default SelectBox;
