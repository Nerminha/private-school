import { FormGroup } from "@angular/forms";
export function validateDate(d1: string, d2: string) {
    return (formGroup: FormGroup) => {
        const dPointer = formGroup.controls[d1];
        const comparedPointer = formGroup.controls[d2];
        if (dPointer.value >= comparedPointer.value) {
            comparedPointer.setErrors({ compareDates: true });
          } else {
            comparedPointer.setErrors(null);
          }
    }
}

  