import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddprojectService } from '../services/addproject.service';
import * as _ from 'lodash';
import { filter } from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  projects: any[] = [];
  allProjects:  any[] = [];
  alllayout:any[]=[];
  typeofworkname=[];
  worktypes=['typeOfWork'];
  filterDatawork = {};
  currentDate = new Date();
  date = formatDate(this.currentDate, 'yyyy-MM', 'en-US');
  thisMonthName: any;

  constructor(private route: ActivatedRoute, private activeRoute: ActivatedRoute, private router: Router,
    private addprojectService: AddprojectService,) { }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    this.addprojectService.getDataforDivcircity().subscribe((data) => {

    this.projects =data.filter(s => s.month === this.date)

    this.allProjects = _.isEmpty(queryParams) ? this.projects : filter(this.projects, queryParams);
    const dates = new Date();
    const thisMonth = dates.toLocaleString('default', { month: 'long' });
    this.thisMonthName = thisMonth;
    this.typeofworkname=_.uniq(_.map(data, "typeOfWork"));
    this.filterDatawork = Object.assign({},..._.map(this.worktypes, (item) => ({ [item]: _.uniq(_.map(data, item)), })) );

    });
    this.addprojectService.getDataforDivcircitylayout().subscribe((data) => {

      this.projects =data.filter(s => s.month === this.date)

      this.alllayout = _.isEmpty(queryParams) ? this.projects : filter(this.projects, queryParams);
      console.log(this.alllayout)
      const dates = new Date();
      const thisMonth = dates.toLocaleString('default', { month: 'long' });
      this.thisMonthName = thisMonth;
      this.typeofworkname=_.uniq(_.map(data, "typeOfWork"));
      this.filterDatawork = Object.assign({},..._.map(this.worktypes, (item) => ({ [item]: _.uniq(_.map(data, item)), })) );

      });
  }
  applyFilters(key: string, value: string) {
    const currentUrl = decodeURIComponent(this.router.url);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl.split('?')[0]], {
        queryParams: { [key]: value },
      });
    });
  }
  clearFilters() {
    const currentUrl = decodeURIComponent(this.router.url);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl.split('?')[0]]);
    });
  }
  filter(data: any, filters: any) {
    return _.reduce(
      filters,
      (array, v, k) => _.filter(array, { [k]: v }),
      data
    );
  }

  Print(){
    window.print()
    window.location.reload();
  }
}
