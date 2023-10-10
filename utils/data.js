import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Admin01',
      email: 'admin01@gmail.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true,
    },
    {
      name: 'Admin02',
      email: 'admin02@example.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true,
    },
    {
      name: 'Doe',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: false,
    },
  ],
  courses: [
    {
      name: 'BSCIT',
    },
    {
      name: 'BSCCOMPUTERSCIENCE',
    },
    {
      name: 'BCOM',
    },
    {
      name: 'BSCFINANCE',
    },
    {
      name: 'BBIT',
    },
    {
      name: 'ACCOUNTING',
    },
    {
      name: 'BSCSTATISTICS',
    },
  ],
  universities: [
    {
      name: 'KENYATTA',
    },
    {
      name: 'UON',
    },
    {
      name: 'JKUAT',
    },
    {
      name: 'MMU',
    },
    {
      name: 'COOPERATIVE',
    },
    {
      name: 'MKU',
    },
    {
      name: 'TUK',
    },
  ],
  departments: [
    {
      name: 'Ict',
    },
    {
      name: 'Hr',
    },
    {
      name: 'Sales',
    },
    {
      name: 'Audit',
    },
    {
      name: 'Finance',
    },
    {
      name: 'Communications',
    },
    {
      name: 'Other',
    },
  ],
};

export default data;
