import { Component, OnInit, ElementRef, ViewChild,AfterViewInit, Input } from '@angular/core';
import {BackendService} from '../backend.service';

@Component({
  selector: 'app-wb',
  templateUrl: './wb.component.html',
  styleUrls: ['./wb.component.css']
})
export class WbComponent implements OnInit,AfterViewInit {

  @ViewChild("canvas") canvas:ElementRef;
  @ViewChild("colors") colors:ElementRef;

  @Input("canDraw") canDraw:any=false;

  private context:any = null;

  private current:any = {
    color: 'black'
  };

  private drawing:boolean=false;

  constructor(private backend:BackendService) { }

  ngOnInit(): void {
    // if(this.canDraw=="false")this.canDraw=false;
    // if(this.canDraw=="true")this.canDraw=true;
    console.log("this.canvas",this.canvas)
    this.backend.messages.subscribe((data)=>{

      // if(data && data.action == "onRound"){
      //   this.canDraw = (data.round.currentMaster.id == this.backend.currentAccount)
      // }
    })
  }

  ngAfterViewInit():void{
    console.log("this.canvas",this.canvas)
    console.log("this.canvas",this.colors)
    this.context = this.canvas.nativeElement.getContext('2d');
    console.log("this.candraw",this.canDraw)
    if(this.canDraw == "true" || this.canDraw == true){
      this.canvas.nativeElement.addEventListener('mousedown', this.onMouseDown.bind(this), false);
      this.canvas.nativeElement.addEventListener('mouseup', this.onMouseUp.bind(this), false);
      this.canvas.nativeElement.addEventListener('mouseout', this.onMouseUp.bind(this), false);
      this.canvas.nativeElement.addEventListener('mousemove', this.throttle(this.onMouseMove.bind(this), 10).bind(this), false);

      //Touch support for mobile devices
      this.canvas.nativeElement.addEventListener('touchstart', this.onMouseDown.bind(this), false);
      this.canvas.nativeElement.addEventListener('touchend', this.onMouseUp.bind(this), false);
      this.canvas.nativeElement.addEventListener('touchcancel', this.onMouseUp.bind(this), false);
      this.canvas.nativeElement.addEventListener('touchmove', this.throttle(this.onMouseMove.bind(this), 10).bind(this), false);

      for (var i = 0; i < this.colors.nativeElement.childNodes.length; i++){
        this.colors.nativeElement.childNodes[i].addEventListener('click', this.onColorUpdate.bind(this), false);
      }
    }



    //socket.on('drawing', this.onDrawingEvent.bind(this));

    this.backend.messages.subscribe((data)=>{
      if(data && data.action == "onPlayerDraw"){
        this.onDrawingEvent(data.drawArgs)
      }
    })

    window.addEventListener('resize', this.onResize.bind(this), false);
    this.onResize();
  }



  drawLine(x0, y0, x1, y1, color, emit){
    this.context.beginPath();
    this.context.moveTo(x0, y0);
    this.context.lineTo(x1, y1);
    this.context.strokeStyle = color;
    this.context.lineWidth = 2;
    this.context.stroke();
    this.context.closePath();

    if (!emit) { return; }
    var w = this.canvas.nativeElement.width;
    var h = this.canvas.nativeElement.height;

    this.backend.messages.next({
      router:"PlayerRouter",
      "method":"draw",
      args:{
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color: color
      }
    });
  }

  onMouseDown(e){
    this.drawing = true;
    this.current.x = this.getMousePosition(e).x
    this.current.y = this.getMousePosition(e).y
  }

  onMouseUp(e){
    if (!this.drawing) { return; }
    this.drawing = false;
    this.drawLine(this.current.x, this.current.y, this.getMousePosition(e).x, this.getMousePosition(e).y, this.current.color, true);
  }

  onMouseMove(e){
    if (!this.drawing) { return; }
    this.drawLine(this.current.x, this.current.y, this.getMousePosition(e).x, this.getMousePosition(e).y, this.current.color, true);
    this.current.x = this.getMousePosition(e).x
    this.current.y = this.getMousePosition(e).y
  }

  getMousePosition(e){

    var rect = this.canvas.nativeElement.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left) / (rect.right - rect.left) * this.canvas.nativeElement.width,
        y: (e.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.nativeElement.height
    };
  }

  onColorUpdate(e){
    this.current.color = e.target.className.split(' ')[1];
  }

  // limit the number of events per second
  throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function() {
      var time = new Date().getTime();

      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

  onDrawingEvent(data){
    var w = this.canvas.nativeElement.width;
    var h = this.canvas.nativeElement.height;
    this.drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color,false);
  }

  // make the canvas fill its parent
  onResize() {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
  }



}
