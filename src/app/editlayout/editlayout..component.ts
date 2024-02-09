import { formatDate } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Datamonitor } from '../models/data.interface';
import { AddprojectService } from '../services/addproject.service';
import { Datamonitorlayout } from '../models/datalayout.interface';


@Component({
  selector: 'app-editlayout.',
  templateUrl: './editlayout..component.html',
  styleUrls: ['./editlayout.component.css']
})
export class EditlayoutComponent implements OnInit {


  currentDate = new Date();
  date = formatDate(this.currentDate, 'yyyy-MM', 'en-US');
  timestampfinal = new Date().toString()
  typeworkNames: any[] = [];
  message = '';

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;


  fileInfos: any[] = [];

  developmentProjects: any[] = [];
  i!: number;
  addDevelopmentProject() {
    this.developmentProjects.push({ ...this.addproject });

  }



  removeDevelopmentProject(index: number) {
    this.developmentProjects.splice(index, 1);
  }

  calculateFinancialProgress() {
    const expenditure = parseFloat(this.addproject.expenditure || '0');
    const agreementValue = parseFloat(this.addproject.agreementvalue || '1');

    if (!isNaN(expenditure) && !isNaN(agreementValue) && agreementValue !== 0) {
      this.addproject.financialprogress = (expenditure / agreementValue * 100).toFixed(2);
    } else {

      this.addproject.financialprogress = '';
    }
  }


  addproject: Datamonitorlayout = {

    id: '',
    timestamp: '',
    editby: '',
    month: '',
    project_name: '',
    division: '',
    circle: '',
    citynrural: '',
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
    surveyno: '',
    totalextent: '',
    map: '',
    uniquecode: '',

    //newly added


    planningPermission: '',
    buildingPermission: '',
    noc: '',
    dateOfCommencement: '',
    physicalProgress: '',
    lc_released_current_month: '',
    financialProgress: '',
    wc79: '',
    waterSupply: '',
    pmc_lc_released: '',
    developmentContractors: '',
    agreementValue1: '',
    expenditureSoFar1: '',
    completionCertificate: '',
    dateOfCompletionReport: '',

    hig: '',
    mig_I: '',
    mig_II: '',
    lig_I: '',
    lig_II: '',
    noc_value: '',
    waterSewage_value: '',
    waterSupply_value: '',
    village: '',
    sftsno: '',
    extentacres: '',
    brnodate: '',
    fsvaluers: '',
    wc79rs: '',
    rfsrs: '',
    layoutapproval: '',
    lbapproval: '',
    contractor: '',
    agreementvalue: '',
    doc: '',
    ddc: '',
    expenditure: '',
    lcreleased: '',
    physicalprogress: '',
    financialprogress: '',
    stageofwork: '',
    giftdeed: '',
    hotolb: '',
    cost: '',
    rera: '',
    completionreport: '',
    dateOfCompletionReport1: '',

  }!;



  constructor(
    private addprojectService: AddprojectService,
    private route: ActivatedRoute,
    private router: Router, private uploadService: AddprojectService) { }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const files: FileList = this.selectedFiles;
      if (files.length > 0) {
        this.uploadService.upload(files, this.addproject.project_name).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;

              this.uploadService.getFiles()
                .subscribe(data => {
                  this.fileInfos = data
                })
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });

      }

      this.selectedFiles = undefined;
    }
  }


  ngOnInit(): void {

    this.addDevelopmentProject();

    this.message = '';
    this.getRental(this.route.snapshot.params['id']);
  }
  getRental(id: string): void {

    this.addprojectService.getdataforeditlayout(id)
      .subscribe(
        data => {
          this.addproject = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateProject(): void {
    const Username = sessionStorage.getItem('username')!;

    console.log(this.addproject.month, this.date)
    if (this.addproject.month == this.date) {
      const data = {
        id: this.addproject.id,
        timestamp: this.timestampfinal,
        editby: Username,
        month: this.date,
        project_name: this.addproject.project_name,
        division: this.addproject.division,
        circle: this.addproject.circle,
        citynrural: this.addproject.citynrural,
        fsAdministrativesanctionValue: this.addproject.fsAdministrativesanctionValue,
        revisedFS: this.addproject.revisedFS,
        revisedRFS: this.addproject.revisedRFS,
        typeOfWork: this.addproject.typeOfWork,
        contractorName: this.addproject.contractorName,
        thirdPartySupervision: this.addproject.thirdPartySupervision,
        developmentWork: this.addproject.developmentWork,

        totalUnits: this.addproject.totalUnits,
        soldUnits: this.addproject.soldUnits,
        unsoldUnits: this.addproject.unsoldUnits,
        expenditureSoFar: this.addproject.expenditureSoFar,
        otherExpenditureSoFar: this.addproject.otherExpenditureSoFar,
        siteHandingover: this.addproject.siteHandingover,
        dueDateOfCompletion: this.addproject.dueDateOfCompletion,
        anticipatedDateOfCompletion: this.addproject.anticipatedDateOfCompletion,
        eoTUpto: this.addproject.eoTUpto,
        pmc: this.addproject.pmc,
        pmcAgreementValue: this.addproject.pmcAgreementValue,
        pmcExpenditureSoFar: this.addproject.pmcExpenditureSoFar,
        pendingApproval: this.addproject.pendingApproval,
        eb: this.addproject.eb,
        waterSewage: this.addproject.waterSewage,
        giftDeed: this.addproject.giftDeed,
        handingOverToLocal: this.addproject.handingOverToLocal,
        b_R_No_AndDate: this.addproject.b_R_No_AndDate,
        workLC_released: this.addproject.workLC_released,
        financialAchievement: this.addproject.financialAchievement,
        costingStatus: this.addproject.costingStatus,
        area: this.addproject.area,
        value: this.addproject.value,
        planOfActionForSale: this.addproject.planOfActionForSale,
        comments: this.addproject.comments,

        map: this.addproject.map,
        uniquecode: this.addproject.uniquecode,


        village: this.addproject.village,
        sftsno: this.addproject.sftsno,
        extentacres: this.addproject.extentacres,
        brnodate: this.addproject.brnodate,
        fsvaluers: this.addproject.fsvaluers,
        wc79rs: this.addproject.wc79rs,
        rfsrs: this.addproject.rfsrs,
        layoutapproval: this.addproject.layoutapproval,
        lbapproval: this.addproject.lbapproval,
        contractor: this.addproject.contractor,
        agreementvalue: this.addproject.agreementvalue,
        doc: this.addproject.doc,
        ddc: this.addproject.ddc,
        expenditure: this.addproject.expenditure,
        lcreleased: this.addproject.lcreleased,
        physicalprogress: this.addproject.physicalprogress,
        financialprogress: this.addproject.financialprogress,
        stageofwork: this.addproject.stageofwork,
        giftdeed: this.addproject.giftdeed,
        hotolb: this.addproject.hotolb,
        cost: this.addproject.cost,
        rera: this.addproject.rera,
        completionreport: this.addproject.completionreport,
        dateOfCompletionReport1: this.addproject.dateOfCompletionReport1,


      };

      this.message = '';
      this.addprojectService.updatelayout(data)
        .subscribe(

          response => {

            this.message = response.message ? response.message : 'This data was updated successfully!';
          },
          error => {
            console.log(error);
          });
    }
    if (this.addproject.month != this.date) {

      const data = {
        timestamp: this.timestampfinal,
        editby: Username,
        month: this.date,
        project_name: this.addproject.project_name,
        division: this.addproject.division,
        circle: this.addproject.circle,
        citynrural: this.addproject.citynrural,
        fsAdministrativesanctionValue: this.addproject.fsAdministrativesanctionValue,
        revisedFS: this.addproject.revisedFS,
        revisedRFS: this.addproject.revisedRFS,
        typeOfWork: this.addproject.typeOfWork,
        contractorName: this.addproject.contractorName,
        thirdPartySupervision: this.addproject.thirdPartySupervision,
        developmentWork: this.addproject.developmentWork,

        totalUnits: this.addproject.totalUnits,
        soldUnits: this.addproject.soldUnits,
        unsoldUnits: this.addproject.unsoldUnits,
        expenditureSoFar: this.addproject.expenditureSoFar,
        otherExpenditureSoFar: this.addproject.otherExpenditureSoFar,
        siteHandingover: this.addproject.siteHandingover,
        dueDateOfCompletion: this.addproject.dueDateOfCompletion,
        anticipatedDateOfCompletion: this.addproject.anticipatedDateOfCompletion,
        eoTUpto: this.addproject.eoTUpto,
        pmc: this.addproject.pmc,
        pmcAgreementValue: this.addproject.pmcAgreementValue,
        pmcExpenditureSoFar: this.addproject.pmcExpenditureSoFar,
        pendingApproval: this.addproject.pendingApproval,
        eb: this.addproject.eb,
        waterSewage: this.addproject.waterSewage,
        giftDeed: this.addproject.giftDeed,
        handingOverToLocal: this.addproject.handingOverToLocal,
        b_R_No_AndDate: this.addproject.b_R_No_AndDate,
        workLC_released: this.addproject.workLC_released,
        financialAchievement: this.addproject.financialAchievement,
        costingStatus: this.addproject.costingStatus,
        area: this.addproject.area,
        value: this.addproject.value,
        planOfActionForSale: this.addproject.planOfActionForSale,
        surveyno: this.addproject.surveyno,
        totalextent: this.addproject.totalextent,
        map: this.addproject.map,
        uniquecode: this.addproject.uniquecode,
        //newly added


        planningPermission: this.addproject.planningPermission,
        buildingPermission: this.addproject.buildingPermission,
        noc: this.addproject.noc,
        dateOfCommencement: this.addproject.dateOfCommencement,
        physicalProgress: this.addproject.physicalProgress,
        lc_released_current_month: this.addproject.lc_released_current_month,
        financialProgress: this.addproject.financialProgress,
        wc79: this.addproject.wc79,
        waterSupply: this.addproject.waterSupply,
        pmc_lc_released: this.addproject.pmc_lc_released,
        developmentContractors: this.addproject.developmentContractors,
        agreementValue1: this.addproject.agreementValue1,
        expenditureSoFar1: this.addproject.expenditureSoFar1,
        completionCertificate: this.addproject.completionCertificate,
        dateOfCompletionReport: this.addproject.dateOfCompletionReport,

        hig: this.addproject.hig,
        mig_I: this.addproject.mig_I,
        mig_II: this.addproject.mig_II,
        lig_I: this.addproject.lig_I,
        lig_II: this.addproject.lig_II,
        noc_value: this.addproject.noc_value,
        waterSewage_value: this.addproject.waterSewage_value,
        waterSupply_value: this.addproject.waterSupply_value,
        village: this.addproject.village,
        sftsno: this.addproject.sftsno,
        extentacres: this.addproject.extentacres,
        brnodate: this.addproject.brnodate,
        fsvaluers: this.addproject.fsvaluers,
        wc79rs: this.addproject.wc79rs,
        rfsrs: this.addproject.rfsrs,
        layoutapproval: this.addproject.layoutapproval,
        lbapproval: this.addproject.lbapproval,
        contractor: this.addproject.contractor,
        agreementvalue: this.addproject.agreementvalue,
        doc: this.addproject.doc,
        ddc: this.addproject.ddc,
        expenditure: this.addproject.expenditure,
        lcreleased: this.addproject.lcreleased,
        physicalprogress: this.addproject.physicalprogress,
        financialprogress: this.addproject.financialprogress,
        stageofwork: this.addproject.stageofwork,
        giftdeed: this.addproject.giftdeed,
        hotolb: this.addproject.hotolb,
        cost: this.addproject.cost,
        rera: this.addproject.rera,
        completionreport: this.addproject.completionreport,
        dateOfCompletionReport1: this.addproject.dateOfCompletionReport1,


      };
      let developmentPro = [];

      const dataFinal = {
        month: this.date,
        timestamp: new Date().toString(),
        editby: Username,
        dataMonitoring: [data],
        developmentProjects: developmentPro
      };

      this.message = '';
      this.addprojectService.update(dataFinal)
        .subscribe(

          response => {

            this.message = response.message ? response.message : 'This data was updated successfully!';
          },
          error => {
            console.log(error);
          });
    }
  }
}



