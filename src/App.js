import React from "react"
import axios from "axios"
import "./App.css"

class App extends React.Component {
  state = {
    data: [],
    page: 0,
    isLoading: false,
    prevY: 0,
  }

  loadMore = page => {
    this.setState({ isLoading: true })

    const url = `https://reqres.in/api/unknown?per_page=10&page=${this.state.page}`

    axios.get(url).then(res => {
      this.setState({
        data: [...this.state.data, ...res.data.data],
        isLoading: false,
      })
    })
  }

  setObserver = (entities, observer) => {
    const y = entities[0].boundingClientRect.y
    if (this.state.prevY > y) {
      const lastUser = this.state.data[this.state.data.length - 1]
      const curPage = lastUser.id
      this.loadMore(curPage)
      this.setState({ page: curPage })
    }
    this.setState({ prevY: y })
  }

  componentDidMount() {
    this.loadMore(this.state.page)

    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    }
    this.observer = new IntersectionObserver(
      this.setObserver.bind(this),
      options,
    )
    this.observer.observe(this.loadingRef)
  }

  render() {
    return (
      <div className="container">
        {console.log(window.innerHeight)}
        <div>
          <ul>
            {this.state.data.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
        <div ref={loadingRef => (this.loadingRef = loadingRef)}>
          {this.state.isLoading ? (
            <h4 className="loading">Loading...</h4>
          ) : null}
        </div>
      </div>
    )
  }
}

export default App
