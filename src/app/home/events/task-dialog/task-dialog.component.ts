import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import {  } from '@angular/compiler';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class TaskDialogComponent {
constructor(private formbuilder:FormBuilder){}

  



  @ViewChild('picker') picker1!: MatDatepicker<any>;
  @ViewChild('picker') picker2!: MatDatepicker<any>;
  selectedDateTime1: any;
  selectedDateTime2: any;
  formData: FormData = new FormData();
  inputsForm!:FormGroup;
  fileToUpload: any;
  date1 = new Date();
  date2 = new Date();

  // selectedOption1 = 'option1';
  // selectedOption2 = 'option1';
  // selectedOption3 = 'option1'
  // inputdata:any
  // form = new FormGroup({

  //   selectedValue1: new FormControl('option1'),
  //   selectedValue2: new FormControl('option1'),
  //   selectedValue3: new FormControl('option1'),
  //   selectedValue4: new FormControl('option1'),
  //   selectedValue5: new FormControl('option1'),
  //   selectedValue6: new FormControl('option1'),
  //   selectedValue7: new FormControl('option1'),
  // });

  onSelectionChange(event:any){
    var selectedvalue = event.value;
    console.log("first option: ", selectedvalue)
  }

  ngOnInit(): void {
    this.inputsForm = this.formbuilder.group({
      customer: ['Customer', Validators.required],
      customerName: [' Jane Doe', Validators.required],
      txcNumber: ['TXC15447788956623, 3/5/2023, 3/5/2024, Home', Validators.required],
      effective: ['Effective 2/5/2023, AutoDownload, RWL, 1/5/2023', Validators.required],
      homeOwners: ['Homeowners of America', Validators.required],
      claim: ['Claim', Validators.required],
      taskType: ['Task Type', Validators.required],
      subType: ['Sub Type', Validators.required],
      group: ['Group', Validators.required],
      date: [new Date(), Validators.required],
      files: ['', Validators.required],
      checkList: [' Checklist Item', Validators.required],
      ownedBy: [' Owned by',Validators.required],
      dueDate: [new Date(), Validators.required],
    
    })
    const date = new Date();
    const formattedDate = date.getFullYear() + '-' +
    ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
    ('0' + date.getDate()).slice(-2) + ' ' +
    ('0' + date.getHours()).slice(-2) + ':' +
    ('0' + date.getMinutes()).slice(-2);
     this.selectedDateTime1 = formattedDate
    this.selectedDateTime2 = formattedDate

  }




  save(){
    
    this.inputsForm.value.date = this.selectedDateTime1;
    this.inputsForm.value.dueDate = this.selectedDateTime2;
    console.log("inputform:", this.inputsForm.value)
    this.formData.append("inputform", JSON.stringify(this.inputsForm.value))
    console.log("Form data: ", this.formData.get('inputform'))
  

  }
  onFileSelected(event:any){
    console.log("file received: ", event.target.files)
    this.fileToUpload = event.target.files[0]
    // this.formData.append("username", "Chris");

    // this.formData.append("File", this.fileToUpload)
    // console.log("filetoupload: ", this.formData.get('File'))

  }
  
}
