import React from 'react';
import { Row, Col, Well, Button} from 'react-bootstrap';
import axios from 'axios';

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

  componentWillMount(){
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

  // formatQuote() {
  //   console.log("QuoteData: ", this.state.quoteData)
  //   let quote = Object.assign({}, this.state.quoteData);
    
  //   return(
  //     <Well>
  //       {quote.quoteText}     
  //       {quote.quoteAuthor}
  //       {quote.quoteLink}
  //     </Well>
  //   );
  // }

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
export default Quote;