import React,{Component} from 'react';
import {Card,Row,Col,Button} from 'reactstrap';
import QuesAns from './quesAns.js';
import Timer from './timer.js';
export default class GrabData extends Component {
  constructor(props) {
     super(props);
     this.state={questions:[],
                  key:0,
                  length:0,
                   renderData:'',
                    quizOver:false,
                    marks:0,
                    totalMarks:0,
                    correctAns:0,
                    timeOverForQuiz:false
                    }
  }

componentDidMount(){
    console.log("Did Mount");
    fetch('http://localhost:3000/data').then((response)=>{
      return response.json();
    }).then(data=>{
       var renderData=data[0].questions;
       this.setState({renderData:renderData})
       console.log('renderData',this.state.renderData);
       this.nextQues()
        //this.prevQues(this.state.renderData)
      })
  }

  nextQues=()=>{
    var question=this.state.renderData;
    var length=question.length
    var totalMarks=question[0].marks*(question.length-1);
    console.log('negativeMarks',this.state.renderData[this.state.key].negativeMarks);

    var questions=
    <QuesAns ques={this.state.renderData[this.state.key]}
    data={this.state.renderData}
    length={this.state.renderData.length}
    currentQues={this.state.key+1}
    submitMarks={this.submitquiz}
    index={this.state.key} zeroMarks={0}
    negativeMarks={this.state.renderData[this.state.key].negativeMarks}
    marks={this.state.renderData[this.state.key].marks}/>
    this.setState({questions:questions,length:length,key:this.state.key+1,totalMarks:totalMarks+parseInt(question[this.state.key].marks,10)});


  }
  submitquiz=(marksObtained,negativemarksObtained)=>{
     if(marksObtained!==0){
       this.setState({correctAns:this.state.correctAns+1});
       var Newmarks=parseInt(marksObtained,10)+this.state.marks;
       console.log('NewMarks',Newmarks);
       this.setState({marks:Newmarks});
     }else{
       var lostMarks=this.state.marks-parseInt(negativemarksObtained,10);
       console.log('lostMarks',lostMarks);
       this.setState({marks:lostMarks});
     }

     this.next();

  }

  next=()=>{
    if(this.state.key<this.state.length){
    //this.setState({questions:this.state.questions,key:this.state.key+1});
    this.nextQues();

  }
    else{
      this.setState({quizOver:true})
    }
  }
  TimeOver=()=>{
      this.setState({timeOverForQuiz:true})
      //alert('time over')
      console.log(this.state.timeOverForQuiz);
  }

   render(){
           //console.log(this.state.renderData[this.state.key].negativeMarks);
           if(!this.state.quizOver&&this.state.timeOverForQuiz){
               return(
                 <Card className="card">
                 <h1 className="heading">Sorry! :(  </h1><h1 className="heading">Time Over!</h1>
                 <h3 className="heading">Your Score : {this.state.marks} / {this.state.totalMarks} </h3>
                 <h3 className="heading">Correct Answers : <span className="spanning">{this.state.correctAns} </span>
                 Out of <span className="spanning">{this.state.length}</span></h3>
                 <h2 className="heading">Thank You!</h2>
                 </Card>
                     )
               }
          else if(!this.state.quizOver){
            console.log('key',this.state.key);
            console.log('length',this.state.length);
           return(
                  <Card>
                  <Row>
                  <Col lg={{size:6,offset:8}}>
                  <Timer start={1} stop={this.TimeOver}/>
                  </Col>
                  </Row>
                  <div>
                  {this.state.questions}
                  <span className="top">
                  <Button className="rowing1" onClick={this.next}>Skip and Next</Button>
                  </span>
                  </div>
                  </Card>)}

                 else{
                   return(
                     <Card className="card">
                     <h1 className="heading">Congratulations! {"You've"} </h1><h1 className="heading">finished the Quiz!</h1>
                     <h3 className="heading">Your Score : {this.state.marks} / {this.state.totalMarks} </h3>
                     <h3 className="heading">Correct Answers : <span className="spanning">{this.state.correctAns} </span>
                      Out of <span className="spanning">{this.state.length}</span></h3>
                      <h2 className="heading">Thank You!</h2>
                     </Card>
                    )
                 }

               }


}
