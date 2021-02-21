import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';

import { Injectable, Renderer2 } from '@angular/core'; 
import { __core_private_testing_placeholder__ } from '@angular/core/testing';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild('msg1', { static: true }) MyDOMElement: ElementRef;
  @ViewChild('message', { static: true }) editElement:ElementRef;
  @ViewChild('ulvalue',{static:true}) ulvalue:ElementRef;
  @ViewChild('wrapper') wrapper:ElementRef;
  public todos;
  public added=true;
  public response1;
  isShow = true;
  public value;
  todoform: FormGroup;
  validMessage:string="";
  public show= true;
  public del=false;
  public show1=false;
  element: HTMLElement;
  public data;
  public count;
  public content;

  
  
  user:any={};
  constructor(private todoservice:TodoService,private renderer: Renderer2) { 
    
  }

 
  ngOnInit(): void {
    this.todoform=new FormGroup
    ({
      todolist:new FormControl('',Validators.required)
    });
    }
    
    delete($event,el,msg,b2,b1)
    {
      if(this.del==false)
      {
        this.del=true;
        const val=(el.innerText);
        console.log(val);
        msg.classList.add('completed');
        b2.disabled=true;
        b1.disabled=true;
        this.deleteTodos(val);
       
        
        this.del=false;
      }
    }
    edit($event,el,message,b1,b2,ulvalue)
    {
      
      this.count=0;
       message.setAttribute("contenteditable","true");
       message.style.background='white';
       var val=el.innerText;
      b2.disabled=true;
      console.log(this.value);
       this.todoservice.getTodoid(val).subscribe(
      
        (response) =>
        {
         this.data=response;
        }
        
        




      );
      
    const button=document.createElement('button');
   // button.innerText='Submit';
    button.innerHTML='<i class="fas fa-check"></i>';
    ulvalue.appendChild(button);
    button.style.borderRadius='9px';
    button.addEventListener("click", (e:Event)=>
    {
        console.log(this.data);
        console.log(message.innerText);
        this.todoservice.patchtodo(this.data,message.innerText);
      //  document.removeChild(button);
      ulvalue.removeChild(button);
      message.setAttribute("contenteditable","false");
      b2.disabled=false;
      message.style.background='#f2f2f2';

     
    });
   
   
  
    
    

    }
    completed($event,el,msg)
    {
      if(this.del==false)
      {
        this.del=true;
        const val=(el.innerText);
        msg.classList.add('completed');
        console.log(el);
        this.deleteTodos(val);
        this.del=false;
      }
    }


   todo($event)
    {

      this.getTodos();
      this.MyDOMElement.nativeElement.removeChild;
      
    }
    deleteTodos(val)
    {
      
      this.todoservice.deleteTodo(val);


    }

    getTodos()
  {
 
    console.log(this.MyDOMElement.nativeElement.children);
    //console.log('inside getTodos');
    Array.from(this.MyDOMElement.nativeElement.children).forEach(child => {
          
            this.renderer.removeChild(this.MyDOMElement.nativeElement, child);
      
           
           
       }); 


    this.todoservice.getTodos().subscribe(
      
      data => {this.todos=data},
      err=>console.error(err),
      ()=>console.log('loaded')
    );


    }

 
   
    
    submitForm($event)
    {
   

      if(this.todoform.valid)
      {
     
      const thevalue=this.todoform.value;
        this.todoservice.createTodo(this.todoform.value).subscribe(
          data=>
          {
            this.todoform.reset();
           this.value=data;
           console.log(data);
            if(data==true)
            {
                console.log(this.todoform.value);
          
        const value1=JSON.parse(JSON.stringify(thevalue));
        const answer=value1['todolist'];
       
        const h4=document.createElement('h4');
        const child = document.createElement('li');
     
        h4.innerText=answer;
              console.log("h4.innertext"+answer);
       
       console.log(child.innerText);

        const trashButton=document.createElement('button');
        const editButton=document.createElement('button');
        editButton.innerHTML='<i class="fas fa-edit"></i>';
        trashButton.innerHTML='<i class="fas fa-trash"></i>';
      
       
        const fun = () =>
        {
          this.deleteTodos(child.innerText);
          h4.classList.add('completed');
          child.style.textDecoration='line-through';
          child.style.opacity='0.5';
          trashButton.disabled=true;
          editButton.disabled=true;
        
        }
        trashButton.addEventListener("click",fun);
        editButton.style.color='rgb(0, 68, 255)';
        editButton.style.border='none';
        editButton.style.padding='1rem';
        editButton.style.cursor='pointer';
        editButton.style.fontSize='1rem';
        editButton.style.borderRadius='8px';
        editButton.style.display='inline-block';
        trashButton.classList.add("btn-delete");

        const editfun=()=>
        {
          child.setAttribute("contenteditable","true");
          var val=child.innerText;
          child.style.background='white';
         editButton.disabled=true;
          this.todoservice.getTodoid(val).subscribe(
         
           (response) =>
           {
            this.data=response;
           }

         );
        
        const button=document.createElement('button');
        button.innerHTML='<i class="fas fa-check"></i>';
        //button.innerText='Submit';
        button.style.width='55px';
        button.style.height='55px';
        
        
       button.style.background='inline';
       this.renderer.appendChild(this.MyDOMElement.nativeElement,button);
        button.style.borderRadius='9px';
        button.addEventListener("click", (e:Event)=>
        {
            console.log(this.data);
            button.style.background='inline';
            
            console.log(child.innerText);
            this.todoservice.patchtodo(this.data,child.innerText);
            this.renderer.removeChild(this.MyDOMElement.nativeElement,button);
            child.setAttribute("contenteditable","false");
            child.style.background='#f2f2f2';
       
        });
            
        }
           editButton.addEventListener("click",editfun);
      

        child.style.margin='20rem';
        child.style.background= '#f2f2f2';
        child.style.color='black';
        child.style.fontSize='1.0rem';
        child.style.display='inline-block';
        child.style.justifyContent='space-between';
        child.style.alignItems= 'center';
          child.style.transition='all 0.3s ease';
          child.style.width='20em';
          child.style.marginLeft='50px';
          child.style.marginRight='0em';
         child.style.height='20px';
         child.style.cursor='pointer';
         child.style.padding='1rem';
         child.style.margin='0 0 0 30px';
         
          child.style.borderRadius='10px';
          h4.style.margin='0 auto';
          h4.style.textAlign='center';
          trashButton.style.background='rgb(141, 3, 3)';
          trashButton.style.color='white';
          trashButton.style.border='none';
          trashButton.style.padding='1rem';
          trashButton.style.cursor='pointer';
          trashButton.style.fontSize='1rem';
          trashButton.style.borderRadius='3px';
          trashButton.style.display='inline-block';
         child.style.marginTop='10px';
         child.style.marginBottom='10px'
        child.append(trashButton);
        child.append(h4);

  
        this.validMessage="Successfully todo created";
        
 
        this.renderer.appendChild(this.MyDOMElement.nativeElement,child);
        this.renderer.appendChild(this.MyDOMElement.nativeElement,trashButton);
        this.renderer.appendChild(this.MyDOMElement.nativeElement,editButton);
        console.log(data);
        return data;
            }
            else{
              alert("todo present");
            }
           return;
          },
          error=>
          {
            return;
          }
        );
      }
      else{
        this.validMessage="Please enter the todo";
      }
     
    
     
  
     console.log("the value is "+this.value);
    }

}
