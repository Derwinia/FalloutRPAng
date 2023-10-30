import { Component , Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-detail-mission-dialog',
  templateUrl: './detail-mission-dialog.component.html',
  styleUrls: ['./detail-mission-dialog.component.scss']
})
export class DetailMissionDialogComponent {


  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DetailMissionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ){}

  ngOnInit() {

  }

  close() {
      this.dialogRef.close();
  }
}
