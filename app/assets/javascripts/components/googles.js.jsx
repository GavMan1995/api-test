class GoogleSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {search: "", results: [], price: "1", distance: "1609.34", foodInputs: 1}
    this.setPrice = this.setPrice.bind(this);
    this.setDistance = this.setDistance.bind(this);
    this.searchFields = this.searchFields.bind(this);
    this.getSpots = this.getSpots.bind(this);
  }

  getSpots(e) {
    e.preventDefault();

    let searchValue = '';
    for(let i = 0; i < Object.keys(this.refs).length; i++){
      if(i == Object.keys(this.refs).length - 1) {
        searchValue += `${this.refs[Object.keys(this.refs)[i]].value.trim()}`
      }
     else {
       searchValue += `${this.refs[Object.keys(this.refs)[i]].value.trim()}|`;
     }
    }

    console.log(searchValue);
    $.ajax({
      url: '/search',
      type: 'GET',
      data: {search: searchValue, price: this.state.price, distance: this.state.distance}
    }).done(data => {
      this.setState({results: data, search: ""})
    }).fail(data => {
      console.log(data)
    });

  }

  results() {
    let price = parseInt(this.state.price)
    if(this.state.results != []){
      return this.state.results.map( result => {
        if (result.price_level <= price) {
          return(
            <div>
              <h1>Name: {result.name}</h1>
              <h3>Address: {result.vicinity}</h3>
              <h3>Price: {result.price_level}</h3>
            </div>
          );
        }
      });
    }
  }

  setPrice(e) {
    let value = e.target.value;
    this.setState({price: value});
  }

  setDistance(e) {
    let value = e.target.value;
    this.setState({distance: value});
  }

  searchFields() {
    let foodInputs = [];
    for(let i = 0; i < this.state.foodInputs; i++) {
      foodInputs.push(<div><input key={`food-input-${i}`} type="text" placeholder="search for food" ref={`search-${i}`} /></div>)
    }
    return(foodInputs);
  }


  render() {
    return(
      <div>
        <form onSubmit={this.getSpots}>
          {this.searchFields()}
          <br/>
            <input type="radio" name="price" value="1" defaultChecked onChange={this.setPrice}/> $
            <input type="radio" name="price" value="2" onChange={this.setPrice}/> $$
            <input type="radio" name="price" value="3" onChange={this.setPrice}/> $$$
          <br/>
            <input type="radio" name="distance" value="1609.34" defaultChecked onChange={this.setDistance}/> walking
            <input type="radio" name="distance" value="8046.72" onChange={this.setDistance}/> 5 miles
            <input type="radio" name="distance" value="32186.9" onChange={this.setDistance}/> 20 miles
            <input type="radio" name="distance" value="80467.2" onChange={this.setDistance}/> 50 miles
          <br/>
          <button type="submit">Search</button>
          <button type='button' onClick={() => this.setState({foodInputs: this.state.foodInputs + 1})}>Add More Food</button>
        </form>
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
