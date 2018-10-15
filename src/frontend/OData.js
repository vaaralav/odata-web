const States = {
  OK: "OK",
  PENDING: "PENDING",
  ERROR: "ERROR"
};

export default class OData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      request: {
        state: States.OK
      },
      searchPhrase: "",
      results: [],
      errors: []
    };
  }

  onSearch(phrase) {
    console.log(`Searching ${phrase}`);
    this.setState(() => ({
      searchPhrase: phrase,
      state: States.PENDING
    }));

    fetch(`/api/domains/${phrase}`)
      .then(res => res.json())
      .then(data => {
        const results = data;
        this.setState(() => ({
          state: States.OK,
          results,
          errors: [],
          searchPhrase: phrase
        }));
      })
      .catch(err => {
        console.error(err);
        this.setState(() => ({
          state: States.ERROR,
          results: [],
          errors: [err]
        }));
      });
  }

  render() {
    const search = phrase => this.onSearch(phrase);
    return this.props.render(Object.assign({}, this.state, { search }));
  }
}

OData.States = States;
