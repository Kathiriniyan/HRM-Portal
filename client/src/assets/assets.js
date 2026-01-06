// src/assets/assets.js
import logo from "./logo.svg";
import logo_dark from "./logo-dark.svg";
import logo_mobile from "./logo-mobile.svg";
import logo_mobile_dark from "./logo-dark-mobile.svg";
import login_bg from "./login_bg.png";
import login_bg_sm from "./login_bg_sm.png";
import profile from "./profile.png";

const assets = {
  logo,
  logo_dark,
  logo_mobile,
  logo_mobile_dark,
  login_bg,
  login_bg_sm,
  profile,
};




// ==================== GENDERS ====================
export const genders = [
  { id: "G-01", name: "Male" },
  { id: "G-02", name: "Female" },
  { id: "G-03", name: "Non-binary" },
  { id: "G-04", name: "Prefer not to say" },
];

// ==================== DEPARTMENTS ====================
export const departments = [
  { id: "DEP-001", name: "Management" },
  { id: "DEP-002", name: "IT" },
  { id: "DEP-003", name: "Production" },
];

// ==================== DESIGNATIONS ====================
export const designations = [
  // Management Department
  { id: "DES-001", name: "Sales", departmentId: "DEP-001" },
  { id: "DES-002", name: "Accounts", departmentId: "DEP-001" },
  { id: "DES-003", name: "Back Office", departmentId: "DEP-001" },
  { id: "DES-004", name: "HR", departmentId: "DEP-001" },
  { id: "DES-005", name: "Secretary", departmentId: "DEP-001" },

  // IT Department
  { id: "DES-006", name: "Software Developer", departmentId: "DEP-002" },
  { id: "DES-007", name: "IT Executive", departmentId: "DEP-002" },
  { id: "DES-008", name: "Database Manager", departmentId: "DEP-002" },
  { id: "DES-009", name: "Python Developer", departmentId: "DEP-002" },
  { id: "DES-010", name: "Web Designer", departmentId: "DEP-002" },
  { id: "DES-011", name: "Graphic Designer", departmentId: "DEP-002" },

  // Production Department (sample designations)
  { id: "DES-012", name: "Production Supervisor", departmentId: "DEP-003" },
  { id: "DES-013", name: "Machine Operator", departmentId: "DEP-003" },
  { id: "DES-014", name: "Quality Assurance Officer", departmentId: "DEP-003" },
  { id: "DES-015", name: "Packing Associate", departmentId: "DEP-003" },
];

// ==================== EMPLOYEE TYPES ====================
export const employeeTypes = [
  { id: "EMP-TYPE-01", name: "Full-time" },
  { id: "EMP-TYPE-02", name: "Part-time" },
  { id: "EMP-TYPE-03", name: "Trainee" },
  { id: "EMP-TYPE-04", name: "Temporary" },
];

// ==================== COMPANIES ====================
export const companies = [
  { id: "COM-001", name: "Sukan Food" },
  { id: "COM-002", name: "Kanda-IT" },
  { id: "COM-003", name: "Sukan Marketing" },
];

// ==================== EMPLOYEES / USERS ====================
const commonProfileImage = "https://i.pinimg.com/736x/26/be/33/26be33b0a83cd960adccdfb4389037f1.jpg";

  export const employees = [
  {
    id: "HR-EMP-00001",
    profileImage: commonProfileImage,
    firstName: "Nimal",
    lastName: "Perera",
    designationId: "DES-004", // HR
    departmentId: "DEP-001",
    officeEmail: "nimal.perera@sukanfood.lk",
    personalEmail: "nimal.perera@gmail.com",
    officeContact: "+94 11 234 5678",
    personalContact: "+94 77 123 4567",
    genderId: "G-01",
    dateOfBirth: "1994-03-14",
    joinDate: "2022-06-01",
    employeeTypeId: "EMP-TYPE-01",
    password: "Nimal@2025!",
    oldPassword: "Nimal@2024!",
    companyId: "COM-001",
    createdAt: "2025-11-18T09:30:00.000Z",
    updatedAt: "2025-11-20T16:30:00.000Z",
    createdBy: "HR-EMP-00001", // HR created self record (seed)
    updatedBy: "HR-EMP-00001", // self update allowed
    address: [
      {
        id: "ADDR-00001",
        isPrimary: true,
        line1: "No. 120, Galle Road",
        line2: "Bambalapitiya",
        city: "Colombo",
        state: "Western Province",
        country: "Sri Lanka",
        postalCode: "00400",
      },
    ],
    editHistory: [
      {
        editedAt: "2025-11-19T11:15:00.000Z",
        editedBy: "HR-EMP-00001",
        summary: "Added designation details and verified email.",
      },
      {
        editedAt: "2025-11-20T16:30:00.000Z",
        editedBy: "HR-EMP-00001",
        summary: "Updated mobile number format and address display string.",
      },
    ],
  },

  {
    id: "HR-EMP-00002",
    profileImage: commonProfileImage,
    firstName: "Employee",
    lastName: "Lastemp",
    designationId: "DES-001", // Sales
    departmentId: "DEP-001",
    officeEmail: "Employee.Lastemp@sukanmarketing.lk",
    personalEmail: "Employee.L@gmail.com",
    officeContact: "+94 11 222 1100",
    personalContact: "+94 76 456 8890",
    genderId: "G-02",
    dateOfBirth: "1998-09-02",
    joinDate: "2023-02-10",
    employeeTypeId: "EMP-TYPE-01",
    password: "Employee@2025!",
    oldPassword: "Employee@2024!",
    companyId: "COM-003",
    createdAt: "2025-10-10T08:00:00.000Z",
    updatedAt: "2025-11-21T10:45:00.000Z",
    createdBy: "HR-EMP-00001", // HR created
    updatedBy: "HR-EMP-00001", // HR updated
    address: [
      {
        id: "ADDR-00002",
        isPrimary: true,
        line1: "No. 44, Marine Drive",
        line2: "Wellawatte",
        city: "Colombo",
        state: "Western Province",
        country: "Sri Lanka",
        postalCode: "00600",
      },
    ],
    editHistory: [
      {
        editedAt: "2025-10-12T12:05:00.000Z",
        editedBy: "HR-EMP-00001",
        summary: "Created employee profile and added contact details.",
      },
      {
        editedAt: "2025-11-21T10:45:00.000Z",
        editedBy: "HR-EMP-00001",
        summary: "Updated office email domain and confirmed sales designation.",
      },
    ],
  },

  {
    id: "HR-EMP-00003",
    profileImage: commonProfileImage,
    firstName: "Kasun",
    lastName: "Jayasinghe",
    designationId: "DES-006", // Software Developer
    departmentId: "DEP-002",
    officeEmail: "kasun.jayasinghe@kanda-it.lk",
    personalEmail: "kasunj@gmail.com",
    officeContact: "+94 11 301 9090",
    personalContact: "+94 71 334 8899",
    genderId: "G-01",
    dateOfBirth: "1996-12-21",
    joinDate: "2021-09-15",
    employeeTypeId: "EMP-TYPE-01",
    password: "Kasun@2025!",
    oldPassword: "Kasun@2024!",
    companyId: "COM-002",
    createdAt: "2025-08-05T07:25:00.000Z",
    updatedAt: "2025-12-01T14:10:00.000Z",
    createdBy: "HR-EMP-00001",
    updatedBy: "HR-EMP-00003", // self update (employee can edit own profile)
    address: [
      {
        id: "ADDR-00003",
        isPrimary: true,
        line1: "No. 18, Park Road",
        line2: "Nugegoda",
        city: "Colombo",
        state: "Western Province",
        country: "Sri Lanka",
        postalCode: "10250",
      },
    ],
    editHistory: [
      {
        editedAt: "2025-08-06T09:30:00.000Z",
        editedBy: "HR-EMP-00001",
        summary: "Added employee and assigned IT department.",
      },
      {
        editedAt: "2025-12-01T14:10:00.000Z",
        editedBy: "HR-EMP-00003",
        summary: "Updated personal contact and verified join date.",
      },
    ],
  },

  {
    id: "HR-EMP-00004",
    profileImage: commonProfileImage,
    firstName: "Tharindu",
    lastName: "Silva",
    designationId: "DES-008", // Database Manager
    departmentId: "DEP-002",
    officeEmail: "tharindu.silva@kanda-it.lk",
    personalEmail: "tharindus@gmail.com",
    officeContact: "+94 11 301 9091",
    personalContact: "+94 70 990 2211",
    genderId: "G-01",
    dateOfBirth: "1992-07-30",
    joinDate: "2020-01-05",
    employeeTypeId: "EMP-TYPE-01",
    password: "Tharindu@2025!",
    oldPassword: "Tharindu@2024!",
    companyId: "COM-002",
    createdAt: "2025-07-01T10:00:00.000Z",
    updatedAt: "2025-11-10T16:20:00.000Z",
    createdBy: "HR-EMP-00001",
    updatedBy: "HR-EMP-00001", // HR updated
    address: [
      {
        id: "ADDR-00004",
        isPrimary: true,
        line1: "No. 77, Kotte Road",
        line2: "Rajagiriya",
        city: "Colombo",
        state: "Western Province",
        country: "Sri Lanka",
        postalCode: "10100",
      },
    ],
    editHistory: [
      {
        editedAt: "2025-07-02T11:10:00.000Z",
        editedBy: "HR-EMP-00001",
        summary: "Added role and initial credentials metadata.",
      },
      {
        editedAt: "2025-11-10T16:20:00.000Z",
        editedBy: "HR-EMP-00001",
        summary: "Updated office extension and confirmed database manager designation.",
      },
    ],
  },

  {
    id: "HR-EMP-00005",
    profileImage: commonProfileImage,
    firstName: "Ayesha",
    lastName: "Karunarathne",
    designationId: "DES-002", // Accounts
    departmentId: "DEP-001",
    officeEmail: "ayesha.k@sukanfood.lk",
    personalEmail: "ayesha.karu@gmail.com",
    officeContact: "+94 11 234 5690",
    personalContact: "+94 75 220 3300",
    genderId: "G-02",
    dateOfBirth: "1995-01-11",
    joinDate: "2022-03-20",
    employeeTypeId: "EMP-TYPE-02",
    password: "Ayesha@2025!",
    oldPassword: "Ayesha@2024!",
    companyId: "COM-001",
    createdAt: "2025-09-12T09:10:00.000Z",
    updatedAt: "2025-11-15T12:05:00.000Z",
    createdBy: "HR-EMP-00001",
    updatedBy: "HR-EMP-00005", // self update
    address: [
      {
        id: "ADDR-00005",
        isPrimary: true,
        line1: "No. 9, Station Road",
        line2: "Moratuwa",
        city: "Colombo",
        state: "Western Province",
        country: "Sri Lanka",
        postalCode: "10400",
      },
    ],
    editHistory: [
      {
        editedAt: "2025-09-12T09:10:00.000Z",
        editedBy: "HR-EMP-00001",
        summary: "Created employee profile and added accounts designation.",
      },
      {
        editedAt: "2025-11-15T12:05:00.000Z",
        editedBy: "HR-EMP-00005",
        summary: "Updated employee type to Part-time and verified personal email.",
      },
    ],
  },

  {
    id: "HR-EMP-00006",
    profileImage: commonProfileImage,
    firstName: "Dilshan",
    lastName: "Wijesinghe",
    designationId: "DES-009", // Python Developer
    departmentId: "DEP-002",
    officeEmail: "dilshan.w@kanda-it.lk",
    personalEmail: "dilshan.w@gmail.com",
    officeContact: "+94 11 301 9092",
    personalContact: "+94 78 555 9090",
    genderId: "G-01",
    dateOfBirth: "1999-04-08",
    joinDate: "2024-01-10",
    employeeTypeId: "EMP-TYPE-03",
    password: "Dilshan@2025!",
    oldPassword: "Dilshan@2024!",
    companyId: "COM-002",
    createdAt: "2025-11-01T08:40:00.000Z",
    updatedAt: "2025-12-22T17:10:00.000Z",
    createdBy: "HR-EMP-00001",
    updatedBy: "HR-EMP-00006", // self update
    address: [
      {
        id: "ADDR-00006",
        isPrimary: true,
        line1: "No. 55, High Level Road",
        line2: "Maharagama",
        city: "Colombo",
        state: "Western Province",
        country: "Sri Lanka",
        postalCode: "10280",
      },
    ],
    editHistory: [
      {
        editedAt: "2025-11-02T10:10:00.000Z",
        editedBy: "HR-EMP-00001",
        summary: "Assigned trainee status and added initial IT credentials.",
      },
      {
        editedAt: "2025-12-22T17:10:00.000Z",
        editedBy: "HR-EMP-00006",
        summary: "Updated join date and verified office contact format.",
      },
    ],
  },

  {
    id: "HR-EMP-00007",
    profileImage: commonProfileImage,
    firstName: "Ruwani",
    lastName: "Dissanayake",
    designationId: "DES-005", // Secretary
    departmentId: "DEP-001",
    officeEmail: "ruwani.d@sukanmarketing.lk",
    personalEmail: "ruwani.d@gmail.com",
    officeContact: "+94 11 222 1199",
    personalContact: "+94 72 121 9898",
    genderId: "G-02",
    dateOfBirth: "1997-06-19",
    joinDate: "2023-08-01",
    employeeTypeId: "EMP-TYPE-01",
    password: "Ruwani@2025!",
    oldPassword: "Ruwani@2024!",
    companyId: "COM-003",
    createdAt: "2025-10-05T09:00:00.000Z",
    updatedAt: "2025-11-28T15:30:00.000Z",
    createdBy: "HR-EMP-00001",
    updatedBy: "HR-EMP-00001", // HR updated
    address: [
      {
        id: "ADDR-00007",
        isPrimary: true,
        line1: "No. 21, Temple Road",
        line2: "Dehiwala",
        city: "Colombo",
        state: "Western Province",
        country: "Sri Lanka",
        postalCode: "10350",
      },
    ],
    editHistory: [
      {
        editedAt: "2025-10-05T09:00:00.000Z",
        editedBy: "HR-EMP-00001",
        summary: "Added secretary profile and office email.",
      },
      {
        editedAt: "2025-11-28T15:30:00.000Z",
        editedBy: "HR-EMP-00001",
        summary: "Updated address formatting and confirmed emergency contact details.",
      },
    ],
  },

  {
    id: "HR-EMP-00008",
    profileImage: commonProfileImage,
    firstName: "Isuru",
    lastName: "Bandara",
    designationId: "DES-012", // Production Supervisor
    departmentId: "DEP-003",
    officeEmail: "isuru.bandara@sukanfood.lk",
    personalEmail: "isuru.bandara@gmail.com",
    officeContact: "+94 11 234 5701",
    personalContact: "+94 77 880 1112",
    genderId: "G-01",
    dateOfBirth: "1991-10-03",
    joinDate: "2019-05-12",
    employeeTypeId: "EMP-TYPE-01",
    password: "Isuru@2025!",
    oldPassword: "Isuru@2024!",
    companyId: "COM-001",
    createdAt: "2025-06-18T06:20:00.000Z",
    updatedAt: "2025-11-09T13:50:00.000Z",
    createdBy: "HR-EMP-00001",
    updatedBy: "HR-EMP-00008", // self update
    address: [
      {
        id: "ADDR-00008",
        isPrimary: true,
        line1: "No. 88, New Gampaha Road",
        line2: "Kadawatha",
        city: "Gampaha",
        state: "Western Province",
        country: "Sri Lanka",
        postalCode: "11850",
      },
    ],
    editHistory: [
      {
        editedAt: "2025-06-18T06:20:00.000Z",
        editedBy: "HR-EMP-00001",
        summary: "Created profile and assigned Production Supervisor role.",
      },
      {
        editedAt: "2025-11-09T13:50:00.000Z",
        editedBy: "HR-EMP-00008",
        summary: "Updated office contact and validated department assignment.",
      },
    ],
  },

  {
    id: "HR-EMP-00009",
    profileImage: commonProfileImage,
    firstName: "Mihiri",
    lastName: "Ranasinghe",
    designationId: "DES-011", // Graphic Designer
    departmentId: "DEP-002",
    officeEmail: "mihiri.r@sukanmarketing.lk",
    personalEmail: "mihiri.r@gmail.com",
    officeContact: "+94 11 222 1122",
    personalContact: "+94 71 808 6060",
    genderId: "G-02",
    dateOfBirth: "2000-02-27",
    joinDate: "2024-09-01",
    employeeTypeId: "EMP-TYPE-04",
    password: "Mihiri@2025!",
    oldPassword: "Mihiri@2024!",
    companyId: "COM-003",
    createdAt: "2025-09-18T09:30:00.000Z",
    updatedAt: "2025-12-03T11:05:00.000Z",
    createdBy: "HR-EMP-00001",
    updatedBy: "HR-EMP-00009", // self update
    address: [
      {
        id: "ADDR-00009",
        isPrimary: true,
        line1: "No. 14, Flower Road",
        line2: "Colombo 07",
        city: "Colombo",
        state: "Western Province",
        country: "Sri Lanka",
        postalCode: "00700",
      },
    ],
    editHistory: [
      {
        editedAt: "2025-09-18T09:30:00.000Z",
        editedBy: "HR-EMP-00001",
        summary: "Created contractor profile and assigned Graphic Designer designation.",
      },
      {
        editedAt: "2025-12-03T11:05:00.000Z",
        editedBy: "HR-EMP-00009",
        summary: "Updated personal contact and verified email addresses.",
      },
    ],
  },

  {
    id: "HR-EMP-00010",
    profileImage: commonProfileImage,
    firstName: "Shehan",
    lastName: "Amarasinghe",
    designationId: "DES-014", // QA Officer (Production)
    departmentId: "DEP-003",
    officeEmail: "shehan.a@sukanfood.lk",
    personalEmail: "shehan.a@gmail.com",
    officeContact: "+94 11 234 5710",
    personalContact: "+94 76 909 4545",
    genderId: "G-03",
    dateOfBirth: "1993-05-17",
    joinDate: "2020-11-02",
    employeeTypeId: "EMP-TYPE-01",
    password: "Shehan@2025!",
    oldPassword: "Shehan@2024!",
    companyId: "COM-001",
    createdAt: "2025-05-22T07:15:00.000Z",
    updatedAt: "2025-11-30T18:00:00.000Z",
    createdBy: "HR-EMP-00001",
    updatedBy: "HR-EMP-00001", // HR updated
    address: [
      {
        id: "ADDR-00010",
        isPrimary: true,
        line1: "No. 33, Negombo Road",
        line2: "Wattala",
        city: "Gampaha",
        state: "Western Province",
        country: "Sri Lanka",
        postalCode: "11300",
      },
    ],
    editHistory: [
      {
        editedAt: "2025-05-22T07:15:00.000Z",
        editedBy: "HR-EMP-00001",
        summary: "Added QA Officer profile and verified office email.",
      },
      {
        editedAt: "2025-11-30T18:00:00.000Z",
        editedBy: "HR-EMP-00001",
        summary: "Updated designation mapping and corrected address line2 details.",
      },
    ],
  },
];













// ==================== SALUTATIONS ====================
export const salutations = [
  { id: "SAL-01", name: "Mr." },
  { id: "SAL-02", name: "Ms." },
  { id: "SAL-03", name: "Mrs." },
  { id: "SAL-04", name: "Miss" },
  { id: "SAL-05", name: "Dr." },
  { id: "SAL-06", name: "Prof." },
  { id: "SAL-07", name: "Master" },
  { id: "SAL-08", name: "Madam" },
];







export default assets;
