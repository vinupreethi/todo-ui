import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',

  })};

  

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http:HttpClient) { }

  getTodos()
  {
    return this.http.get('/server/todo');
  }
  createTodo(todo)
  {
    console.log(todo);
    let body=JSON.stringify(todo);
   // console.log('/server/todo',body,httpOptions);
  // this.getTodos();
    return this.http.post('/server/todo',body,httpOptions);
  }
  deleteTodo(value)
  {
   let b=JSON.stringify(value);
   console.log(b);
 // console.log(value);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        todolist:value
      },
      
    };
    console.log('options')
    console.log(options);
    this.http.delete('/server/todo',options).subscribe((s)=>
    {
      console.log(s);
    });

  }
  getTodoid(value)
  {

    return this.http.get('/server/todo/'+value);
  }
  
  patchtodo(urlvalue,jsonvalue)
  {
   // let b=JSON.stringify(jsonvalue);
    //let number=Number(urlvalue);
    let id=String(urlvalue);
    console.log("inside patch");
    
    //console.log(b);
  // console.log(value);
     const options1 = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json',
       }),
       body: {
         todolist:jsonvalue
       },

  }
  console.log(options1);
  console.log((typeof(id)));
  //console.log(jsonvalue);
  //console.log(typeof(number));
  this.http.put('/server/todo/'+id,{todolist:jsonvalue},options1).subscribe((s)=>
    {
      console.log(s);
    });
  
 
}
  
}

