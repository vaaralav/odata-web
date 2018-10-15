import OData from "./OData.js";

ReactDOM.render(
  React.createElement(OData, {
    render: ({ search, searchPhrase, results }) =>
      React.createElement("div", null, [
        React.createElement(
          "form",
          {
            key: "form",
            onSubmit: ev => {
              ev.preventDefault();
              search(ev.target.elements.organization.value);
            }
          },
          [
            React.createElement("input", { id: "organization", type: "text" }),
            React.createElement("button", { type: "submit" }, ["Search"])
          ]
        ),
        React.createElement("div", { key: "results" }, [
          React.createElement("h2", null, [
            searchPhrase ? `.fi-domainit yritykselle ${searchPhrase}` : null
          ]),
          React.createElement("ul", null, [
            results.map(({ Name, GrantDate }) =>
              React.createElement("li", { key: Name }, [`${Name}.fi`])
            )
          ])
        ])
      ])
  }),
  document.getElementById("root")
);
