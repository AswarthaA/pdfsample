import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

import * as jsPDF from 'jspdf';
import * as html2canvas from "html2canvas"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  counter: any;
  pdfDoc: any;
  totalCount: any;
  draftOrCurrentHeader: string;
  pdfData: any[] = [];
  @ViewChild('rootDataContainer') rootDataContainer: ElementRef;

  constructor() {

    this.pdfDoc = new jsPDF();
    this.counter = 0;
    this.totalCount = 0;
  }

  ngOnInit() {
  }
  download() {
    debugger;
    let options = { split: false };
    let pages = this.rootDataContainer.nativeElement.getElementsByClassName('pdfpage'); 
    this.counter = this.totalCount = pages.length;

    for (let i = 0; i < pages.length; i++) {
      this.pdfDoc.addHTML(pages[i], 0, 0, options, (x, y, z, c) => {
        this.pdfDoc.addPage(pages[i].width, pages[i].offsetHeight / 4);
        this.counter = this.counter - 1;
      });
    }

    this.checkCounter();
  }
  checkCounter() {
    if (this.counter == 0) {
      this.pdfDoc.save('June.pdf');
    } else {
      setTimeout(() => {
        this.checkCounter();
      }, 1000);
    }
  }
}
