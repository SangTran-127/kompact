import 'reflect-metadata';
import { IsNotEmptyKey, IsNotEmpty } from './decorator/common/is-not-empty';

class User {
  @IsNotEmpty()
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
const u = new User('sang');
// function validator() {}

// console.log(Reflect.getMetadata(IsNotEmptyKey, user));
