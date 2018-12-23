/* 
const Main = () =>
  (<div>
    <div style={{ width: 'max-content' })>
      <TableTeste1 x={4} y={4} tableName="criterioP" />
    </div>
    <br></br>
    <p></p>
    <p></p>
    <p></p>
    <div style={{ width: 'max-content' })>
      <TableTeste1 x={4} y={4} tableName="criterioS1"/>
    </div>
  </div>)
 */

class Main extends React.Component {
/*   calcAlternatives() {

  } */
  render() {
    return(
      <div>
        <div><TableTeste1 x={4} y={4} tableName="criterioP" /></div>
        <br></br>
        <p></p>
        <div><TableTeste2 x={5} y={5} tableName="criterioS1" /></div>
      </div>
    );
  }
}