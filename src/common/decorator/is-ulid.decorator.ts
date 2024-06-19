import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { decodeTime } from 'ulid';

@ValidatorConstraint({ async: false })
class IsUlidConstraint implements ValidatorConstraintInterface {
  validate(id: any, args: ValidationArguments) {
    try {
      decodeTime(id); // ulid is valid if decodeTime does not throw an error
      return true;
    } catch (e) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return 'ID must be a valid ULID';
  }
}

export function IsUlid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUlidConstraint,
    });
  };
}
