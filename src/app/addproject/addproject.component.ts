import { formatDate } from '@angular/common';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DevelopmentWork } from '../models/addproject.model';
import { AddprojectService } from '../services/addproject.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css'],

})
export class AddprojectComponent implements OnInit {
  allprojects: any[] = [];
  projectNames: any[] = [];
  divisionNames: any[] = [];
  circleNames: any[] = [];
  cityNames: any[] = [];
  typeworkNames: any[] = [];
  currentDate = new Date();
  date = formatDate(this.currentDate, 'yyyy-MM', 'en-US');
  timestampfinal = new Date().toString()
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  message1 = '';
  formattedFsValue: string = '';
  totalUnits: string = '';
  soldUnits: string = '';
  unsoldUnits: string = '';
  developmentWorkProject: FormGroup;
  fileInfos: any[] = [];
  developmentProjects: Array<any> = [];
  developmentWorks: DevelopmentWork[] = [];
  i!: number;
  addproject: any = {
    id: '',
    mid: '',
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

    layoutApproval: '',
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
    rera: '',
    hig: '',
    mig_I: '',
    mig_II: '',
    lig_I: '',
    lig_II: '',
    noc_value: '',
    waterSewage_value: '',
    waterSupply_value: '',
    village: '',
    physicalProgressDev: '',
    financialProgressDev: '',
    cmwssb_twad: '',
    dateOfCompletionReport2: '',
    dateOfCompletionReport1: '',
    dateOfCompletion: '',
    developmentWorks: [
      {
        month: '',
        project_name: '',
        developmentWork: '',
        developmentContractors: '',
        agreementValue: '',
        dateOfCompletion: '',
        dateOfCompletionReport: '',
        expenditureSoFar1: '',
        workLC_released: '',
        physicalProgressDev: '',
        financialProgressDev: '',
      }
    ],
  };
  submitted = false;

  fsAdministrativesanctionValue = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[0-9]+$/),
  ]);

  wc79FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[0-9]+$/),
  ]);

  revisedFSFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[0-9]+$/),
  ]);

  lcReleasedFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[0-9]+$/),
  ]);

  pmcAgreementValueFormControl = new FormControl('',[
    Validators.required,
    Validators.pattern(/^[0-9]+$/),
  ])

  pmcExpenditureSoFarFormControl = new FormControl('',[
    Validators.required,
    Validators.pattern(/^[0-9]+$/),
  ])

  pmc_lc_releasedFormControl = new FormControl('',[
    Validators.required,
    Validators.pattern(/^[0-9]+$/),
  ])

  workLC_releasedFormControl = new FormControl('',[
    Validators.required,
    Validators.pattern(/^[0-9]+$/),
  ])

  costingStatusFormControl = new FormControl('',[
    Validators.required,
    Validators.pattern(/^[0-9]+$/),
  ])

  constructor(private addprojectService: AddprojectService, private router: Router, private httpClient: HttpClient,
    private http: HttpClient, private uploadService: AddprojectService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.developmentWorkProject = this.fb.group({
      items: this.fb.array([])
    });
    this.addItem();
    this.addprojectService.getDataforDivcircity().subscribe(data => {
      this.allprojects = data;
      this.divisionNames = this.allprojects.map(s => s.division).filter((v, i, a) => a.indexOf(v) === i);
      this.circleNames = this.allprojects.map(s => s.circle).filter((v, i, a) => a.indexOf(v) === i);
      this.cityNames = this.allprojects.map(s => s.citynrural).filter((v, i, a) => a.indexOf(v) === i);
      this.typeworkNames = this.allprojects.map(s => s.typeOfWork).filter((v, i, a) => a.indexOf(v) === i);

    },
    );
    this.uploadService.getFiles().subscribe(data => {
      this.fileInfos = data
    })


  }

  createItem(): FormGroup {
    return this.fb.group({
      developmentWork: [''],
      developmentContractors: [''],
      agreementValue: [''],
      dateOfCompletion: [''],
      dateOfCompletionReport: [''],
      expenditureSoFar1: [''],
      workLC_released: [''],
      physicalProgressDev: [''],
      financialProgressDev: [''],
    });
  }

  addItem() {
    const itemsFormArray = this.developmentWorkProject.get('items') as FormArray;
    if (itemsFormArray.length < 5) {
      const newItem = this.createItem();
      itemsFormArray.push(newItem);
    } else {
      console.log('You cannot add more than 5 items.');
    }
  }

  get items() {
    return (this.developmentWorkProject.get('items') as FormArray).controls;
  }

  removeDevelopmentProject(index: number) {
    const itemsFormArray = this.developmentWorkProject.get('items') as FormArray;
    itemsFormArray.removeAt(index);
  }

  trackByFn(index: number, item: any): number {
    return index;
  }



  calculateFinancialProgress() {
    const expenditure = parseFloat(this.addproject.expenditureSoFar || '0');
    const agreementValue = parseFloat(this.addproject.agreementValue1 || '1');
    if (!isNaN(expenditure) && !isNaN(agreementValue) && agreementValue !== 0) {
      this.addproject.financialProgress = (expenditure / agreementValue * 100).toFixed(2);
    } else {
      this.addproject.financialProgress = undefined;
    }
  }

  calculateFinancialProgressDev(index: number) {
    const formArray = this.developmentWorkProject.get('items') as FormArray | null;

    if (formArray) {
      const expenditure = parseFloat(formArray.at(index)?.get('expenditureSoFar1')?.value || '0');
      const agreementValue = parseFloat(formArray.at(index)?.get('agreementValue')?.value || '1');

      if (!isNaN(expenditure) && !isNaN(agreementValue) && agreementValue !== 0) {
        formArray.at(index)?.get('financialProgressDev')?.setValue((expenditure / agreementValue * 100).toFixed(2));
      } else {
        formArray.at(index)?.get('financialProgressDev')?.setValue(undefined);
      }
    }
  }


  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
  }

  convertToLakhs(value: number): string {
    if (!isNaN(value)) {
      const lakhsValue = value / 100000;
      return lakhsValue.toFixed(2) + ' Lakh';
    }
    return '';
  }

  upload(projectName: any): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const files: FileList = this.selectedFiles;
      if (files.length > 0) {
        this.uploadService.upload(files, projectName).subscribe((event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.uploadService.getFiles().subscribe(data => {
              this.fileInfos = data
            })
          }
        }, (err: any) => {
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

  onFsValueChange(): void {
    const inputValue = parseFloat(this.addproject.fsAdministrativesanctionValue || '0');
    this.formattedFsValue = this.convertToLakhs(inputValue);
  }

  saveProject1(): void {
    const Username = sessionStorage.getItem('username')!;
    let developmentPro = [];
    const devWrkPro = this.developmentWorkProject.get('items') as FormArray;
    devWrkPro.controls.forEach((developmentWorkProject: FormGroup, i) => {
      developmentPro.push({
        month: this.date,
        "developmentWork": devWrkPro.value[i].developmentWork,
        "developmentContractors": devWrkPro.value[i].developmentContractors,
        "agreementValue": devWrkPro.value[i].agreementValue,
        "dateOfCompletion": devWrkPro.value[i].dateOfCompletion,
        "dateOfCompletionReport": devWrkPro.value[i].dateOfCompletionReport,
        "expenditureSoFar1": devWrkPro.value[i].expenditureSoFar1,
        "workLC_released": devWrkPro.value[i].workLC_released,
        "physicalProgressDev": devWrkPro.value[i].physicalProgressDev,
        "financialProgressDev": devWrkPro.value[i].financialProgressDev
      });
    });
    let add = [];
    add.push(this.addproject)
    console.log(add)
    const dataMoni = add.map(a => {
      return {
        division: a.division,
        circle: a.circle,
        citynrural: a.citynrural,
        fsAdministrativesanctionValue: a.fsAdministrativesanctionValue,
        revisedFS: a.revisedFS,
        contractorName: a.contractorName,
        expenditureSoFar: a.expenditureSoFar,
        dueDateOfCompletion: a.dueDateOfCompletion,
        pmc: a.pmc,
        pmcAgreementValue: a.pmcAgreementValue,
        pmcExpenditureSoFar: a.pmcExpenditureSoFar,
        b_R_No_AndDate: a.b_R_No_AndDate,
        costingStatus: a.costingStatus,
        surveyno: a.surveyno,
        totalextent: a.totalextent,
        map: a.map,
        uniquecode: a.uniquecode,
        planningPermission: a.planningPermission,
        buildingPermission: a.buildingPermission,
        dateOfCommencement: a.dateOfCommencement,
        physicalProgress: a.physicalProgress,
        lc_released_current_month: a.lc_released_current_month,
        financialProgress: a.financialProgress,
        wc79: a.wc79,
        waterSupply: a.waterSupply,
        pmc_lc_released: a.pmc_lc_released,
        developmentContractors: a.developmentContractors,
        agreementValue1: a.agreementValue1,
        completionCertificate: a.completionCertificate,
        dateOfCompletionReport: a.dateOfCompletionReport,
        rera: a.rera,
        village: a.village,
        cmwssb_twad: a.cmwssb_twad,
        dateOfCompletionReport2: a.dateOfCompletionReport2,
        project_name: a.project_name,
        month: this.date,
      };
    })
    const data = {
      month: this.date,
      timestamp: new Date().toString(),
      editby: Username,
      dataMonitoring: dataMoni,
      developmentProjects: developmentPro
    };
    console
    this.addprojectService.create(data).subscribe((response) => {
      this.submitted = true;
    }, (error) => {
      console.log(error);
    }
    );
  }

  saveProject(): void {
    const Username = sessionStorage.getItem('username')!;
    console.log(Username);
    console.log("this.addproject", this.addproject);

    let developmentPro = [];
    const devWrkPro = this.developmentWorkProject.get('items') as FormArray;
    devWrkPro.controls.forEach((developmentWorkProject: FormGroup, i) => {
      developmentPro.push({
        month: this.date,
        "developmentWork": devWrkPro.value[i].developmentWork,
        "developmentContractors": devWrkPro.value[i].developmentContractors,
        "agreementValue": devWrkPro.value[i].agreementValue,
        "dateOfCompletion": devWrkPro.value[i].dateOfCompletion,
        "dateOfCompletionReport": devWrkPro.value[i].dateOfCompletionReport,
        "expenditureSoFar1": devWrkPro.value[i].expenditureSoFar1,
        "workLC_released": devWrkPro.value[i].workLC_released,
        "physicalProgressDev": devWrkPro.value[i].physicalProgressDev,
        "financialProgressDev": devWrkPro.value[i].financialProgressDev
      });
    });
    let add = [];
    add.push(this.addproject)

    const dataMonitoring: any[] = this.addproject.datamonitoring || [];

    if (developmentPro.length > 0) {
      dataMonitoring.push({
        month: this.date,
        project_name: this.addproject.project_name,
        uniquecode: this.addproject.uniquecode,
        citynrural: this.addproject.citynrural,
        circle: this.addproject.circle,
        division: this.addproject.division,
        village: this.addproject.village,
        surveyno: this.addproject.surveyno,
        totalextent: this.addproject.totalextent,
        b_R_No_AndDate: this.addproject.b_R_No_AndDate,
        fsAdministrativesanctionValue: this.addproject.fsAdministrativesanctionValue,
        wc79: this.addproject.wc79,
        revisedFS: this.addproject.revisedFS,
        planningPermission: this.addproject.planningPermission,
        buildingPermission: this.addproject.buildingPermission,
        contractorName: this.addproject.contractorName,
        agreementValue1: this.addproject.agreementValue1,
        dateOfCommencement: this.addproject.dateOfCommencement,
        dueDateOfCompletion: this.addproject.dueDateOfCompletion,
        expenditureSoFar: this.addproject.expenditureSoFar,
        lc_released_current_month: this.addproject.lc_released_current_month,
        physicalProgress: this.addproject.physicalProgress,
        financialProgress: this.addproject.financialProgress,
        pmc: this.addproject.pmc,
        pmcAgreementValue: this.addproject.pmcAgreementValue,
        pmcExpenditureSoFar: this.addproject.pmcExpenditureSoFar,
        pmc_lc_released: this.addproject.pmc_lc_released,
        eb: this.addproject.eb,
        cmwssb_twad: this.addproject.cmwssb_twad,
        completionCertificate: this.addproject.completionCertificate,
        dateOfCompletionReport1: this.addproject.dateOfCompletionReport1,
        costingStatus: this.addproject.costingStatus,
        rera: this.addproject.rera,
        dateOfCompletionReport2: this.addproject.dateOfCompletionReport2,
        map: this.addproject.map,
        developmentWorks: developmentPro,
      });
    }

    this.addproject.developmentWorks = developmentPro;

    const data = {
      month: this.date,
      timestamp: this.timestampfinal,
      editby: Username,
      dataMonitoring: dataMonitoring,
      developmentWorks: developmentPro,
    };

    this.addprojectService.create(data).subscribe(
      (response) => {
        this.submitted = true;
        console.log('Data saved successfully:', response);
      },
      (error) => {
        console.log('Error saving data:', error);
      }
    );
  }


  newAddproject(): void {
    this.submitted = false;
    this.addproject = {

      month: '',
      timestamp: '',
      editby: '',
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
      layoutApproval: '',
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
      rera: '',
      hig: '',
      mig_I: '',
      mig_II: '',
      lig_I: '',
      lig_II: '',
      noc_value: '',
      waterSewage_value: '',
      waterSupply_value: '',
      village: '',
      developmentWorks: [],
    };
  }

}

