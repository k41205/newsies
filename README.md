# full-stack interview

### Description

Welcome! This is a front-end & back-end code challenge created by Celtiberian Solutions S.L.

We want to evaluate your coding skills as well as your creativity.

We recommend Express JS and React JS, but you can suggest any alternative previously.

### GOAL

The goal of the application is to have some working code that can be presented in front of the development team. In order to do that, we are going to ask for a very simple app that has a backend and client. Feel free to use the tools you feel more comfortable with for both (back & front), but hey must be separated and use SPA (Single Page Application).

Try to the tool can be easily run in our machines.

### TODO

1 - Build a back-end that allows you to create, read, update and delete a list of titles of newspapers. They must be persisted in the database. Each object will have:

- id
- title
- image (you can use external url or stored files)
- publisher (specific model/schema)
- link (url)
- abstract
- creation date
- languages (multiple are allowed)

##### Example:

```
{
	"id": 2,
	"title": "Michigan City dispatch.",
	"image": "public/image/michigan.png",
	"link": "https://www.britannica.com/place/Michigan",
	"abstract": "Michigan, constituent state of the United States of America. Although by the size of its land Michigan ranks only 22nd of the 50 states, the inclusion of the Great Lakes waters over which it has jurisdiction increases its area considerably, placing it 11th in terms of total area. The capital is Lansing, in south-central Michigan. The state's name is derived from michi-gama, an Ojibwa (Chippewa) word meaning 'large lake.'",
	"publisher": {
		"id": 7,
		"name": "Rob Jr.",
		"joined_date": "2015-07-06T11:22:37Z"
	},
	"languages": ["en", "es", "fr"],
	"creation_date": "2019-08-05T12:12:44Z"
}
```

2 - Build an interactive web page. The app will use your custom API in
order to fetch data. The goal of the app is to look for some terms using the API, and then display the results in a list. This is a sample
request, in which we look for the titles of newspapers that contain the term 'michigan'.

```
http://localhost:8000/titles/?terms=michigan&format=json
```

- The page must contain a search box, so that the user can introduce text.

- The data fetched from the API must be stored in session history.

- The data fetched should be displayed in a table or a list. That table/list component must read the data from the store.

- The usage of function components and hooks is preferred over class components.

### Extra

You can add some of this suggested extras.

- A way to populate the DB easily

- Handle API pagination

- Handle API filtering

- Use some beautiful UI components from a library (like [Ant Design](https://ant.design/docs/react/introduce), [React Bootstrap](https://react-bootstrap.github.io/), ...)

- Unit test

- Suggest how to deploy this in a production environment

This are just some suggestion. Feel free to add whatever you want to.
