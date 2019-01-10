 class TableTeste1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      [this.props.tableName + "rc"]: 0,
      [this.props.tableName + "Error"]: "",
      [this.props.tableName + "Success"]: ""
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    for (var i = 0; i < this.props.x; i++) {
      var row = document.querySelector("table").insertRow(-1);
      for (var j = 0; j < this.props.y; j++) {
        var letter = String.fromCharCode("A".charCodeAt(0) + j - 1);
        if((i == 0 && j== 1) || (i == 1 && j==0)) {
          row.insertCell(-1).innerHTML = i && j ? "<input/>" : "Custo";
        } else if((i == 0 && j== 2) || (i == 2 && j==0)) {
          row.insertCell(-1).innerHTML = i && j ? "<input/>" : "Risco";
        } else if((i == 0 && j== 3) || (i == 3 && j== 0)) {
          row.insertCell(-1).innerHTML = i && j ? "<input/>" : "Similaridade";
        }else {
          row.insertCell(-1).innerHTML = i && j ? "<input class='" + this.props.tableName + "' id='" + this.props.tableName + letter + i + "'/>" : i || letter;
        }
      }
    }

    var DATA = {}, INPUTS = [].slice.call(document.querySelectorAll("input."+ this.props.tableName));
    INPUTS.forEach(function (elm) {
      elm.onfocus = function (e) {
        e.target.value = localStorage[e.target.id] || "";
      };
      elm.onblur = function (e) {
        localStorage[e.target.id] = e.target.value;
        computeAll();
      };
      var getter = function () {
        var value = localStorage[elm.id] || "";
        if (value.charAt(0) == "=") {
          with (DATA) return eval(value.substring(1));
        } else { return isNaN(parseFloat(value)) ? value : parseFloat(value); }
      };
      Object.defineProperty(DATA, elm.id, { get: getter });
      Object.defineProperty(DATA, elm.id.toLowerCase(), { get: getter });
    });
    (window.computeAll = function () {
      INPUTS.forEach(function (elm) { try { elm.value = DATA[elm.id]; } catch (e) { } });
    })();
  }
  calculations() {
    var comp = this;
    var INPUTS = [].slice.call(document.querySelectorAll("input."+ this.props.tableName));
    var comp = this;
    INPUTS.forEach(function (elm) {
      comp.setState({
        [elm.id]: parseFloat(elm.value)
      });  
    });
    var A1 = parseFloat(document.getElementById(this.props.tableName + "A1").value);
    var A2 = parseFloat(document.getElementById(this.props.tableName + "A2").value);
    var A3 = parseFloat(document.getElementById(this.props.tableName + "A3").value);
    var B1 = parseFloat(document.getElementById(this.props.tableName + "B1").value);
    var B2 = parseFloat(document.getElementById(this.props.tableName + "B2").value);
    var B3 = parseFloat(document.getElementById(this.props.tableName + "B3").value);
    var C1 = parseFloat(document.getElementById(this.props.tableName + "C1").value);
    var C2 = parseFloat(document.getElementById(this.props.tableName + "C2").value);
    var C3 = parseFloat(document.getElementById(this.props.tableName + "C3").value);

    // Ponto 2 Matriz de comparação par a par dos critérios:
    var dynamicVar = new Object;
    for (let indexL = 1; indexL < this.props.y; indexL++) {
      for (let indexC = 1; indexC < this.props.x; indexC++) {
        // ver s A=65 ansci code ou assim,B=
        // para o A == String.fromCharCode(indexL +64)
        var numberToLetter = String.fromCharCode(indexL + 64);
        dynamicVar["calCol"+indexL] += comp.state[comp.props.tableName+numberToLetter+indexC] ;
      }
    }

    var calcCol1 = A1 + A2 + A3;
    var calcCol2 = B1 + B2 + B3;
    var calcCol3 = C1 + C2 + C3;

    // 3)Normalizacao dos valores
    var normA1 = A1 / calcCol1;
    var normA2 = A2 / calcCol1;
    var normA3 = A3 / calcCol1;
    var normB1 = B1 / calcCol2;
    var normB2 = B2 / calcCol2;
    var normB3 = B3 / calcCol2;
    var normC1 = C1 / calcCol3;
    var normC2 = C2 / calcCol3;
    var normC3 = C3 / calcCol3;

    // 3.2 Validadar colunas
    var sumNormCol1 = normA1 + normA2 + normA3;
    var sumNormCol2 = normB1 + normB2 + normB3;
    var sumNormCol3 = normC1 + normC2 + normC3;

    if ((sumNormCol1 != 1) || (sumNormCol1 != 1) || (sumNormCol1 != 1)) {
      this.setState({
        [this.props.tableName + "Error"]: "Soma da coluna de valores normalizados é diferente de 1"
      });
    }
    // ponto 4
    var normLinha1 = normA1 + normB1 + normC1;
    var normLinha2 = normA2 + normB2 + normC2;
    var normLinha3 = normA3 + normB3 + normC3;

    // ponto 5
    var ponto5 = Math.round(normLinha1 + normLinha2 + normLinha3);
    if(ponto5 != (this.props.x -1)) {
      this.setState({
        [this.props.tableName + "Error"]: "Soma das linha de valores normalizados é diferente de n da matriz"
      });
    }

    // ponto 6
    var vectNormlinha1 = normLinha1/ponto5;
    var vectNormlinha2 = normLinha2/ponto5;
    var vectNormlinha3 = normLinha3/ponto5;
    var lamba = ((vectNormlinha1 * calcCol1) + (vectNormlinha2 * calcCol2) + (vectNormlinha3 * calcCol3));
    var varlambaN = lamba - ponto5;
    var ic = varlambaN/(this.props.x - 2);
    var rc = ic/this.getIr(this.props.x - 1);

    if (rc > 0.1) {8
      this.setState({
        [this.props.tableName + "Error"]: "RC inconsistente",
        [this.props.tableName + "Success"]: ""
      });
    } else {
      this.setState({
        [this.props.tableName + "rc"]: rc,
        [this.props.tableName + "Success"]: "Dados validos",
        [this.props.tableName + "Error"]: ""
      });
    }
  }
  getIr(n) {
    switch (n) {
      case 1:
       return 1
        break;
      case 2:
        return 1
        break;
      case 3:
        return 0.58
        break;
      case 4:
        return 0.9
        break;
      case 5:
        return 1.12
        break;
      case 6:
        return 1.24
        break;
      default:
        return 1
    } 
  }

  handleClick(tableName) {
    this.calculations(tableName);
  }
  handleChange() {
    this.calculations();
  }
  render() {
    return(
      <div className={this.props.tableName}>
        <table id={this.props.tableName}></table>
        <button onClick={this.handleClick}>validate</button>
        <div>{this.state[this.props.tableName + "Error"]}</div>
        <div>{this.state[this.props.tableName + "Success"]}</div>
      </div>
    );
  }
}
