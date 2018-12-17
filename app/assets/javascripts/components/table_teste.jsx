class TableTeste extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      [this.props.tableName + "rc"]: 0
    }
  }

  componentDidMount() {
    console.log(this.props);

    for (var i = 0; i < this.props.x; i++) {
      var row = document.querySelector("table").insertRow(-1);
      for (var j = 0; j < this.props.y; j++) {
        var letter = String.fromCharCode("A".charCodeAt(0) + j - 1);
        row.insertCell(-1).innerHTML = i && j ? "<input id='" + this.props.tableName + letter + i + "'/>" : i || letter;
      }
    }

    var DATA = {}, INPUTS = [].slice.call(document.querySelectorAll("input"));
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
    var calcCol1 = document.getElementById(this.props.tableName + "A1").innerText +
    document.getElementById(this.props.tableName + "A2").innerText +
    document.getElementById(this.props.tableName + "A3").innerText;

    var calcCol2 = document.getElementById(this.props.tableName + "B1").innerText +
    document.getElementById(this.props.tableName + "B2").innerText +
    document.getElementById(this.props.tableName + "B3").innerText;

    var calcCol3 = document.getElementById(this.props.tableName + "C1").innerText +
    document.getElementById(this.props.tableName + "C2").innerText +
    document.getElementById(this.props.tableName + "C3").innerText;

    var linha1 = (document.getElementById(this.props.tableName + "A1").innerText / calcCol1) + 
                 (document.getElementById(this.props.tableName + "A2").innerText / calcCol1) + 
                 (document.getElementById(this.props.tableName + "A3").innerText / calcCol1);

    var linha2 = (document.getElementById(this.props.tableName + "B1").innerText / calcCol2) + 
                 (document.getElementById(this.props.tableName + "B2").innerText / calcCol2) + 
                 (document.getElementById(this.props.tableName + "B3").innerText / calcCol2);

    var linha3 = (document.getElementById(this.props.tableName + "C1").innerText / calcCol3) + 
                 (document.getElementById(this.props.tableName + "C2").innerText / calcCol3) + 
                 (document.getElementById(this.props.tableName + "C3").innerText / calcCol3);
    var ponto4 = Math.round(linha1 + linha2 + linha3);

    if (ponto4  != this.props.x ) {
      // alert('dados inconsitentes');
    }
    var normLinha1 = linha1/ponto4;
    var normLinha2 = linha1/ponto4;
    var normLinha3 = linha1/ponto4;

    var validatePonto6 = Math.round(normLinha1 + normLinha2 + normLinha3);
    if (validatePonto6 != 1) {
      // alert('dados inconsitentes ponto 6');
    }
    var lamba = (normLinha1 + normLinha2 + normLinha3) + (calcCol1 + calcCol2 + calcCol3);
    var varlambaN = lamba - ponto4;
    var ic = varlambaN/(ponto4-1);
    var rc = ic/this.getIr(this.props.x);
    if (rc > 0.1) {
      alert("RC inconssitente");
    } else {
      this.setState({
        [this.props.tableName + "rc"]: rc
      });
    }
  }
  getIr(n) {
    switch (n) {
      case 1:
        1
        break;
      case 2:
        1
        break;
      case 3:
        0.58
        break;
      case 4:
        0.9
        break;
      case 5:
        1.12
        break;
      case 6:
        1.24
        break;
      default:
        1
    }
  }

  componentDidUpdate() {
    this.calculations;
  }
  render() {
    return(
      <div className={this.props.tableName}>
        <table></table>
        {/* <div id={this.props.tableName + "calc"}> *
          {this.calculations}
        </div>*/}
      </div>
    );
  }
}
