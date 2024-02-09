import { formatDate } from '@angular/common';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { AddprojectService } from '../services/addproject.service';
import { Addlayout } from '../models/addlayout.model';



@Component({
  selector: 'app-addlayout',
  templateUrl: './addlayout.component.html',
  styleUrls: ['./addlayout.component.css'],

})
export class AddlayoutComponent implements OnInit {

  allprojects: any[] = [];
  projectNames: any[] = [];
  divisionNames: any[] = [];
  circleNames: any[] = [];
  cityNames: any[] = [];
  typeworkNames: any[] = [];
  currentDate = new Date();
  date = formatDate(this.currentDate, 'yyyy-MM', 'en-US');
  timestampfinal =new Date().toString()
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  message1 = '';
  formattedFsValue: string = '';

  totalUnits: string = '';
  soldUnits: string = '';
  unsoldUnits: string = '';

  fileInfos:any[]=[];

  developmentProjects: any[] = [];
  i!: number;
  addDevelopmentProject() {

    this.developmentProjects.push({ ...this.addproject });
    this.addproject = {

    };
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

      this.addproject.financialprogress = undefined;
    }
  }


  addproject: Addlayout = {


      month : '',
      timestamp:'',
      editby:'',
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


  };

  submitted = false;

  constructor(private addprojectService: AddprojectService, private router: Router,private httpClient: HttpClient,
    private http: HttpClient,private uploadService: AddprojectService) { }

    selectFile(event: any): void {
      this.selectedFiles = event.target.files;
    }

    onFileSelected(event: any): void {
      this.selectedFiles = event.target.files;
    }

    // convertToLakhs(value: number): string {
    //   if (!isNaN(value)) {
    //     // Assuming the input is in rupees, and you want to display in lakhs
    //     const lakhsValue = value / 100000;
    //     return lakhsValue.toFixed(2) + ' Lakh';
    //   }
    //   return '';
    // }




    upload(): void {
      this.progress = 0;

      if (this.selectedFiles) {
        const files: FileList = this.selectedFiles;
        if (files.length > 0) {
          this.uploadService.upload(files,this.addproject.project_name).subscribe(
            (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
              } else if (event instanceof HttpResponse) {
                this.message = event.body.message;

                this.uploadService.getFiles()
              .subscribe(data => {
                this.fileInfos = data})
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



        this.addprojectService.getDataforDivcircitylayout()
        .subscribe(
          data => {
            this.allprojects = data;
            this.divisionNames = this.allprojects.map(s => s.division).filter((v, i, a) => a.indexOf(v) === i);
            this.circleNames = this.allprojects.map(s => s.circle).filter((v, i, a) => a.indexOf(v) === i);
            this.cityNames = this.allprojects.map(s => s.citynrural).filter((v, i, a) => a.indexOf(v) === i);
            this.typeworkNames = this.allprojects.map(s => s.typeOfWork).filter((v, i, a) => a.indexOf(v) === i);

          },
          );

          this.uploadService.getFiles()
            .subscribe(data => {
              this.fileInfos = data})

              this.addDevelopmentProject();

        }

        updateUnsoldUnits(): void {
            if (this.addproject.totalUnits !== undefined && this.addproject.soldUnits !== undefined) {
            const totalUnits = parseFloat(this.addproject.totalUnits);
            const soldUnits = parseFloat(this.addproject.soldUnits);

            const unsoldUnitsValue = totalUnits - soldUnits;
            this.addproject.unsoldUnits = isNaN(unsoldUnitsValue) ? '' : unsoldUnitsValue.toString();
          } else {
              this.addproject.unsoldUnits = '';
          }
        }

        // onFsValueChange(): void {
        //   const inputValue = parseFloat(this.addproject.fsAdministrativesanctionValue || '0');
        //   this.formattedFsValue = this.convertToLakhs(inputValue);
        // }



  saveProject(): void {
    const Username = sessionStorage.getItem('username')! ;
    const data = {
      month : this.date,
      timestamp :this.timestampfinal,
      editby:Username,
        project_name : this.addproject.project_name,
        uniquecode : this.addproject.uniquecode,
        citynrural  :this.addproject.citynrural,
        circle :this.addproject.circle,
        division: this.addproject.division,
        village:this.addproject.village,
        surveyno : this.addproject.surveyno,
        totalextent : this.addproject.totalextent,
        b_R_No_AndDate: this.addproject.b_R_No_AndDate,
        fsAdministrativesanctionValue: this.addproject.fsAdministrativesanctionValue,
        wc79:this.addproject.wc79,
        revisedFS: this.addproject.revisedFS,
        planningPermission:this.addproject.planningPermission,
        buildingPermission:this.addproject.buildingPermission,
        contractorName: this.addproject.contractorName,
        agreementValue1:this.addproject.agreementValue1,
        dateOfCommencement:this.addproject.dateOfCommencement,
        dueDateOfCompletion: this.addproject.dueDateOfCompletion,
        expenditureSoFar: this.addproject.expenditureSoFar,
        lc_released_current_month:this.addproject.lc_released_current_month,
        physicalProgress:this.addproject.physicalProgress,
        financialProgress:this.addproject.financialProgress,
        pmc: this.addproject.pmc,
        pmcAgreementValue: this.addproject.pmcAgreementValue,
        pmcExpenditureSoFar: this.addproject.pmcExpenditureSoFar,
        pmc_lc_released:this.addproject.pmc_lc_released,
        eb: this.addproject.eb,
        cmwssb_twad:this.addproject.cmwssb_twad,
        completionCertificate:this.addproject.completionCertificate,
        dateOfCompletionReport1:this.addproject.dateOfCompletionReport1,
        costingStatus: this.addproject.costingStatus,

        dateOfCompletionReport2:this.addproject.dateOfCompletionReport2,
        map : this.addproject.map,
        sftsno:this.addproject.sftsno,
        extentacres:this.addproject.extentacres,
        brnodate:this.addproject.brnodate,
        fsvaluers:this.addproject.fsvaluers,
        wc79rs:this.addproject.wc79rs,
        rfsrs:this.addproject.rfsrs,
        layoutapproval:this.addproject.layoutapproval,
        lbapproval:this.addproject.lbapproval,
        contractor:this.addproject.contractor,
        agreementvalue:this.addproject.agreementvalue,
        doc:this.addproject.doc,
        ddc:this.addproject.ddc,
        expenditure:this.addproject.expenditure,
        lcreleased:this.addproject.lcreleased,
        physicalprogress:this.addproject.physicalprogress,
        financialprogress:this.addproject.financialprogress,
        stageofwork:this.addproject.stageofwork,
        giftdeed:this.addproject.giftdeed,
        hotolb:this.addproject.hotolb,
        cost:this.addproject.cost,
        rera:this.addproject.rera,
        completionreport:this.addproject.completionreport,

};

    this.addprojectService.createlayout(data)
      .subscribe(
        response => {
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }



  newAddproject(): void {
    this.submitted = false;
    this.addproject = {

      month : '',
      timestamp :'',
      editby:'',
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
      agreementvalue: '',
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
      uniquecode : '',

      //newly added
      layoutapproval:'',
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
      rera:'',
      hig:'',
      mig_I:'',
      mig_II:'',
      lig_I:'',
      lig_II:'',
      noc_value:'',
      waterSewage_value:'',
      waterSupply_value:'',
      village:'',
    };
  }

}
