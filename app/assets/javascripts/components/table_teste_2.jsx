 class TableTeste2 extends React.Component {
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
        row.insertCell(-1).innerHTML = i && j ? "<input class='" + this.props.tableName + "' id='" + this.props.tableName + letter + i + "'/>" : i || letter;
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
    console.log("calculations");
    var comp = this;
    INPUTS.forEach(function (elm) {
      console.log("elm", elm);
      comp.setState({
        [elm.id]: parseFloat(elm.value)
      });  
    });
    console.log("tableName", comp.props.tableName);
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
        console.log("numberToLetter", numberToLetter);
        console.log("state", comp.state);
        console.log("strinf state", comp.props.tableName+numberToLetter+indexC);
        /* const [calcCol + indexL]  += comp.state[numberToLetter+indexC] ; */
        dynamicVar["calCol"+indexL] += comp.state[comp.props.tableName+numberToLetter+indexC] ;
      }
      
    }
    console.log("dynamicVar", dynamicVar);
    var calcCol1 = A1 + A2 + A3;
    console.log("calcCol1",calcCol1);
    
    var calcCol2 = B1 + B2 + B3;
    console.log("calcCol2", calcCol2);
    
    var calcCol3 = C1 + C2 + C3;
    console.log("calcCol3", calcCol3);



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
    console.log("sumNormCol1", sumNormCol1);
    var sumNormCol2 = normB1 + normB2 + normB3;
    console.log("sumNormCol2", sumNormCol2);
    var sumNormCol3 = normC1 + normC2 + normC3;
    console.log("sumNormCol3", sumNormCol1);

    if ((sumNormCol1 != 1) || (sumNormCol1 != 1) || (sumNormCol1 != 1)) {
      this.setState({
        [this.props.tableName + "Error"]: "Soma da coluna de valores normalizados é diferente de 1"
      });
    }
    // ponto 4
    var normLinha1 = normA1 + normB1 + normC1;
    var normLinha2 = normA2 + normB2 + normC2;
    var normLinha3 = normA3 + normB3 + normC3;
    console.log("normLinha1", normLinha1);
    console.log("normLinha2", normLinha2);
    console.log("normLinha3", normLinha3);

    // ponto 5
    var ponto5 = Math.round(normLinha1 + normLinha2 + normLinha3);
    if(ponto5 != (this.props.x -1)) {
      this.setState({
        [this.props.tableName + "Error"]: "Soma das linha de valores normalizados é diferente de n da matriz"
      });
    }

    // ponto 6
    var vectNormlinha1 = normLinha1/ponto5;
    console.log("vectNormlinha1", vectNormlinha1);
    var vectNormlinha2 = normLinha2/ponto5;
    console.log("vectNormlinha2", vectNormlinha2);
    var vectNormlinha3 = normLinha3/ponto5;
    console.log("vectNormlinha3", vectNormlinha3);


   
    var lamba = ((vectNormlinha1 * calcCol1) + (vectNormlinha2 * calcCol2) + (vectNormlinha3 * calcCol3));
    console.log("lamba", lamba);
    var varlambaN = lamba - ponto5;
    console.log("varlambaN", varlambaN);
    var ic = varlambaN/(this.props.x - 2);
    console.log("ic", ic);
    var rc = ic/this.getIr(this.props.x - 1);
    console.log("IR for x->3",this.getIr(this.props.x - 1));
    console.log("rc", rc);
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
    console.log("handleClick");
    this.calculations(tableName);
  }
  handleChange() {
    console.log("handleChange");
    this.calculations();
  }
  render() {
    return(
      <div className={this.props.tableName}>
        <table id={this.props.tableName}></table>
        <button onClick={this.handleClick}>validate</button>
        <div>{this.state[this.props.tableName + "Error"]}</div>
        <div>{this.state[this.props.tableName + "Success"]}</div>
        {/* <div id={this.props.tableName + "calc"}> *
          {this.calculations}
        </div>*/}
      </div>
    );
  }
}
