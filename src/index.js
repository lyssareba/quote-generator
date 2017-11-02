import React from 'react'
import ReactDOM from 'react-dom'
import '../node_modules/react-bootstrap/dist/react-bootstrap.min.js';
import {Row, Well, Col, Button} from 'react-bootstrap'
import axios from 'axios'

// var Well = ReactBootstrap.Well, Row = ReactBootstrap.Row, Col = ReactBootstrap.Col;
// var Button = ReactBootstrap.Button;
class Quote extends React.Component {
  constructor(){
    super();
    this.state = {
      quoteData: {
        quoteAuthor: '',
        quoteText: '',
        quoteLink: '',
      },
    };
    this.getQuote = this.getQuote.bind(this);
  }

  componentDidMount(){
    this.getQuote();
  }

  getQuote(){
    const temp = Object.assign({}, this.state.quoteData);
    axios.post('http://api.forismatic.com/api/1.0/?&method=getQuote&format=json&lang=en') 
      .then((res) => {
        temp.quoteAuthor = res.data.quoteAuthor;
        temp.quoteText = res.data.quoteText;
        temp.quoteLink = res.data.quoteLink;
        this.setState({ quoteData: temp });
      },
      console.log("QuoteData: ", this.state.quoteData),
    );
  }

  render () {
      return (
        <div>
          <Well bsSize="large">
            <Col xs={12} md={12}>
            <div className="text">
              {this.state.quoteData.quoteText}
            </div>
            <div className="author">  
              {this.state.quoteData.quoteAuthor}
            </div>
            <div className="link">
              <a href={this.state.quoteData.quoteLink}>Quote Link</a>
            </div>
            </Col>
          </Well>
          <Row>
            <Col xs={6} md={4}>
              <Button bsSize="large" bsStyle="primary" onClick={this.getQuote}>Get Quote</Button>
            </Col>
          </Row>
        </div>
      );
    }
}

ReactDOM.render(
  <Quote />, 
  document.getElementById('root')
);
