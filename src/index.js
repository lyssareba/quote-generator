import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import {Grid, Row, Col, Button, Jumbotron} from 'react-bootstrap'
import Spinner from './Spinner'
import axios from 'axios'
import './index.css'

const {string} = PropTypes;
const propTypes = {
  author: string.isRequired,
  link: string.isRequired,
  text: string.isRequired,
}
class Load extends React.Component {
  render() {  
    return(
      <Col xs={12}>
        <div className="text">
          {this.props.text}
        </div>
        <div className="author">  
          {this.props.author}
        </div>
        <div className="link">
          <a href={this.props.link}>Quote Link</a>
        </div>
      </Col>
    );
  }
}
Load.propTypes = propTypes;

class Quote extends React.Component {
  constructor(){
    super();
    this.state = {
      quoteData: {
        quoteAuthor: '',
        quoteText: '',
        quoteLink: '',
      },
      isLoading: true,
    };
    this.api = this.api.bind(this);
  }

  componentWillMount(){
    this.api();
  }

  api() {
    const myURL = 'http://api.forismatic.com/api/1.0/?&method=getQuote&format=json&lang=en';
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const temp = Object.assign({}, this.state.quoteData);
    
    axios.get(proxy + myURL)
    .then((res)=>{
      temp.quoteAuthor = res.data.quoteAuthor;
      temp.quoteText = res.data.quoteText;
      temp.quoteLink = res.data.quoteLink;
      this.setState({ quoteData: temp });
      if(this.state.quoteData.quoteAuthor !== ''){
        this.setState({ isLoading: false });
      }
      console.log(this.state.quoteData);
    })
    .catch((err) =>
      console.log(err),
    );
  }
  render () {
    console.log(this.state.isLoading);
    return (this.state.isLoading) 
    ? (
      <div className="flex-centered">
        <Spinner />
      </div>
      ) 
      : (
      <Grid fluid>
        <Jumbotron>
          <Row>
            <Load 
              author={this.state.quoteData.quoteAuthor}
              link={this.state.quoteData.quoteLink}
              text={this.state.quoteData.quoteText}
            />
          </Row>
          <Row>
          <Col xs={12}>
            <Button bsSize="large" bsStyle="primary" onClick={this.api}>Get Quote</Button>
          </Col>
          </Row>
        </Jumbotron>
      </Grid>
    );
  }
}


ReactDOM.render(
  <Quote />, 
  document.getElementById('root')
);
