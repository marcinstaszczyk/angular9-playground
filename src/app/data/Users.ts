import { User } from './User';
import { Icon } from './Icon';

const USERS: User[] = [
  new User(1, 'John', new Icon('car')),
  new User(2, 'Rachel', new Icon('heart')),
  new User(3, 'Tom', new Icon('rocket')),
  new User(4, 'Ann', new Icon('stethoscope')),
  new User(5, 'Jane', new Icon('hand-o-right')),
  new User(6, 'Bill', new Icon('btc')),
  new User(7, 'Otto', new Icon('thumbs-o-up')),
  new User(8, 'Wally', new Icon('space-shuttle')),
  new User(9, 'Janet', new Icon('bicycle')),
  new User(10, 'Martin', new Icon('plane')),
];

export default USERS;
