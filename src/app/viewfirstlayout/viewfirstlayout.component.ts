import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AddprojectService } from '../services/addproject.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import {  Datamonitor } from '../models/data.interface';
import { identifierName } from '@angular/compiler';
import { Datamonitorlayout } from '../models/datalayout.interface';

@Component({
  selector: 'app-viewfirstlayout',
  templateUrl: './viewfirstlayout.component.html',
  styleUrls: ['./viewfirstlayout.component.css']
})
export class ViewfirstlayoutComponent implements OnInit {

  timestampfinal =new Date().toString()
  compareTo = 0;
  compareFrom = -1;
  fromData: any;
  toData: any;
  duedatefinal : any;
  monthnamecurrent : any ;
  monthnameold:any;
  currentmonthfinal : any;
  oldmonthfinal : any;
  projectall: any[] = [];
  projectone: any[] = [];
  projectonefordue: any[] = [];
  comparedateold:any[]=[];
  message = '';
  currentDate = new Date();
  date = formatDate(this.currentDate, 'yyyy-MM', 'en-US');



  addproject: Datamonitorlayout = {

    id :'',
    timestamp:'',
    editby:'',
    month : '',
    project_name :'',
    division: '',
    circle :'',
    citynrural  :'',
    fsAdministrativesanctionValue: '',
    revisedFS: '',
    revisedRFS: '',
    typeOfWork: '',
    contractorName: '',
    thirdPartySupervision: '',
    developmentWork: '',
    agreementValue: '',
    totalUnits: '',
    soldUnits: '',
    unsoldUnits: '',
    expenditureSoFar: '',
    otherExpenditureSoFar: '',
    siteHandingover: '',
    dueDateOfCompletion: '',
    anticipatedDateOfCompletion: '',
    eoTUpto: '',
    pmc: '',
    pmcAgreementValue: '',
    pmcExpenditureSoFar: '',
    pendingApproval: '',
    eb: '',
    waterSewage: '',
    giftDeed: '',
    handingOverToLocal: '',
    b_R_No_AndDate: '',
    workLC_released: '',
    financialAchievement: '',
    costingStatus: '',
    area: '',
    value: '',
    planOfActionForSale: '',
    comments: '',
    surveyno : '',
    totalextent : '',
    map : '',
    uniquecode:'',


     //newly added


     planningPermission:'',
     buildingPermission:'',
     noc:'',
     dateOfCommencement:'',
     physicalProgress:'',
     lc_released_current_month:'',
     financialProgress:'',
     wc79:'',
     waterSupply:'',
     pmc_lc_released:'',
     developmentContractors:'',
     agreementValue1:'',
     expenditureSoFar1:'',
     completionCertificate:'',
     dateOfCompletionReport:'',

     hig:'',
     mig_I:'',
     mig_II:'',
     lig_I:'',
     lig_II:'',
     noc_value:'',
     waterSewage_value:'',
     waterSupply_value:'',
     village:'',
     sftsno:'',
      extentacres:'',
      brnodate:'',
      fsvaluers:'',
      wc79rs:'',
      rfsrs:'',
      layoutapproval:'',
      lbapproval:'',
      contractor:'',
      agreementvalue:'',
      doc:'',
      ddc:'',
      expenditure:'',
      lcreleased:'',
      physicalprogress:'',
      financialprogress:'',
      stageofwork:'',
      giftdeed:'',
      hotolb:'',
      cost:'',
      rera:'',
      completionreport:'',
      dateOfCompletionReport1:'',




}!;
submitted = false;

getCostSectionValues(): { label: string, value: string }[] {
  return [
    { label: 'HIG', value: this.addproject.hig },
    { label: 'MIG I', value: this.addproject.mig_I },
    { label: 'MIG II', value: this.addproject.mig_II },
    { label: 'LIG I', value: this.addproject.lig_I },
    { label: 'LIG II', value: this.addproject.lig_II },
  ];
}



 constructor(private addprojectService: AddprojectService,private activeRoute: ActivatedRoute, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.addprojectService.getDataforDivcircitylayout().subscribe(data => {
      if (!localStorage.getItem('foo')) {
        localStorage.setItem('foo', 'no reload')
        const currentUrl = decodeURIComponent(this.router.url);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl.split('?')[0]]);
        });
      } else {
        localStorage.removeItem('foo')
      }
    this.projectall = data.filter(s => s.project_name === this.route.snapshot.paramMap.get('project'));
    this.projectone = data.filter(s => s.project_name === this.route.snapshot.paramMap.get('project')&& s.month == this.date);
    this.addproject =data.filter(s => s.project_name === this.route.snapshot.paramMap.get('project')&& s.month == this.date);
    console.log(this.addproject)

    const fsValue = parseFloat(this.projectone[0]?.fsAdministrativesanctionValue || '0');

    this.addproject.fsAdministrativesanctionValue = (fsValue / 100000).toFixed(2);


     let index = _.unionBy(this.projectall,'ddc');
      this.projectonefordue =  index;
      const duedate = this.projectonefordue.map(s => s.ddc)

      function getDays(start, last) {
      const date1 = new Date(start);
      const date2 = new Date(last);
      const oneDay = 1000 * 60 * 60 * 24;
      const diffTime = date2.getTime() - date1.getTime();
      const diffDays = Math.round(diffTime / oneDay);
      return diffDays;
  }
      const myDate= new Date();
      this.duedatefinal = getDays(myDate,duedate)

      var currentmonth = new Date(this.currentDate);
      var currentmonthyear = currentmonth.toString();
      this.currentmonthfinal = currentmonthyear;
      currentmonth.setMonth(currentmonth.getMonth() - 1);
       var oldmonthyear = formatDate(currentmonth.toString(), 'yyyy-MM', 'en-US');
      this.oldmonthfinal = oldmonthyear
      this.comparedateold = data.filter(s => s.project_name === this.route.snapshot.paramMap.get('project')&& s.month == this.oldmonthfinal);
      const current = new Date();
      current.setMonth(current.getMonth()-1);
      this.computeData()
    })



  }


  Deletelayout(project_name: string): void {

    if (window.confirm('Are you sure  to delete this project ?')) {
      this.addprojectService.deletelayout(project_name)
        .subscribe(
          response => {

            alert(this.message = response.message ? response.message : 'This project was deleted successfully!');
            this.router.navigate(['/home'])

          },

          error => {
            console.log(error);
          });
    }
  }
  Print(){
    window.print()
    window.location.reload();
  }
  computeData() {
    const fromMonth = moment().add(this.compareFrom, 'month')
    const toMonth = moment().add(this.compareTo, 'month')

    this.fromData = (_.find(this.projectall, s => s.month == fromMonth.format("YYYY-MM")) || {});
    this.toData = (_.find(this.projectall, s => s.month == toMonth.format("YYYY-MM")) || {});
    this.monthnameold = fromMonth.format("MMMM YY");
    this.monthnamecurrent = toMonth.format("MMMM YY");
  }

  increaseFrom(){
    this.compareFrom += 1
    this.computeData()
  }
  decreaseFrom(){
    this.compareFrom -= 1
    this.computeData()
  }
  increaseTo(){
    this.compareTo += 1
    this.computeData()
  }

  decreaseTo(){
    this.compareTo -= 1
    this.computeData()
  }

  updateProjectComment(): void {
    const Username = sessionStorage.getItem('username')! ;
    const proname =this.projectone.map(s => s.project_name)
    const pronamecomment = proname.join("")
    const id =this.projectone.map(s => s.id)
    const idcomment = id.join("")
    const div =this.projectone.map(s => s.division)
    const divcomment = div.join("")
    const circ =this.projectone.map(s => s.circle)
    const circlecomment = circ.join("")
    const citynrurals =this.projectone.map(s => s.citynrural)
    const citynruralcomment = citynrurals.join("")
    const fsAdministrativesanctionValues =this.projectone.map(s => s.fsAdministrativesanctionValue)
    const fsAdministrativesanctionValuecomment = fsAdministrativesanctionValues.join("")
    const revisedFSs =this.projectone.map(s => s.revisedFS)
    const revisedFScomment = revisedFSs.join("")
    const revisedRFSs =this.projectone.map(s => s.revisedRFS)
    const revisedRFScomment = revisedRFSs.join("")
    const typeOfWorks =this.projectone.map(s => s.typeOfWork)
    const typeOfWorkcomment = typeOfWorks.join("")
    const contractorNames =this.projectone.map(s => s.contractorName)
    const contractorNamecomment = contractorNames.join("")
    const thirdPartySupervisions =this.projectone.map(s => s.thirdPartySupervision)
    const thirdPartySupervisioncomment = thirdPartySupervisions.join("")
    const developmentWorks =this.projectone.map(s => s.developmentWork)
    const developmentWorkcomment = developmentWorks.join("")
    const agreementValues =this.projectone.map(s => s.agreementValue)
    const agreementValuecomment = agreementValues.join("")
    const totalUnitss =this.projectone.map(s => s.totalUnits)
    const totalUnitscomment = totalUnitss.join("")
    const soldUnitss =this.projectone.map(s => s.soldUnits)
    const soldUnitscomment = soldUnitss.join("")
    const unsoldUnitss =this.projectone.map(s => s.unsoldUnits)
    const unsoldUnitscomment = unsoldUnitss.join("")
    const expenditureSoFars =this.projectone.map(s => s.expenditureSoFar)
    const expenditureSoFarcomment = expenditureSoFars.join("")
    const otherExpenditureSoFars =this.projectone.map(s => s.otherExpenditureSoFar)
    const otherExpenditureSoFarcomment = otherExpenditureSoFars.join("")
    const siteHandingovers =this.projectone.map(s => s.siteHandingover)
    const siteHandingovercomment = siteHandingovers.join("")
    const dueDateOfCompletions =this.projectone.map(s => s.dueDateOfCompletion)
    const dueDateOfCompletioncomment = dueDateOfCompletions.join("")
    const anticipatedDateOfCompletions =this.projectone.map(s => s.anticipatedDateOfCompletion)
    const anticipatedDateOfCompletioncomment = anticipatedDateOfCompletions.join("")
    const eoTUptos =this.projectone.map(s => s.eoTUpto)
    const eoTUptocomment = eoTUptos.join("")
    const pmcs =this.projectone.map(s => s.pmc)
    const pmccomment = pmcs.join("")
    const pmcAgreementValues =this.projectone.map(s => s.pmcAgreementValue)
    const pmcAgreementValuecomment = pmcAgreementValues.join("")
    const pmcExpenditureSoFars =this.projectone.map(s => s.pmcExpenditureSoFar)
    const pmcExpenditureSoFarcomment = pmcExpenditureSoFars.join("")
    const pendingApprovals =this.projectone.map(s => s.pendingApproval)
    const pendingApprovalcomment = pendingApprovals.join("")
    const ebs =this.projectone.map(s => s.eb)
    const ebcomment = ebs.join("")
    const waterSewages =this.projectone.map(s => s.waterSewage)
    const waterSewagecomment = waterSewages.join("")
    const giftDeeds =this.projectone.map(s => s.giftDeed)
    const giftDeedcomment = giftDeeds.join("")
    const handingOverToLocals =this.projectone.map(s => s.handingOverToLocal)
    const handingOverToLocalcomment = handingOverToLocals.join("")
    const b_R_No_AndDates =this.projectone.map(s => s.b_R_No_AndDate)
    const b_R_No_AndDatecomment = b_R_No_AndDates.join("")
    const workLC_releaseds =this.projectone.map(s => s.workLC_released)
    const workLC_releasedcomment = workLC_releaseds.join("")
    const financialAchievements =this.projectone.map(s => s.financialAchievement)
    const financialAchievementcomment = financialAchievements.join("")
    const costingStatuss =this.projectone.map(s => s.costingStatus)
    const costingStatuscomment = costingStatuss.join("")
    const areas =this.projectone.map(s => s.area)
    const areacomment = areas.join("")
    const values =this.projectone.map(s => s.value)
    const valuecomment = values.join("")
    const planOfActionForSales =this.projectone.map(s => s.planOfActionForSale)
    const planOfActionForSalecomment = planOfActionForSales.join("")

    const surveyno =this.projectone.map(s => s.surveyno)
    const surveynocomment = surveyno.join("")

    const totalextent =this.projectone.map(s => s.totalextent)
    const totalextentcomment = totalextent.join("")

    const map =this.projectone.map(s => s.map)
    const mapcomment =map.join("")





    const data = {

      id:idcomment,
      timestamp :this.timestampfinal,
      editby:Username,
      month : this.date ,
      project_name : pronamecomment,
      division: divcomment,
      circle :circlecomment,
      citynrural  :citynruralcomment,
      fsAdministrativesanctionValue: fsAdministrativesanctionValuecomment,
      revisedFS: revisedFScomment,
      revisedRFS: revisedRFScomment,
      typeOfWork: typeOfWorkcomment,
      contractorName: contractorNamecomment,
      thirdPartySupervision: thirdPartySupervisioncomment,
      developmentWork:developmentWorkcomment,
      agreementValue: agreementValuecomment,
      totalUnits:totalUnitscomment,
      soldUnits: soldUnitscomment,
      unsoldUnits: unsoldUnitscomment,
      expenditureSoFar: expenditureSoFarcomment,
      otherExpenditureSoFar: otherExpenditureSoFarcomment,
      siteHandingover: siteHandingovercomment,
      dueDateOfCompletion: dueDateOfCompletioncomment,
      anticipatedDateOfCompletion: anticipatedDateOfCompletioncomment,
      eoTUpto: eoTUptocomment,
      pmc: pmccomment,
      pmcAgreementValue: pmcAgreementValuecomment,
      pmcExpenditureSoFar: pmcExpenditureSoFarcomment,
      pendingApproval:pendingApprovalcomment,
      eb: ebcomment,
      waterSewage: waterSewagecomment,
      giftDeed: giftDeedcomment,
      handingOverToLocal:handingOverToLocalcomment,
      b_R_No_AndDate: b_R_No_AndDatecomment,
      workLC_released: workLC_releasedcomment,
      financialAchievement: financialAchievementcomment,
      costingStatus: costingStatuscomment,
      area: areacomment,
      value: valuecomment,
      planOfActionForSale: planOfActionForSalecomment,
      comments:this.addproject.comments,
      surveyno:surveynocomment,
      totalextent:totalextentcomment,
      map:mapcomment

};

    this.message = '';
    this.addprojectService.update(data)
      .subscribe(

        response => {
          this.submitted = true;
          this.message = response.message ? response.message : 'This data was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  parseAndDisplayValues(costingStatus: string): string[] {
    if (costingStatus) {
      const values = costingStatus.split(',').map(entry => {
        const [type, value] = entry.split(':');
        return `${type.trim()}: ${value.trim()}`;
      });

      return values;
    } else {
      return [];
    }
  }

}
