import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddprojectService } from '../services/addproject.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-view',
  templateUrl: './viewlayout.component.html',
  styleUrls: ['./viewlayout.component.css']
})
export class ViewlayoutComponent implements OnInit {

  project: any[] = [];

  currentDate = new Date();
  message = '';
  date = formatDate(this.currentDate, 'yyyy-MM', 'en-US');
  selectedFile!: File;
  imgURL: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  imageName: any;
  mapName: any;
  fileInfos: any[] = [];
  pdfFiles: any[] = [];

  constructor(
    private addprojectService: AddprojectService,
    private route: ActivatedRoute,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private uploadService: AddprojectService
  ) { }

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
      this.project = data.filter(s => s.project_name === this.route.snapshot.paramMap.get('project') && s.month == this.date);

      console.log(this.project)
      const fsValue = this.project.map(s => s.fsAdministrativesanctionValue)[0];

      if (fsValue) {
        this.project[0].fsAdministrativesanctionValue = (fsValue / 100000).toFixed(2);
      }

      const duedate = this.project.map(s => s.project_name)

      this.imageName = duedate
      this.httpClient.get('http://localhost:5000//image/get/' + this.imageName)
        .subscribe(
          res => {
            console.log(res);
            this.retrieveResonse = res;
            this.base64Data = this.retrieveResonse.picByte;
            this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          }
        );
    });

    this.uploadService.getFiles().subscribe(data => {
      console.log(data);
      const proname = this.project.map(s => s.project_name)
      const pronamecomment = proname.join("")
      this.fileInfos = data.filter(s => s.name === pronamecomment && s.type === 'image/jpeg');

      this.pdfFiles = data.filter(s => s.name === pronamecomment && s.type === 'application/pdf');
    })
  }

  Deletelayout(project_name: string): void {
    if (window.confirm('Are you sure to delete this project?')) {
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

  Print(): void {
    window.print();
    window.location.reload();
  }

  onDeleteFile(event: Event, fileUrl: string): void {
    event.preventDefault();

    const pdfFileId = this.extractFileIdFromUrl(fileUrl);

    if (!pdfFileId) {
      console.error('PDF File ID is undefined or null');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this file?');

    if (confirmDelete) {
      this.addprojectService.deleteFile(pdfFileId).subscribe(
        (response) => {
          console.log('PDF File deleted successfully');

          this.pdfFiles = this.pdfFiles.filter(file => file.url !== fileUrl);

          const successMessage = response.message ? response.message : 'This document was deleted successfully!';
          alert(successMessage);

          // Reload the page after successful deletion
          location.reload();
        },
        error => {
          console.error('Failed to delete PDF file', error);
        }
      );
    }
  }




  private extractFileIdFromUrl(fileUrl: string): string | null {
    const segments = fileUrl.split('/');
    return segments.length > 0 ? segments[segments.length - 1] : null;
  }



}
