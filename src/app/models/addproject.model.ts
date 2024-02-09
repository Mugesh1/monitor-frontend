export class Addproject {


      month ?: string ;
      timestamp ?: string ;
      editby ?:string;
      project_name ?: string ;
      division ?: string;
      circle ?:string;
      citynrural  ?:string;
      fsAdministrativesanctionValue ?: string;
      revisedFS ?: string;
      revisedRFS ?: string;
      typeOfWork ?: string;
      contractorName ?: string;
      thirdPartySupervision ?: string;
      developmentWork ?: string;
      agreementValue ?: string;
      totalUnits ?: string;
      soldUnits ?: string;
      unsoldUnits ?: string;
      expenditureSoFar ?: string;
      otherExpenditureSoFar ?: string;
      siteHandingover ?: string;
      dueDateOfCompletion ?: string;
      anticipatedDateOfCompletion ?: string;
      eoTUpto ?: string;
      pmc ?: string;
      pmcAgreementValue ?: string;
      pmcExpenditureSoFar ?: string;
      pendingApproval ?: string;
      eb ?: string;
      waterSewage ?: string;
      giftDeed ?: string;
      handingOverToLocal ?: string;
      b_R_No_AndDate ?: string;
      workLC_released ?: string;
      financialAchievement ?: string;
      costingStatus ?: string;
      area ?: string;
      value ?: string;
      planOfActionForSale ?: string;
      comments ?: string;
      surveyno ?: string;
      totalextent ?: string;
      map ?: string;
      uniquecode ?: string;

      layoutApproval?: string;
      planningPermission?: string;
      buildingPermission?:string;
      noc?:string;
      dateOfCommencement?:string;
      physicalProgress?:string;
      lc_released_current_month?:string;
      financialProgress?:string;
      wc79?:string;
      waterSupply?:string;
      pmc_lc_released?:string;
      developmentContractors?:string;
      agreementValue1?:string;
      expenditureSoFar1?:string;
      completionCertificate?:string;
      dateOfCompletionReport?:string;
      rera?:string;
      hig?:string;
      mig_I?:string;
      mig_II?:string;
      lig_I?:string;
      lig_II?:string;
      noc_value?:string;
      waterSewage_value?:string;
      waterSupply_value?:string;
      village?:string;
      physicalProgressDev?:string;
      financialProgressDev?:string;
      cmwssb_twad?:string;
      dateOfCompletionReport1?:string;
      dateOfCompletionReport2?:string;
      dateOfCompletion?:string;
      developmentWorks: DevelopmentWork[] = [];

   }
   export interface DevelopmentWork {
    month?:string;
    project_name?: string;
    developmentWork?: string;
    developmentContractors?: string;
    agreementValue?: string;
    dateOfCompletion?: string;
    dateOfCompletionReport?: string;
    expenditureSoFar1?: string;
    workLC_released?: string;
    physicalProgressDev?: string;
    financialProgressDev?: string;
  }

