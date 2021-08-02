import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

// https://medium.com/@tarekabdelkhalek/how-to-create-a-drag-and-drop-file-uploading-in-angular-78d9eba0b854
@Directive({
  selector: '[appDragAndDropUpload]',
})
export class DragAndDropUploadDirective {
  @HostBinding('class.fileover') fileOver: boolean = false;

  @Output() fileDropped = new EventEmitter<FileList>();
  constructor() {}

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();

    this.fileOver = true;
    console.log('Drag Over');
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();

    console.log('Drag Leave');
  }

  // Drop Listener
  @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();

    this.fileOver = false;
    const files = evt.dataTransfer?.files;

    if (files?.length! > 0) {
      console.log(`You dropped ${files?.length} files.`);
      this.fileDropped.emit(files!);
    }
  }
}
