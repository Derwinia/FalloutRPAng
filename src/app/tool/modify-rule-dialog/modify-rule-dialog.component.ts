import { Component , Inject} from '@angular/core';
import { FormBuilder, FormGroup , FormControlName} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { RuleModel } from 'src/app/models/rule.model';

@Component({
  selector: 'app-modify-rule-dialog',
  templateUrl: './modify-rule-dialog.component.html',
  styleUrls: ['./modify-rule-dialog.component.scss']
})
export class ModifyRuleDialogComponent {

  form! : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ModifyRuleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RuleModel
  ){}

  ngOnInit() {
      this.form = this.formBuilder.group({
        id: this.data.id,
        name: [this.data.name,[]],
        shortDescription:[this.data.shortDescription,[]],
        description:[this.data.description,[]],
      });
  }

  save() {
      this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }
}
