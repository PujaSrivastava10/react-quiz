import React, { Component } from 'react';
import './App.css';
import GrabData from './components/grabData.js';
import {Card,Button} from 'reactstrap'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      showQuiz:0
    }
  }
  next=()=>{
    //console.log('i m next');
    this.setState({showQuiz:1})


  }
  render() {
    if(this.state.showQuiz){
      return(
        <GrabData />
      );
    }else{
    return (
     <Card className="card">
      <h2 className="ins">INSTRUCTIONS!</h2>
      <ul className="list">
      <li>All questions are not compulsory.</li>
      <li>For skiping any questions click on "Skip and Next" button. </li>
      <li>For saving any option click on "Save and Next" button. </li>
      <li>For each correct answer you will be awarded with 10 marks. </li>
      <li>For each Wrong answer 2 marks will be deducted. </li>
      <li>Once ready click on "Start Quiz" button to start the quiz. </li>
      <li>Total Time alloted is 60 secs for 4 questions. </li>
      </ul>
      <Button className="rowing1" onClick={this.next}>Start Quiz</Button>
     </Card>
   );}
  }
}

export default App;
