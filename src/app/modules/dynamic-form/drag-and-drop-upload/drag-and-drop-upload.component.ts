import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Compress from 'compress.js';
export interface ImageFileData {
  name: string;
  size: string;
  url: string | ArrayBuffer;
}
@Component({
  selector: 'app-drag-and-drop-upload',
  templateUrl: './drag-and-drop-upload.component.html',
  styleUrls: ['./drag-and-drop-upload.component.scss'],
})
export class DragAndDropUploadComponent implements OnInit, OnChanges {
  @ViewChild('fileDropRef', { read: ElementRef, static: true }) fileDropEl:
    | ElementRef
    | undefined;

  files: ImageFileData[] = [];

  @Output() fileData = new EventEmitter<ImageFileData[]>();
  @Input() reset!: boolean;
  @Input() formGroup!: FormGroup;

  // Used to map key value pair
  formData = new FormData();

  /**
   * on file drop handler
   */
  onFileDropped(files: any) {
    console.log(files);
    this.prepareFilesList([...files]);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(event: any) {
    console.log(event);

    this.prepareFilesList([...event.target.files]);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number, key: string) {
    this.files.splice(index, 1);
    this.formData.delete(key);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    const compress = new Compress();

    compress
      .compress(files, {
        size: 4,
        quality: 0.75,
        maxWidth: 1920,
        maxHeight: 1920,
        resize: true,
      })
      .then((imgData) => {
        console.log(imgData);
        for (const { data, ext, alt } of imgData) {
          if (this.formData.get(alt) === null) {
            const newFile = Compress.convertBase64ToFile(data, ext);

            console.log(this.formData.get(alt), alt);

            this.formData.append(alt, newFile);

            const reader = new FileReader();
            reader.readAsDataURL(newFile);
            reader.onload = (e) => {
              this.files.push({
                name: alt,
                size: this.formatBytes(newFile.size),
                url: e.target?.result!,
              });

              console.log(this.files);
              this.fileData.emit(this.files);
              // image.src = e.target?.result! as string;
            };
          } else {
            this.matSnack.open(
              'Duplicate Upload: Already uploaded file with given name',
              'Dismiss',
              {
                duration: 3 * 1000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
              }
            );
          }
        }
      });

    if (this.fileDropEl) this.fileDropEl.nativeElement.value = '';
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  constructor(private matSnack: MatSnackBar) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.formGroup.value.images);
    console.log(this.files);

    if (changes['reset']) {
      this.files = [];
      this.formData = new FormData();
    }

    this.files = this.formGroup.value.images || [];

    console.log(this.files);
  }

  ngOnInit(): void {}
}
