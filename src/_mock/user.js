import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
const users = [...Array(24)].map((_, index) => ({
  
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  salary: faker.finance.amount(1000,10000,2,'$'),
  salaryDate: faker.date.future(),
  remainingDayOff: getRandomArbitrary(0, 15).toFixed(),
  company: faker.company.name(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));

export default users;
