import React,{Component} from 'react';
import {Form,FormGroup,Label,Input,Button} from 'reactstrap';

export default class QuesAns extends Component {
  constructor(props) {
    super(props);
    this.state={ selectedOption:'notSelected',
                 marks:0,
                 checked:false,
                 correctOption:'invalid'
                 }
    this.baseState=this.state;
  }
  componentDidUpdate(){
     //this.setState(this.baseState);
     //console.log('quesAns componentDidMount');
  }
  handleOptionChange=(changeEvent)=>{
     //console.log(changeEvent.target.value[changeEvent.target.value.length-1]);
    this.setState({selectedOption:changeEvent.target.value,checked:true,correctOption:changeEvent.target.value[changeEvent.target.value.length-1]});
  }

  handleFormSubmit=(formSubmitEvent)=>{

    alert("i am submit");
    //console.log('You have selected:', this.state.selectedOption);

    formSubmitEvent.preventDefault();

  }
     addMarks=()=>{
           //console.log(this.state.correctOption);
       if(this.state.correctOption==='1'){
        //console.log('option selected one',this.state.selectedOption);
        this.props.submitMarks(this.props.marks,this.props.negativeMarks);
       }
       else if(this.state.correctOption==='0'){
         this.props.submitMarks(this.props.zeroMarks,this.props.negativeMarks);
       }
       else{
         alert('select an option to save');
       }
     }
   componentWillReceiveProps(nextProps){
     //console.log('componentWillRecieveProps',nextProps.index,this.props.index);
     if(this.props.index!==nextProps.index){
       this.setState({selectedOption:'notSelected',
                      marks:0,
                      checked:false,
                      correctOption:'invalid'
                  });
     }
   }
  render(){
    //var count=0
    //console.log('render quesAns',count++);
    //console.log('ques ans data',this.props.data[0]);
    return(
         <div>
         <div> Question <span className='.spanning'>{this.props.currentQues}</span> of <span className='.spanning'>{this.props.length}</span> </div>
         <h2>{this.props.ques.question}</h2>
         <Form  onSubmit={this.handleFormSubmit}>
          <FormGroup tag="fieldset">
         {this.props.ques.options.map((optionAns,key)=>
           <FormGroup check key={key}>
           <Label check>
           <Input type="radio" name="option" value={optionAns} onChange={this.handleOptionChange} checked={this.state.selectedOption==optionAns}/>
           {optionAns[0]}
           </Label>
           </FormGroup>
         )}
         </FormGroup>
          <Button className="rowing2" onClick={this.addMarks}>Save and Next</Button>
          </Form>
          </div>
        );
  }
}
