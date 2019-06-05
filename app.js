function ListItem({ emoji, item }) {
  return (
    <li className="list-item">
      {emoji} {item}
    </li>
  );
}

function List({ fruits }) {
  return (
    <ul className="list">
      {fruits.map(fruit => {
        return (
          <ListItem key={fruit.id} item={fruit.type} emoji={fruit.emoji} />
        );
      })}
    </ul>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      fruits: []
    };
  }

  componentDidMount() {
    fetch(
      "https://my-json-server.typicode.com/thoughtworks-jumpstart/api/fruits"
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          fruits: data
        });
      });
  }

  handleChange(event) {
    this.setState({
      query: event.target.value
    });
  }

  render() {
    const fruits = this.state.fruits.filter(fruit => {
      return fruit.type.indexOf(this.state.query) > -1;
    });

    return (
      <React.Fragment>
        <h1>🧺 Fruit Basket</h1>
        <input
          className="search"
          type="text"
          placeholder="Search"
          onChange={event => this.handleChange(event)}
        />
        <List fruits={fruits} />
      </React.Fragment>
    );
  }
}

const app = <App />;

const root = document.getElementById("root");

ReactDOM.render(app, root);
