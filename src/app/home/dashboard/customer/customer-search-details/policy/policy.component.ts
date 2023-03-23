import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserenvironmentsService } from 'src/app/userenvironments.service';
import { PeriodicElement } from '../../table/table.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class PolicyComponent {

  date: any
  date1: any
  date2: any
  day!: number
  Day!: number
  month!: number
  Month!: number
  year!: number
  Year!: number
  timestamp1: any
  timestamp2: any
  campaignTwo: any
  event: any
  length = 0;
  customerId: any
  openOverlay = false;
  selected = 'option2';
  Filter3Selected: any
  Filter3: any
  customerTableData: any;
  overlayTop = 0;
  overlayLeft = 0;
  manualpage = 0
  totalpages = 0

  dataSource!: MatTableDataSource<PeriodicElement>
  displayedColumns: string[] = ['Policy', 'Insurer', 'Description', 'Cost / Billed', 'Term', 'Status', ' '];
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  pageIndex = 0;

  constructor(private service: UserenvironmentsService, private route: ActivatedRoute) { }

  ngOnInit() {
    // add a click listener to the document ------------->   Edit button (clickIcon function)
    document.addEventListener('click', this.onDocumentClick.bind(this));

    var token = localStorage.getItem('Token')
    this.customerId = this.route.snapshot.paramMap.get('id')
    this.service.getcustomertable(token, this.customerId).subscribe(response => {
      this.customerTableData = response;
      this.manualpage = 0
      this.Filter3 = this.customerTableData.FilterByPolicy;
      this.Filter3Selected = this.customerTableData.FilterByPolicySelected;

      this.date = this.customerTableData.FilterDuration;
      this.date = this.date.split(' - ');
      this.date1 = this.date[0];
      this.date2 = this.date[1];
      this.timestamp1 = new Date(this.date1).getTime()
      this.day = new Date(this.timestamp1).getDate()
      this.month = new Date(this.timestamp1).getMonth() + 1;
      this.year = new Date(this.timestamp1).getFullYear()
      this.timestamp2 = new Date(this.date2).getTime()
      this.Day = new Date(this.timestamp2).getDate()
      this.Month = new Date(this.timestamp2).getMonth() + 1;
      this.Year = new Date(this.timestamp2).getFullYear()


      this.date = this.customerTableData.FilterDuration;
      this.campaignTwo = new FormGroup({
        start: new FormControl(new Date(this.year, this.month, this.day)),
        end: new FormControl(new Date(this.Year, this.Month, this.Day)),
      });
    })


  }

  handlePageEvent(e: PageEvent) {
    // this.totalpage
    this.manualpage = e.pageIndex + 1;
  }

  public updateManualPage(index: number) {

    this.manualpage = index - 1;
    this.paginator.pageIndex = index - 1;
    this.paginator.page.next({
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      length: this.paginator.length

    })
  }

  public clearManualPage(): void {
    this.manualpage = this.pageIndex + 1;
  }

  getselectedValue3(event: any) {}
  
  clickIcon(event: any) {
    const iconElement = event.currentTarget as HTMLElement;
    const iconRect = iconElement.getBoundingClientRect();
    this.overlayTop = iconRect.top-300;
    this.overlayLeft = iconRect.left+150;
    this.openOverlay = true;

  }

  ngOnDestroy() {
    // remove the click listener when the component is destroyed ------> Edit button (clickIcon function)
    document.removeEventListener('click', this.onDocumentClick.bind(this));
  }

  onDocumentClick(event: any) {
    // hide the buttons if the click target is not the icon or the buttons ------> Edit button (clickIcon function)
    const isClickInside = event.target.closest('.icon') || event.target.closest('.button-class');
    if (!isClickInside) {
      this.openOverlay = false;
    }
  }
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.customerTableData.data);
    this.manualpage = 1
    this.dataSource.paginator = this.paginator
    if ((this.customerTableData.data.length % this.paginator.pageSize) == 0) {
      this.totalpages = this.customerTableData.data.length / this.paginator.pageSize

    }
    else {
      this.totalpages = (this.customerTableData.data.length / this.paginator.pageSize) + 1

    }
  }

}