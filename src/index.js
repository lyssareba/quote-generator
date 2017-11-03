import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import {Grid, Row, Col, Well, Button} from 'react-bootstrap'
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
      <div>
      <Row>
        <Col className="quoteData clearfix">
          <h2>{this.props.text}</h2>
        </Col>
        <Col className="quoteData clearfix">  
          <h3>- {this.props.author}</h3>
        </Col>
        </Row>
        <Row>
        <Col id = "nextQuote" className="quoteData clearfix">
          <a href={this.props.link}>
            <Button>Quote Link</Button>
          </a>
        </Col>
      </Row>
      </div>
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
      <div className="flex-centered clearfix">
        <Spinner />
      </div>
      ) 
      : (
      <Grid fluid>
        <div id="header">
        </div>
        <Col lg={6} lgOffset={3}>
        <Well id="quoteBox">
          <Load 
            author={this.state.quoteData.quoteAuthor}
            link={this.state.quoteData.quoteLink}
            text={this.state.quoteData.quoteText}
          />
          <Row>
            <Col id="nextQuote">
              <Button bsStyle="primary" onClick={this.api}>New Quote</Button>
            </Col>
          </Row>
          </Well>
        </Col>
      </Grid>
    );
  }
}


ReactDOM.render(
  <Quote />, 
  document.getElementById('root')
);
