import { formatDate } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddprojectService } from '../services/addproject.service';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-editproject',
  templateUrl: './editproject.component.html',
  styleUrls: ['./editproject.component.css']
})
export class EditprojectComponent implements OnInit {


  currentDate = new Date();
  date = formatDate(this.currentDate, 'yyyy-MM', 'en-US');
  timestampfinal = new Date().toString()
  typeworkNames: any[] = [];
  message = '';

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;

  updatedTimestamp: string = new Date().toString();



  fileInfos: any[] = [];

  developmentProjects: any[] = [];
  i!: number;
  projectFields: any[] = [];


  removeDevelopmentProject(index: number): void {
    const itemsFormArray = this.developmentWorkProject.get('items') as FormArray;
    itemsFormArray.removeAt(index);
  }

  calculateFinancialProgress() {
    const expenditure = parseFloat(this.addproject.dataMonitoring[0].expenditureSoFar || '0');
    const agreementValue = parseFloat(this.addproject.dataMonitoring[0].agreementValue1 || '1');
    if (!isNaN(expenditure) && !isNaN(agreementValue) && agreementValue !== 0) {
      this.addproject.dataMonitoring[0].financialProgress = ((expenditure / agreementValue) * 100).toFixed(2);
    } else {
      this.addproject.dataMonitoring[0].financialProgress = undefined;
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
  developmentWorkProject: FormGroup;
  DevelopmentWork = {
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

  fsValueFormControl = new FormControl('', [
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

  constructor(
    private addprojectService: AddprojectService,
    private route: ActivatedRoute,
    private router: Router, private uploadService: AddprojectService, private cdr: ChangeDetectorRef,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.projectFields = this.developmentProjects.map(project => ({ ...project }));
    this.message = '';
    this.developmentWorkProject = this.fb.group({
      items: this.fb.array([])
    });
    this.getRental(this.route.snapshot.params['mid']);
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

  getRental(mid: string): void {
    this.addprojectService.getdataforeditmid(mid).subscribe(
      data => {
        this.addproject = data;
        console.log(data);
        this.developmentProjects = data.developmentWorks;
        if (this.developmentProjects.length > 0) {
          this.developmentProjects.forEach((fam, i) => {
            this.addItem();
            const expansionPanel = this.items.at(i) as FormGroup;
            expansionPanel.patchValue({
              developmentWork: this.developmentProjects[i].developmentWork,
              developmentContractors: this.developmentProjects[i].developmentContractors,
              agreementValue: this.developmentProjects[i].agreementValue,
              dateOfCompletion: this.developmentProjects[i].dateOfCompletion,
              dateOfCompletionReport: this.developmentProjects[i].dateOfCompletionReport,
              expenditureSoFar1: this.developmentProjects[i].expenditureSoFar1,
              workLC_released: this.developmentProjects[i].workLC_released,
              physicalProgressDev: this.developmentProjects[i].physicalProgressDev,
              financialProgressDev: this.developmentProjects[i].financialProgressDev,
            });
          })
        }
        this.cdr.detectChanges()
      },
      error => { console.log(error); });
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(projectName: any): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const files: FileList = this.selectedFiles;
      console.log(projectName);
      if (files.length > 0) {
        this.uploadService.upload(files, projectName).subscribe((event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.uploadService.getFiles().subscribe(data => {
              this.fileInfos = data;
            })
          }
        },
          (err: any) => {
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


  updateProject(): void {
    const Username = sessionStorage.getItem('username')!;
    const mid = this.addproject.developmentWorks[0].mid;

    if (this.addproject.month === this.date) {
      let developmentPro = [];
      const devWrkPro = this.developmentWorkProject.get('items') as FormArray;
      devWrkPro.controls.forEach((developmentWorkProject: FormGroup, i) => {
        developmentPro.push({
          "id": this.addproject.developmentWorks[i].id,
          "mid": mid,
          "developmentWork": developmentWorkProject.get('developmentWork')?.value,
          "developmentContractors": developmentWorkProject.get('developmentContractors')?.value,
          "agreementValue": developmentWorkProject.get('agreementValue')?.value,
          "dateOfCompletion": developmentWorkProject.get('dateOfCompletion')?.value,
          "dateOfCompletionReport": developmentWorkProject.get('dateOfCompletionReport')?.value,
          "expenditureSoFar1": developmentWorkProject.get('expenditureSoFar1')?.value,
          "workLC_released": developmentWorkProject.get('workLC_released')?.value,
          "physicalProgressDev": developmentWorkProject.get('physicalProgressDev')?.value,
          "financialProgressDev": developmentWorkProject.get('financialProgressDev')?.value
        });
      });
      console.log(developmentPro)
      const dataMoni = this.addproject.dataMonitoring.map(a => {
        return {
          id: a.id,
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
          eb: a.eb,
          mid: mid,

          month: a.month,
          project_name: a.project_name,
        };
      })
      const data = {
        month: this.addproject.month,
        timestamp :this.timestampfinal,
        editby: Username,
        dataMonitoring: dataMoni,
        developmentWorks: developmentPro,
      };
      this.message = '';
      console.log(data);
      console.log(mid);
      this.addprojectService.updateProject(mid, data).subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This data was updated successfully!';
        },
        error => {
          console.error('Update Project Error:', error);
        });
    }
    if (this.addproject.month != this.date) {

      let developmentPro = [];
      const devWrkPro = this.developmentWorkProject.get('items') as FormArray;
      devWrkPro.controls.forEach((developmentWorkProject: FormGroup, i) => {
        developmentPro.push({
          "id": this.addproject.developmentWorks[i].id,
          "mid": mid,
          "developmentWork": developmentWorkProject.get('developmentWork')?.value,
          "developmentContractors": developmentWorkProject.get('developmentContractors')?.value,
          "agreementValue": developmentWorkProject.get('agreementValue')?.value,
          "dateOfCompletion": developmentWorkProject.get('dateOfCompletion')?.value,
          "dateOfCompletionReport": developmentWorkProject.get('dateOfCompletionReport')?.value,
          "expenditureSoFar1": developmentWorkProject.get('expenditureSoFar1')?.value,
          "workLC_released": developmentWorkProject.get('workLC_released')?.value,
          "physicalProgressDev": developmentWorkProject.get('physicalProgressDev')?.value,
          "financialProgressDev": developmentWorkProject.get('financialProgressDev')?.value
        });
      });
      const dataMoni = this.addproject.dataMonitoring.map(a => {
        return {
          id: a.id,
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
          eb: a.eb,
          mid: mid,

          month: a.month,
          project_name: a.project_name,
        };
      })
      const data = {
        month: this.addproject.month,
        timestamp :this.timestampfinal,
        editby: Username,
        dataMonitoring: dataMoni,
        developmentProjects: developmentPro
      };
      this.message = '';
      console.log(data);
      this.addprojectService.updateProject(mid, data).subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This data was updated successfully!';
        },
        error => {
          console.error('Update Project Error:', error);
        });
    }
  }



}



