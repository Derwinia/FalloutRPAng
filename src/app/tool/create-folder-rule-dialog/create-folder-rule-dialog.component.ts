import { Component , Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-create-folder-rule-dialog',
  templateUrl: './create-folder-rule-dialog.component.html',
  styleUrls: ['./create-folder-rule-dialog.component.scss']
})
export class CreateFolderRuleDialogComponent {
  form! : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateFolderRuleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ){}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [,[]],
      shortDescription:[,[]],
      path:this.data,
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
