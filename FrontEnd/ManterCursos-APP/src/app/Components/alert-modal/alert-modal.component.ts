import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {

  constructor() { }

  private _dataObj!: AlertBody;

  @Input() set dataObj(value: AlertBody) {
    this._dataObj = value;
    (<HTMLInputElement>document.getElementById("btnAlert")).click();
  }

  @Output() closed = new EventEmitter();

  ngOnInit(): void {
    this.setData();
  }

  setData() {
    document.getElementById("alertTitle")!.innerText = this._dataObj.title;
    let subTitle = document.getElementById("alertSubTitle")!;
    subTitle.innerText = this._dataObj.subTitle;
    subTitle.setAttribute("style", "font-size: larger;font-weight: 400;");

    this._dataObj.lineItems.forEach((item: any) => {
      this.newItemLine(item.label, item.content);
    });
  }

  newItemLine(label: string, content: string) {
    let body = document.getElementById("alertBody")!;

    if (label == "divider") {
      let dividerRow = document.createElement("div");
      dividerRow.classList.add("row", "justify-content-center");
      let dividerCol = document.createElement("div");
      dividerCol.classList.add("col-8");
      let divider = document.createElement("hr");

      dividerRow.appendChild(dividerCol);
      dividerCol.appendChild(divider);

      body.appendChild(dividerRow);
    }
    else {
      let row = document.createElement("div");
      row.classList.add("row");
      row.setAttribute("style", "background-color: var(--light);margin-top: 8px;padding: 5px 10px;");

      let col = document.createElement("div");
      col.classList.add("col");

      let p = document.createElement("p");
      p.setAttribute("style", "padding: 0;margin: 0;");

      let span = document.createElement("span");
      span.setAttribute("style", "font-size: large;font-weight: bold;color: var(--indigo);");

      span.innerHTML = label;
      p.appendChild(span);
      p.innerHTML += content;
      col.appendChild(p);
      row.appendChild(col);

      body.appendChild(row);
    }
  }
}

class AlertBody {
  title: string;
  subTitle: string;
  lineItems: LineItem[];

  constructor(title: string, subTitle: string, lineItems: LineItem[]) {
    this.title = title;
    this.subTitle = subTitle;
    this.lineItems = lineItems;
  }
}

class LineItem {
  label: string;
  content: string;

  constructor(label: string, content: string) {
    this.label = label;
    this.content = content;
  }
}
