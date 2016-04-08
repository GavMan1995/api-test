class GoogleSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {search: "", results: []}
    this.startSearch = this.startSearch.bind(this);
  }

  getSpots() {
    $.ajax({
      url: '/search',
      type: 'GET',
      data: {search: this.state.search}
    }).done(data => {
      this.setState({results: data, search: ""})
    }).fail(data => {
      console.log(data)
    });

  }

  startSearch(e) {
    e.preventDefault();
    this.setState({
      search: this.refs.search.value
    });
  }

  newSearch() {
    if(this.state.search != ""){
      this.getSpots();
    }
  }

  results() {
    if(this.state.results != []){
      return this.state.results.map( result => {
        return(
          <div>
            <h1>{result.name}</h1>
            <h3>{result.formatted_address}</h3>
          </div>
        );
      });
    }
  }


  render() {
    return(
      <div>
        <form onSubmit={this.startSearch}>
          <input type="text" placeholder="search for food" ref="search"/>
          <button type="submit">Search</button>
        </form>
        {this.newSearch()}
        {this.results()}
      </div>
    )
  }
}

//
// <!-- <% @spots.each do |spot| %>
//  <form>
//    <input type="text" placeholder="search for food" />
//    <button type="submit">Search</button>
//  </form>
//
//     <h1><%= spot.name %></h1>
//     <iframe
//       width="600"
//       height="450"
//       frameborder="0" style="border:0"
//       src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyDZa0tAkB9vBNbJXxcxsV3Yjm137cNXk8s&origin=370+south+300+west+salt+lake+city&destination=<%= spot.formatted_address.gsub(' ', '+') %>" allowfullscreen>
//     </iframe>
//     <h3>address: <%= spot.formatted_address %></h3>
//     <h3>rating: <%= spot.rating %></h3>
//     <h3><%= spot.vicinity %></h3>
//
// <% end %> -->
