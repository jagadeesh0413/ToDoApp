import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todoapp';
  readonly APIUrl = "http://localhost:5038/api/todoapp";
  constructor(private http:HttpClient){
  }

notes: any=[];
refreshNotes () {
this.http.get(this.APIUrl+'/getnotes'). subscribe (data=>{
this.notes=data;
})
}
ngOnInit(){
  this.refreshNotes();
}

addNotes() {
  var newNotes = (<HTMLInputElement>document.getElementById("newNotes")).value;
  this.http.post(this.APIUrl + '/addNotes', { newNotes: newNotes }).subscribe(data => {
    alert(data);
    this.refreshNotes();
  });
}


deleteNotes (id: any) {
  this.http.delete(this.APIUrl+'/deleteNotes?id='+id).subscribe(data=>{
  alert (data);
  this.refreshNotes();
  });

  }
}
