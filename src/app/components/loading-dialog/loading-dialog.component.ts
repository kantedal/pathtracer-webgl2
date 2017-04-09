import {Component} from "@angular/core";
import {MdDialogRef} from "@angular/material";
@Component({
  selector: 'loading-dialog',
  templateUrl: './loading-dialog.html',
  styleUrls: ['loading-dialog.css']
})
export class LoadingDialogComponent {
  constructor(public dialogRef: MdDialogRef<LoadingDialogComponent>) {}
}