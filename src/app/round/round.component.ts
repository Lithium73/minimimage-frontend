import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.css']
})
export class RoundComponent implements OnInit {

  public isMaster:boolean = false;

  public displayChat:boolean=false;
  public displayWb:boolean=false;

  constructor(public backend:BackendService,private route: ActivatedRoute,private router:Router) { }




  ngOnInit(): void {

    this.route.params.subscribe(params => {

    });


    this.backend.messages.subscribe((data)=>{
      if(data && data.action == "onRound"){
        console.log("data.round.currentMaster",data.round.currentMaster.id,"this.backend.currentAccount",this.backend.currentAccount)
        this.isMaster = data.round.currentMaster.id == this.backend.currentAccount


        this.displayChat=false;
        this.displayWb=false;
        setTimeout(()=>{
          //force reinit
          this.displayChat=true;
          this.displayWb=true;
        },50)
      }

      if(data && data.action == "onMatchEnd"){
        this.router.navigate(["end"])
      }
    });
  }

}
