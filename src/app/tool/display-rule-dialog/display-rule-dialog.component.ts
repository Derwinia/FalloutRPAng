import { Component , Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RuleModel } from 'src/app/models/rule.model';


@Component({
  selector: 'app-display-rule-dialog',
  templateUrl: './display-rule-dialog.component.html',
  styleUrls: ['./display-rule-dialog.component.scss']
})
export class DisplayRuleDialogComponent {

  name! : string
  shortDescription! : string
  description! : string

  constructor(
    private dialogRef: MatDialogRef<DisplayRuleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RuleModel
  ){}

  ngOnInit() {
    this.name = this.data.name
    this.shortDescription = this.data.shortDescription
    this.description = this.data.description
  }

  close() {
    this.dialogRef.close();
  }
}
