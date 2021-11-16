import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  Dismiss(){
    let btnClose = document.getElementById("btnClose")! as HTMLButtonElement;
    btnClose.click();
  }

}
