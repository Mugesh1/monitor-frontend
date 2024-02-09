import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { filter } from 'lodash';
import { AddprojectService } from '../services/addproject.service';

@Component({
  selector: 'app-header',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  fontSize = 14;
  @ViewChild('para', { static: true })
  para!: ElementRef;

  changeFont(operator) {
    operator === '+' ? this.fontSize++ : this.fontSize--;
    (this.para.nativeElement as HTMLParagraphElement).style.fontSize = `${this.fontSize}px`;

  }


  fsprojects: any[] = [];
  projects: any[] = [];
  allProjects: any;
  uniqueProjects:any[] = [];
  uniqueLayouts:any[] = [];
  divisionname=[];
  typeofworkname=[];
  fsvaluename=[];
  divisions = ['division']
  worktypes=['typeOfWork'];
  fss=['fsAdministrativesanctionValue']
  filterDatadiv = {};
  filterDatafs = {};
  filterDatawork = {};
  isCircle = false;
  currentDate = new Date();
  date = formatDate(this.currentDate, 'yyyy-MM', 'en-US');

  constructor(

    private route: ActivatedRoute,
    private router: Router,
    private addprojectService: AddprojectService,
  ) {}
  ngOnInit(): void {


    const queryParams = this.route.snapshot.queryParams;
      this.addprojectService.getDataforDivcircity().subscribe((data) => {
        this.fsprojects =data;
      this.projects = _.isEmpty(queryParams) ? data : filter(data, queryParams);
      this.allProjects = data;
      this.divisionname=_.uniq(_.map(data, "division"));
      this.fsvaluename=_.uniq(_.map(this.allProjects, "fsAdministrativesanctionValue"));
      this.typeofworkname=_.uniq(_.map(data, "typeOfWork"));
      // var above10 = _.filter(data, ({fsAdministrativesanctionValue}) => fsAdministrativesanctionValue < 1000)
      // console.log(above10)
      // var below10 = _.filter(data, ({fsAdministrativesanctionValue}) => fsAdministrativesanctionValue < 1000)
      // console.log(below10)
      this.filterDatadiv = Object.assign({},..._.map(this.divisions, (item) => ({ [item]: _.uniq(_.map(data, item)), })) );
      this.filterDatafs = Object.assign({},..._.map(this.fss, (item) => ({ [item]: _.uniq(_.map(data, item)), })) );
      this.filterDatawork = Object.assign({},..._.map(this.worktypes, (item) => ({ [item]: _.uniq(_.map(data, item)), })) );
      let index = _.unionBy(this.projects, 'project_name');
      this.uniqueProjects= index;


    });
    this.addprojectService.getDataforDivcircitylayout().subscribe((data) => {
      this.fsprojects =data;
    this.projects = _.isEmpty(queryParams) ? data : filter(data, queryParams);
    this.allProjects = data;
    this.divisionname=_.uniq(_.map(data, "division"));
    this.fsvaluename=_.uniq(_.map(this.allProjects, "fsAdministrativesanctionValue"));
    this.typeofworkname=_.uniq(_.map(data, "typeOfWork"));
    // var above10 = _.filter(data, ({fsAdministrativesanctionValue}) => fsAdministrativesanctionValue < 1000)
    // console.log(above10)
    // var below10 = _.filter(data, ({fsAdministrativesanctionValue}) => fsAdministrativesanctionValue < 1000)
    // console.log(below10)
    this.filterDatadiv = Object.assign({},..._.map(this.divisions, (item) => ({ [item]: _.uniq(_.map(data, item)), })) );
    this.filterDatafs = Object.assign({},..._.map(this.fss, (item) => ({ [item]: _.uniq(_.map(data, item)), })) );
    this.filterDatawork = Object.assign({},..._.map(this.worktypes, (item) => ({ [item]: _.uniq(_.map(data, item)), })) );
    let index = _.unionBy(this.projects, 'project_name');
    this.uniqueLayouts= index;


  });
  }
  Above10crore(){
this.uniqueProjects=_.filter(this.fsprojects, ({fsAdministrativesanctionValue}) => fsAdministrativesanctionValue > 1000)
console.log(this.uniqueProjects)
  }
Below10crore(){
this.uniqueProjects=_.filter(this.fsprojects, ({fsAdministrativesanctionValue}) => fsAdministrativesanctionValue < 1000)
console.log(this.uniqueProjects)
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
}
