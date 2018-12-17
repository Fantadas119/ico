// import 'bootstrap/dist/css/bootstrap.css';

class CiberSec extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      t1l1c2: 6,
      t1l1c3: "",
      t1l2c1: "",
      t1l2c3: "",
      t1l3c1: 4,
      t1l3c2: 5,
      errorMsg: "",


    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    
  }


  handleChange(event) {
    console.log("handleChange");
    let stateName = event.target.name;
    let value = event.target.value;
    console.log(this.state);
    const re = /^[0-9\b]+$/;
    if ( re.test(value)) {
      this.setState({
        [stateName]: value,
        errorMsg: ""
      });
    } else {
      this.setState({
        errorMsg: "Por favor introduza somente numeros de 0 a 9"
      });
    }
    // this.setState({
    //   l1c3: 1/this.state.l3c1,
    //   l2c1: 1/this.state.l1c2,
    //   l2c3: 1/this.state.l3c2
    // });
    this.updteCalculation();
  }
  handleClick(event) {
    console.log("handleChange");
    let stateName = event.target.name;
    let value = event.target.value;
    console.log(stateName, value);
    if(stateName == "t1l1c2") {
      this.setState({t1l2c1: 0});
    }
    this.setState({[stateName]: ""});
    if(stateName == "") {
      console.log("vazio")
    }
  }

  updteCalculation() {
    var sumt1Col1 = this.state.t1l1c1 + this.state.t1l2c1 + this.state.t1l3c1;
    var sumt1Col2 = this.state.t1l1c2 + this.state.t1l2c2 + this.state.t1l3c2;
    var sumt1Col3 = this.state.t1l1c3 + this.state.t1l2c3 + this.state.t1l3c2;
  }




  render() {
    return (
      <div>
        <h1>"Alternativas"</h1>
        <h3>{this.props.data[0]}</h3>
        <h3>{this.props.data[1]}</h3>

        <table border="1">
          <tbody>
            <tr>
              <th></th>
              <th>Criterio 1</th>
              <th>Criterio 2</th>
              <th>Criterio 3</th>
            </tr>
            <tr>
              <td>Criterio 1</td>
              <td>{1}</td>
              <td><input type="text" name="t1l1c2" value={this.state.t1l1c2} onClick={this.handleClick} onChange={this.handleChange}/></td>
              <td>{this.state.t1l1c3}</td>
            </tr>
            <tr>
              <td>Criterio 2</td>
              <td>{this.state.t1l2c1}</td>
              <td>{1}</td>
              <td>{this.state.t1l2c3}</td>
            </tr>
            <tr>
              <td>Criterio 3</td>
              <td><input type="text" name="t1l3c1" value={this.state.t1l3c1} onClick={this.handleClick} onChange={this.handleChange}/></td>
              <td><input type="text" name="t1l3c2" value={this.state.t1l3c2} onClick={this.handleClick} onChange={this.handleChange}/></td>
              <td>{1}</td>
            </tr>
          </tbody>
        </table>
        <div>{this.state.errorMsg}</div>
      </div>
    );
  }
}