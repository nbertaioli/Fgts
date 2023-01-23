// file-input.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import ExtratoFgtsDTO from 'src/app/Interfaces/extrato-fgts.dto';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {
  selectedFiles!: FileList;
  validFiles: File[] = [];
  data!: ExtratoFgtsDTO[];
  isLoading = false;
  files!: FileList;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.validFiles = [];
    this.selectedFiles = event.target.files;
    this.validateSelectedFiles();
  }

  validateSelectedFiles() {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      let file = this.selectedFiles[i];
      if (file.type === 'application/pdf' || file.type === 'image/jpeg') {
        this.validFiles.push(file);
      }
    }
  }

  uploadFiles() {
    this.isLoading = true;

    let formData = new FormData();
    for (let i = 0; i < this.validFiles.length; i++) {
      formData.append('files', this.validFiles[i]);
    }

    const headers = new HttpHeaders().set('x-functions-key', 'NAzny5gk-4fvjBMYfw0wpedP0MRCNmZ0oCAIwSYgS4uOAzFux3MkZA==');
    this.http.post<ExtratoFgtsDTO[]>('https://extratofgts.azurewebsites.net/api/files?code=3kxyfXNPU7Z1Yi0XF-EjD2PaGRsdJJLtYLQRhbHL5Yu6AzFupZMAhA==', formData, {headers}).subscribe(
      (response) => {
        this.data = response;
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
