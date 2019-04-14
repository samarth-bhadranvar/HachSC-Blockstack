import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './EditMe.css'
import Card from './Card'
import { ANIMALS, TERRITORIES } from './constants'

class EditMe extends Component {

  constructor(props) {
    super(props)
    this.selectAnimal = this.selectAnimal.bind(this)
    this.selectTerritory = this.selectTerritory.bind(this)
    this.state = {
      selectedAnimal: false,
      selectedTerritory: false
    }
  }

  selectAnimal(e, animal) {
    e.preventDefault()
    this.setState({selectedAnimal: true})
    this.props.saveMe(Object.assign({}, this.props.me, { animal }))
  }

  selectTerritory(e, territory) {
    e.preventDefault()
    this.setState({selectedTerritory: true})
    this.props.saveMe(Object.assign({}, this.props.me, { territory }))
  }

  render() {
    const me = this.props.me
    let myAnimal = null
    let myTerritory = null
    if (me) {
      myAnimal = this.props.me.animal
      myTerritory = this.props.me.territory
    }
    const selectedAnimal = this.state.selectedAnimal
    const selectedTerritory = this.state.selectedTerritory
    const completed = selectedAnimal && selectedTerritory
    const username = this.props.username

    return (
      <div className="EditMe container">
      <h1>Your Documents</h1>
      <p></p>
        <h3>Your Passport</h3>
        <div className="row card-deck">
        { ANIMALS.map((animal, index) => {
          const selected = myAnimal && myAnimal.id === animal.id
          return (
            <Card path='/animals/' key={index} item={animal} select={this.selectAnimal} selected={selected} />
                )
          })
        }
        </div>
        <h3 className="select-territory">Your Travel VISAs</h3>
        <div className="card-deck">
        { TERRITORIES.map((territory, index) => {
          const selected = myTerritory && myTerritory.id === territory.id
          return (
            <Card path='/territories/' key={index} item={territory} select={this.selectTerritory} selected={selected} />
                )
          })
        }
        </div>
        <div className="container row">
          <div className="col-lg-12 done">
            <p>
              <Link to={`/kingdom/${username}`} className="btn btn-primary" disabled={!completed}>Done</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default EditMe