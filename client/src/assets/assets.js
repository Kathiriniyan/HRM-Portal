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





// ==================== PROJECTS ====================
export const projects = [
  {
    id: "PROJ-2026-0001",
    name: "HR System Stabilization",
    description: "Bug fixes, data cleanup, and UX improvements across HR modules.",
    createdAt: "2025-12-10T06:30:00.000Z",
    createdBy: "HR-EMP-00001",
  },
  {
    id: "PROJ-2026-0002",
    name: "Attendance & Shift Revamp",
    description: "Improve attendance rules, shift assignment flows, and reporting.",
    createdAt: "2025-12-15T04:40:00.000Z",
    createdBy: "HR-EMP-00001",
  },
  {
    id: "PROJ-2026-0003",
    name: "Payroll Automation",
    description: "Automate payroll generation and correction workflows.",
    createdAt: "2025-12-20T07:10:00.000Z",
    createdBy: "HR-EMP-00001",
  },
  {
    id: "PROJ-2026-0004",
    name: "Marketing Campaign Ops",
    description: "Coordinate tasks for campaign assets, approvals, and deadlines.",
    createdAt: "2025-12-22T09:25:00.000Z",
    createdBy: "HR-EMP-00002",
  },
  {
    id: "PROJ-2026-0005",
    name: "Production Quality Improvements",
    description: "QA checks, packing verification, and safety checklist tracking.",
    createdAt: "2025-12-28T05:15:00.000Z",
    createdBy: "HR-EMP-00008",
  },
];

// ==================== TASKS ====================
// Notes:
// - taskId format: TASK-2026-0000001
// - assignedEmployees: can be one or many employees
// - status: open | overdue | completed | working | pending | review | canceled | transferred
// - if progress === 100 => status should be "completed" and completedAt must be set
// - createdBy: either HR (HR-EMP-00001) or self (employee creates their own task)
// - history: example "database style" audit trail

export const tasks = [
  // 1) Assigned to HR-EMP-00002 (self-created)
  {
    id: "TASK-2026-0000001",
    assignedEmployees: ["HR-EMP-00002"],
    status: "working",
    priority: "High",
    subject: "Follow up: Task 20 client confirmation",
    detail:
      "Confirm client requirements for Task 20, update notes, and share summary with HR and IT team.",
    projectId: "PROJ-2026-0004",
    progress: 55,
    completedAt: null,
    createdAt: "2026-01-02T08:15:00.000Z",
    expectedStartAt: "2026-01-02T09:00:00.000Z",
    expectedEndAt: "2026-01-08T11:00:00.000Z",
    createdBy: "HR-EMP-00002",
    updatedAt: "2026-01-06T10:25:00.000Z",
    history: [
      {
        at: "2026-01-02T08:15:00.000Z",
        by: "HR-EMP-00002",
        action: "created",
        summary: "Task created and assigned to self.",
      },
      {
        at: "2026-01-03T06:00:00.000Z",
        by: "HR-EMP-00002",
        action: "progress_updated",
        summary: "Added notes after first call. Progress 25%.",
        changes: { progress: { from: 0, to: 25 } },
      },
      {
        at: "2026-01-06T10:25:00.000Z",
        by: "HR-EMP-00002",
        action: "progress_updated",
        summary: "Client feedback received. Progress 55%.",
        changes: { progress: { from: 25, to: 55 } },
      },
    ],
  },

  // 2) Assigned to HR-EMP-00002 (HR-created)
  {
    id: "TASK-2026-0000002",
    assignedEmployees: ["HR-EMP-00002"],
    status: "pending",
    priority: "Medium",
    subject: "Update sales contact list for January",
    detail:
      "Review sales contact list, remove duplicates, confirm email domains, and export updated list.",
    projectId: "PROJ-2026-0001",
    progress: 10,
    completedAt: null,
    createdAt: "2026-01-03T05:20:00.000Z",
    expectedStartAt: "2026-01-03T08:30:00.000Z",
    expectedEndAt: "2026-01-10T12:00:00.000Z",
    createdBy: "HR-EMP-00001",
    updatedAt: "2026-01-05T09:40:00.000Z",
    history: [
      {
        at: "2026-01-03T05:20:00.000Z",
        by: "HR-EMP-00001",
        action: "created",
        summary: "Task created by HR and assigned to HR-EMP-00002.",
      },
      {
        at: "2026-01-05T09:40:00.000Z",
        by: "HR-EMP-00002",
        action: "progress_updated",
        summary: "Started cleaning duplicates. Progress 10%.",
        changes: { progress: { from: 0, to: 10 } },
      },
    ],
  },

  // 3) Group task includes HR-EMP-00002 (HR-created)
  {
    id: "TASK-2026-0000003",
    assignedEmployees: ["HR-EMP-00002", "HR-EMP-00003", "HR-EMP-00004"],
    status: "review",
    priority: "High",
    subject: "Finalize notification UX changes",
    detail:
      "Review notification UX on tablet sizes (1024–1279). Confirm no overflow and approve final layout behavior.",
    projectId: "PROJ-2026-0001",
    progress: 90,
    completedAt: null,
    createdAt: "2026-01-04T04:00:00.000Z",
    expectedStartAt: "2026-01-04T06:30:00.000Z",
    expectedEndAt: "2026-01-07T14:00:00.000Z",
    createdBy: "HR-EMP-00001",
    updatedAt: "2026-01-07T09:10:00.000Z",
    history: [
      {
        at: "2026-01-04T04:00:00.000Z",
        by: "HR-EMP-00001",
        action: "created",
        summary: "Task created by HR and assigned to Sales + IT reviewers.",
      },
      {
        at: "2026-01-05T07:30:00.000Z",
        by: "HR-EMP-00003",
        action: "progress_updated",
        summary: "Verified layout on Chrome/Edge. Progress 60%.",
        changes: { progress: { from: 0, to: 60 } },
      },
      {
        at: "2026-01-07T09:10:00.000Z",
        by: "HR-EMP-00002",
        action: "status_changed",
        summary: "Marked as ready for final review.",
        changes: { status: { from: "working", to: "review" }, progress: { from: 60, to: 90 } },
      },
    ],
  },

  // 4) Assigned to HR-EMP-00002 (self-created, overdue)
  {
    id: "TASK-2026-0000004",
    assignedEmployees: ["HR-EMP-00002"],
    status: "overdue",
    priority: "High",
    subject: "Submit weekly sales report (Week 1)",
    detail:
      "Prepare weekly sales report for management. Include pipeline summary and next-week priorities.",
    projectId: "PROJ-2026-0004",
    progress: 40,
    completedAt: null,
    createdAt: "2025-12-30T08:10:00.000Z",
    expectedStartAt: "2025-12-30T09:00:00.000Z",
    expectedEndAt: "2026-01-03T12:00:00.000Z",
    createdBy: "HR-EMP-00002",
    updatedAt: "2026-01-06T13:00:00.000Z",
    history: [
      {
        at: "2025-12-30T08:10:00.000Z",
        by: "HR-EMP-00002",
        action: "created",
        summary: "Task created and assigned to self.",
      },
      {
        at: "2026-01-02T10:20:00.000Z",
        by: "HR-EMP-00002",
        action: "progress_updated",
        summary: "Collected pipeline figures. Progress 40%.",
        changes: { progress: { from: 0, to: 40 } },
      },
      {
        at: "2026-01-04T04:10:00.000Z",
        by: "HR-EMP-00002",
        action: "status_changed",
        summary: "Deadline missed; task flagged overdue.",
        changes: { status: { from: "working", to: "overdue" } },
      },
      {
        at: "2026-01-06T13:00:00.000Z",
        by: "HR-EMP-00002",
        action: "edited",
        summary: "Updated report template and added missing sections.",
      },
    ],
  },

  // 5) Group task includes HR-EMP-00002 (HR-created, completed)
  {
    id: "TASK-2026-0000005",
    assignedEmployees: ["HR-EMP-00002", "HR-EMP-00007"],
    status: "completed",
    priority: "Medium",
    subject: "Prepare Friday meeting agenda",
    detail:
      "Draft agenda for Friday management meeting, include topics and timeboxes. Share with secretary for final formatting.",
    projectId: "PROJ-2026-0004",
    progress: 100,
    completedAt: "2026-01-03T12:30:00.000Z",
    createdAt: "2026-01-01T09:10:00.000Z",
    expectedStartAt: "2026-01-01T10:00:00.000Z",
    expectedEndAt: "2026-01-03T13:00:00.000Z",
    createdBy: "HR-EMP-00001",
    updatedAt: "2026-01-03T12:30:00.000Z",
    history: [
      {
        at: "2026-01-01T09:10:00.000Z",
        by: "HR-EMP-00001",
        action: "created",
        summary: "HR created agenda task and assigned to Sales + Secretary.",
      },
      {
        at: "2026-01-02T08:00:00.000Z",
        by: "HR-EMP-00002",
        action: "progress_updated",
        summary: "Drafted first agenda outline. Progress 60%.",
        changes: { progress: { from: 0, to: 60 } },
      },
      {
        at: "2026-01-03T10:50:00.000Z",
        by: "HR-EMP-00007",
        action: "edited",
        summary: "Formatted agenda and added room/attendee details.",
      },
      {
        at: "2026-01-03T12:30:00.000Z",
        by: "HR-EMP-00002",
        action: "completed",
        summary: "Agenda finalized and shared to management.",
        changes: { status: { from: "review", to: "completed" }, progress: { from: 60, to: 100 } },
      },
    ],
  },

  // 6) Assigned to HR-EMP-00002 (HR-created, transferred)
  {
    id: "TASK-2026-0000006",
    assignedEmployees: ["HR-EMP-00002"],
    status: "transferred",
    priority: "Low",
    subject: "Update profile photo guidelines",
    detail:
      "Draft guidelines for profile image format and size. Later transferred to HR for policy consistency.",
    projectId: "PROJ-2026-0001",
    progress: 15,
    completedAt: null,
    createdAt: "2026-01-02T05:05:00.000Z",
    expectedStartAt: "2026-01-02T07:00:00.000Z",
    expectedEndAt: "2026-01-07T09:00:00.000Z",
    createdBy: "HR-EMP-00001",
    updatedAt: "2026-01-05T08:30:00.000Z",
    history: [
      {
        at: "2026-01-02T05:05:00.000Z",
        by: "HR-EMP-00001",
        action: "created",
        summary: "Task created by HR for Sales input.",
      },
      {
        at: "2026-01-03T09:15:00.000Z",
        by: "HR-EMP-00002",
        action: "progress_updated",
        summary: "Added draft bullet points. Progress 15%.",
        changes: { progress: { from: 0, to: 15 } },
      },
      {
        at: "2026-01-05T08:30:00.000Z",
        by: "HR-EMP-00001",
        action: "status_changed",
        summary: "Transferred task ownership back to HR policy team.",
        changes: { status: { from: "working", to: "transferred" } },
      },
    ],
  },

  // 7) Assigned to HR-EMP-00002 (self-created, canceled)
  {
    id: "TASK-2026-0000007",
    assignedEmployees: ["HR-EMP-00002"],
    status: "canceled",
    priority: "Low",
    subject: "Create duplicate lead cleanup script",
    detail:
      "Initial idea to create a cleanup script; later canceled because cleanup handled manually in spreadsheet.",
    projectId: "PROJ-2026-0004",
    progress: 0,
    completedAt: null,
    createdAt: "2025-12-26T07:30:00.000Z",
    expectedStartAt: "2025-12-27T09:00:00.000Z",
    expectedEndAt: "2025-12-29T12:00:00.000Z",
    createdBy: "HR-EMP-00002",
    updatedAt: "2025-12-27T05:10:00.000Z",
    history: [
      {
        at: "2025-12-26T07:30:00.000Z",
        by: "HR-EMP-00002",
        action: "created",
        summary: "Task created and planned for next day.",
      },
      {
        at: "2025-12-27T05:10:00.000Z",
        by: "HR-EMP-00002",
        action: "status_changed",
        summary: "Canceled due to alternative cleanup approach.",
        changes: { status: { from: "open", to: "canceled" } },
      },
    ],
  },

  // 8) Group task includes HR-EMP-00002 (HR-created)
  {
    id: "TASK-2026-0000008",
    assignedEmployees: ["HR-EMP-00002", "HR-EMP-00005"],
    status: "working",
    priority: "Medium",
    subject: "Confirm overtime totals for payroll adjustment",
    detail:
      "Cross-check overtime totals for January adjustment. Sales and Accounts must confirm totals before payroll run.",
    projectId: "PROJ-2026-0003",
    progress: 45,
    completedAt: null,
    createdAt: "2026-01-04T06:25:00.000Z",
    expectedStartAt: "2026-01-04T07:30:00.000Z",
    expectedEndAt: "2026-01-08T10:30:00.000Z",
    createdBy: "HR-EMP-00001",
    updatedAt: "2026-01-06T09:05:00.000Z",
    history: [
      {
        at: "2026-01-04T06:25:00.000Z",
        by: "HR-EMP-00001",
        action: "created",
        summary: "HR created payroll confirmation task for Sales + Accounts.",
      },
      {
        at: "2026-01-05T07:50:00.000Z",
        by: "HR-EMP-00005",
        action: "edited",
        summary: "Attached overtime sheet references and notes.",
      },
      {
        at: "2026-01-06T09:05:00.000Z",
        by: "HR-EMP-00002",
        action: "progress_updated",
        summary: "Validated Sales overtime claims. Progress 45%.",
        changes: { progress: { from: 0, to: 45 } },
      },
    ],
  },

  // 9) Assigned to HR-EMP-00002 (self-created)
  {
    id: "TASK-2026-0000009",
    assignedEmployees: ["HR-EMP-00002"],
    status: "open",
    priority: "Medium",
    subject: "Draft campaign timeline for Q1",
    detail:
      "Draft Q1 campaign timeline and list of deliverables. Share with marketing team for feedback.",
    projectId: "PROJ-2026-0004",
    progress: 0,
    completedAt: null,
    createdAt: "2026-01-06T04:10:00.000Z",
    expectedStartAt: "2026-01-06T07:30:00.000Z",
    expectedEndAt: "2026-01-12T12:00:00.000Z",
    createdBy: "HR-EMP-00002",
    updatedAt: "2026-01-06T04:10:00.000Z",
    history: [
      {
        at: "2026-01-06T04:10:00.000Z",
        by: "HR-EMP-00002",
        action: "created",
        summary: "Task created and scheduled.",
      },
    ],
  },

  // 10) Group task includes HR-EMP-00002 (HR-created, completed)
  {
    id: "TASK-2026-0000010",
    assignedEmployees: ["HR-EMP-00002", "HR-EMP-00009"],
    status: "completed",
    priority: "High",
    subject: "Approve banner set for campaign",
    detail:
      "Review banner set design and approve final versions for publishing.",
    projectId: "PROJ-2026-0004",
    progress: 100,
    completedAt: "2026-01-06T11:45:00.000Z",
    createdAt: "2026-01-05T07:10:00.000Z",
    expectedStartAt: "2026-01-05T08:00:00.000Z",
    expectedEndAt: "2026-01-06T12:00:00.000Z",
    createdBy: "HR-EMP-00001",
    updatedAt: "2026-01-06T11:45:00.000Z",
    history: [
      {
        at: "2026-01-05T07:10:00.000Z",
        by: "HR-EMP-00001",
        action: "created",
        summary: "HR created approval task for Sales + Designer.",
      },
      {
        at: "2026-01-06T09:20:00.000Z",
        by: "HR-EMP-00009",
        action: "edited",
        summary: "Uploaded final banner variations and size set.",
      },
      {
        at: "2026-01-06T11:45:00.000Z",
        by: "HR-EMP-00002",
        action: "completed",
        summary: "Approved final banner set.",
        changes: { status: { from: "review", to: "completed" }, progress: { from: 90, to: 100 } },
      },
    ],
  },

  // ---- Remaining tasks (11–20) across other employees ----

  {
    id: "TASK-2026-0000011",
    assignedEmployees: ["HR-EMP-00003"],
    status: "working",
    priority: "High",
    subject: "Fix payroll slip download issue",
    detail: "Investigate and fix payroll slip PDF download problem on /payroll route.",
    projectId: "PROJ-2026-0003",
    progress: 65,
    completedAt: null,
    createdAt: "2026-01-02T06:00:00.000Z",
    expectedStartAt: "2026-01-02T07:00:00.000Z",
    expectedEndAt: "2026-01-09T10:00:00.000Z",
    createdBy: "HR-EMP-00001",
    updatedAt: "2026-01-06T05:55:00.000Z",
    history: [
      { at: "2026-01-02T06:00:00.000Z", by: "HR-EMP-00001", action: "created", summary: "HR created IT fix task." },
      { at: "2026-01-04T08:20:00.000Z", by: "HR-EMP-00003", action: "progress_updated", summary: "Identified root cause. Progress 40%.", changes: { progress: { from: 0, to: 40 } } },
      { at: "2026-01-06T05:55:00.000Z", by: "HR-EMP-00003", action: "progress_updated", summary: "Implemented patch and testing. Progress 65%.", changes: { progress: { from: 40, to: 65 } } },
    ],
  },

  {
    id: "TASK-2026-0000012",
    assignedEmployees: ["HR-EMP-00004"],
    status: "pending",
    priority: "Medium",
    subject: "Update attendance radius rules",
    detail: "Confirm radius changes for the site and update attendance-areas defaults.",
    projectId: "PROJ-2026-0002",
    progress: 5,
    completedAt: null,
    createdAt: "2025-12-29T06:00:00.000Z",
    expectedStartAt: "2025-12-30T08:00:00.000Z",
    expectedEndAt: "2026-01-08T09:00:00.000Z",
    createdBy: "HR-EMP-00001",
    updatedAt: "2026-01-02T10:00:00.000Z",
    history: [
      { at: "2025-12-29T06:00:00.000Z", by: "HR-EMP-00001", action: "created", summary: "HR created attendance rules task." },
      { at: "2026-01-02T10:00:00.000Z", by: "HR-EMP-00004", action: "progress_updated", summary: "Collected site coordinates. Progress 5%.", changes: { progress: { from: 0, to: 5 } } },
    ],
  },

  {
    id: "TASK-2026-0000013",
    assignedEmployees: ["HR-EMP-00005"],
    status: "review",
    priority: "High",
    subject: "Validate December payroll adjustments",
    detail: "Review December payroll adjustments and confirm net pay figures before finalizing.",
    projectId: "PROJ-2026-0003",
    progress: 92,
    completedAt: null,
    createdAt: "2025-12-31T05:00:00.000Z",
    expectedStartAt: "2025-12-31T06:00:00.000Z",
    expectedEndAt: "2026-01-07T12:00:00.000Z",
    createdBy: "HR-EMP-00001",
    updatedAt: "2026-01-06T08:10:00.000Z",
    history: [
      { at: "2025-12-31T05:00:00.000Z", by: "HR-EMP-00001", action: "created", summary: "HR created payroll validation task." },
      { at: "2026-01-03T09:30:00.000Z", by: "HR-EMP-00005", action: "progress_updated", summary: "Verified 70% of employee slips. Progress 70%.", changes: { progress: { from: 0, to: 70 } } },
      { at: "2026-01-06T08:10:00.000Z", by: "HR-EMP-00005", action: "status_changed", summary: "Sent for HR review.", changes: { status: { from: "working", to: "review" }, progress: { from: 70, to: 92 } } },
    ],
  },

  {
    id: "TASK-2026-0000014",
    assignedEmployees: ["HR-EMP-00006"],
    status: "working",
    priority: "Medium",
    subject: "Clear pending todos due today",
    detail: "Complete the 3 pending todos and update todo module statuses.",
    projectId: "PROJ-2026-0001",
    progress: 35,
    completedAt: null,
    createdAt: "2026-01-06T06:10:00.000Z",
    expectedStartAt: "2026-01-06T07:00:00.000Z",
    expectedEndAt: "2026-01-07T12:00:00.000Z",
    createdBy: "HR-EMP-00006",
    updatedAt: "2026-01-06T10:20:00.000Z",
    history: [
      { at: "2026-01-06T06:10:00.000Z", by: "HR-EMP-00006", action: "created", summary: "Self-created todos task." },
      { at: "2026-01-06T10:20:00.000Z", by: "HR-EMP-00006", action: "progress_updated", summary: "Completed 1 of 3 todos. Progress 35%.", changes: { progress: { from: 0, to: 35 } } },
    ],
  },

  {
    id: "TASK-2026-0000015",
    assignedEmployees: ["HR-EMP-00007"],
    status: "completed",
    priority: "Low",
    subject: "Send meeting reminder to all staff",
    detail: "Send reminder about Friday meeting and attach agenda link.",
    projectId: "PROJ-2026-0004",
    progress: 100,
    completedAt: "2026-01-04T09:15:00.000Z",
    createdAt: "2026-01-03T09:00:00.000Z",
    expectedStartAt: "2026-01-03T10:00:00.000Z",
    expectedEndAt: "2026-01-04T10:00:00.000Z",
    createdBy: "HR-EMP-00007",
    updatedAt: "2026-01-04T09:15:00.000Z",
    history: [
      { at: "2026-01-03T09:00:00.000Z", by: "HR-EMP-00007", action: "created", summary: "Self-created reminder task." },
      { at: "2026-01-04T09:15:00.000Z", by: "HR-EMP-00007", action: "completed", summary: "Reminder sent to all staff.", changes: { status: { from: "working", to: "completed" }, progress: { from: 0, to: 100 } } },
    ],
  },

  {
    id: "TASK-2026-0000016",
    assignedEmployees: ["HR-EMP-00008", "HR-EMP-00010"],
    status: "working",
    priority: "High",
    subject: "Safety checklist update rollout",
    detail: "Implement updated safety checklist and confirm team training completion.",
    projectId: "PROJ-2026-0005",
    progress: 50,
    completedAt: null,
    createdAt: "2026-01-02T08:45:00.000Z",
    expectedStartAt: "2026-01-03T06:00:00.000Z",
    expectedEndAt: "2026-01-10T09:00:00.000Z",
    createdBy: "HR-EMP-00008",
    updatedAt: "2026-01-06T07:25:00.000Z",
    history: [
      { at: "2026-01-02T08:45:00.000Z", by: "HR-EMP-00008", action: "created", summary: "Production lead created checklist rollout task." },
      { at: "2026-01-05T06:10:00.000Z", by: "HR-EMP-00010", action: "edited", summary: "Added QA checkpoint list and training notes." },
      { at: "2026-01-06T07:25:00.000Z", by: "HR-EMP-00008", action: "progress_updated", summary: "Half of teams trained. Progress 50%.", changes: { progress: { from: 0, to: 50 } } },
    ],
  },

  {
    id: "TASK-2026-0000017",
    assignedEmployees: ["HR-EMP-00009"],
    status: "overdue",
    priority: "High",
    subject: "Design banner set revisions",
    detail: "Revise banner set based on feedback and re-export all sizes.",
    projectId: "PROJ-2026-0004",
    progress: 80,
    completedAt: null,
    createdAt: "2025-12-28T07:40:00.000Z",
    expectedStartAt: "2025-12-29T08:00:00.000Z",
    expectedEndAt: "2026-01-02T12:00:00.000Z",
    createdBy: "HR-EMP-00009",
    updatedAt: "2026-01-06T08:05:00.000Z",
    history: [
      { at: "2025-12-28T07:40:00.000Z", by: "HR-EMP-00009", action: "created", summary: "Self-created revision task." },
      { at: "2026-01-02T13:00:00.000Z", by: "HR-EMP-00009", action: "status_changed", summary: "Deadline missed; flagged overdue.", changes: { status: { from: "working", to: "overdue" } } },
      { at: "2026-01-06T08:05:00.000Z", by: "HR-EMP-00009", action: "progress_updated", summary: "Re-exported most sizes. Progress 80%.", changes: { progress: { from: 60, to: 80 } } },
    ],
  },

  {
    id: "TASK-2026-0000018",
    assignedEmployees: ["HR-EMP-00001", "HR-EMP-00003"],
    status: "pending",
    priority: "Medium",
    subject: "Review employee password policy (dummy)",
    detail: "Review password policy for demo data and ensure no real credentials are used.",
    projectId: "PROJ-2026-0001",
    progress: 0,
    completedAt: null,
    createdAt: "2026-01-06T03:30:00.000Z",
    expectedStartAt: "2026-01-07T06:00:00.000Z",
    expectedEndAt: "2026-01-11T06:00:00.000Z",
    createdBy: "HR-EMP-00001",
    updatedAt: "2026-01-06T03:30:00.000Z",
    history: [
      { at: "2026-01-06T03:30:00.000Z", by: "HR-EMP-00001", action: "created", summary: "HR created policy review task." },
    ],
  },

  {
    id: "TASK-2026-0000019",
    assignedEmployees: ["HR-EMP-00004", "HR-EMP-00006"],
    status: "working",
    priority: "Medium",
    subject: "Prepare shift assignment export",
    detail: "Generate shift assignment export and verify formatting for January.",
    projectId: "PROJ-2026-0002",
    progress: 30,
    completedAt: null,
    createdAt: "2026-01-04T06:55:00.000Z",
    expectedStartAt: "2026-01-04T08:00:00.000Z",
    expectedEndAt: "2026-01-09T12:00:00.000Z",
    createdBy: "HR-EMP-00001",
    updatedAt: "2026-01-05T06:10:00.000Z",
    history: [
      { at: "2026-01-04T06:55:00.000Z", by: "HR-EMP-00001", action: "created", summary: "HR created export task for IT support." },
      { at: "2026-01-05T06:10:00.000Z", by: "HR-EMP-00006", action: "progress_updated", summary: "Created export template. Progress 30%.", changes: { progress: { from: 0, to: 30 } } },
    ],
  },

  {
    id: "TASK-2026-0000020",
    assignedEmployees: ["HR-EMP-00010"],
    status: "completed",
    priority: "Low",
    subject: "Verify QA checklist for packing area",
    detail: "Verify QA checklist compliance and confirm packing logs are updated.",
    projectId: "PROJ-2026-0005",
    progress: 100,
    completedAt: "2026-01-05T05:45:00.000Z",
    createdAt: "2026-01-04T05:30:00.000Z",
    expectedStartAt: "2026-01-04T06:00:00.000Z",
    expectedEndAt: "2026-01-05T06:00:00.000Z",
    createdBy: "HR-EMP-00010",
    updatedAt: "2026-01-05T05:45:00.000Z",
    history: [
      { at: "2026-01-04T05:30:00.000Z", by: "HR-EMP-00010", action: "created", summary: "Self-created QA verification task." },
      { at: "2026-01-05T05:45:00.000Z", by: "HR-EMP-00010", action: "completed", summary: "Checklist verified and logs updated.", changes: { status: { from: "working", to: "completed" }, progress: { from: 0, to: 100 } } },
    ],
  },
];

















// ==================== NOTIFICATIONS ====================
// “database-style”: each row belongs to ONE user (userId)

export const notifications = [
  {
    id: "NOTI-0001",
    userId: "HR-EMP-00002",
    title: "New task assigned",
    message: "Test Account assigned you a new task: Task 20.",
    senderName: "Test Account",
    opened: false,
    type: "task",
    redirectPath: "/tasks",
    createdAt: "2026-01-05T09:10:00.000Z",
  },
  {
    id: "NOTI-0002",
    userId: "HR-EMP-00002",
    title: "Task removed",
    message: "Your assignment on 'Assign to users' has been removed.",
    senderName: "Test Account",
    opened: true,
    type: "task",
    redirectPath: "/tasks",
    createdAt: "2025-12-18T14:05:00.000Z",
  },
  {
    id: "NOTI-0003",
    userId: "HR-EMP-00002",
    title: "Leave approved",
    message: "Your leave request (2 days) has been approved.",
    senderName: "Nimal Perera",
    opened: false,
    type: "leave",
    redirectPath: "/leave",
    createdAt: "2025-12-22T10:30:00.000Z",
  },

  // HR-EMP-00001 (Nimal)
  {
    id: "NOTI-0004",
    userId: "HR-EMP-00001",
    title: "Attendance issue detected",
    message: "3 employees have missing check-ins today.",
    senderName: "System",
    opened: false,
    type: "attendance",
    redirectPath: "/attendance",
    createdAt: "2026-01-06T03:45:00.000Z",
  },
  {
    id: "NOTI-0005",
    userId: "HR-EMP-00001",
    title: "New employee added",
    message: "Employee profile created for Dilshan Wijesinghe.",
    senderName: "System",
    opened: true,
    type: "employee",
    redirectPath: "/profile",
    createdAt: "2025-12-22T17:12:00.000Z",
  },

  // HR-EMP-00003 (Kasun)
  {
    id: "NOTI-0006",
    userId: "HR-EMP-00003",
    title: "Shift updated",
    message: "Your shift has been changed to 9:00 AM - 6:00 PM.",
    senderName: "HR Office",
    opened: false,
    type: "shift",
    redirectPath: "/shift-assignment",
    createdAt: "2026-01-04T08:00:00.000Z",
  },
  {
    id: "NOTI-0007",
    userId: "HR-EMP-00003",
    title: "Payroll generated",
    message: "Your payroll slip is ready for December.",
    senderName: "Accounts",
    opened: true,
    type: "payroll",
    redirectPath: "/payroll",
    createdAt: "2025-12-31T06:15:00.000Z",
  },

  // HR-EMP-00004 (Tharindu)
  {
    id: "NOTI-0008",
    userId: "HR-EMP-00004",
    title: "Attendance area updated",
    message: "Attendance location radius has been updated for your site.",
    senderName: "Admin",
    opened: false,
    type: "attendance",
    redirectPath: "/attendance-areas",
    createdAt: "2025-12-29T12:30:00.000Z",
  },
  {
    id: "NOTI-0009",
    userId: "HR-EMP-00004",
    title: "New policy added",
    message: "Holiday policy has been updated. Please review.",
    senderName: "HR Office",
    opened: true,
    type: "holiday",
    redirectPath: "/holiday",
    createdAt: "2025-12-20T09:00:00.000Z",
  },

  // HR-EMP-00005 (Ayesha)
  {
    id: "NOTI-0010",
    userId: "HR-EMP-00005",
    title: "Payroll adjustment",
    message: "Your payroll has been adjusted due to overtime update.",
    senderName: "Accounts",
    opened: false,
    type: "payroll",
    redirectPath: "/payroll",
    createdAt: "2026-01-02T11:20:00.000Z",
  },
  {
    id: "NOTI-0011",
    userId: "HR-EMP-00005",
    title: "New task comment",
    message: "Kasun commented on your task: “Please confirm the totals.”",
    senderName: "Kasun Jayasinghe",
    opened: true,
    type: "task",
    redirectPath: "/tasks",
    createdAt: "2025-12-27T15:40:00.000Z",
  },

  // HR-EMP-00006 (Dilshan)
  {
    id: "NOTI-0012",
    userId: "HR-EMP-00006",
    title: "Todo reminder",
    message: "You have 3 pending todos due today.",
    senderName: "System",
    opened: false,
    type: "todo",
    redirectPath: "/todo",
    createdAt: "2026-01-06T06:00:00.000Z",
  },
  {
    id: "NOTI-0013",
    userId: "HR-EMP-00006",
    title: "Leave request submitted",
    message: "Your leave request has been submitted for approval.",
    senderName: "System",
    opened: true,
    type: "leave",
    redirectPath: "/leave",
    createdAt: "2025-12-24T07:25:00.000Z",
  },

  // HR-EMP-00007 (Ruwani)
  {
    id: "NOTI-0014",
    userId: "HR-EMP-00007",
    title: "New announcement",
    message: "Company meeting scheduled for Friday at 3:00 PM.",
    senderName: "Management",
    opened: false,
    type: "general",
    redirectPath: "/feeds",
    createdAt: "2026-01-03T10:05:00.000Z",
  },
  {
    id: "NOTI-0015",
    userId: "HR-EMP-00007",
    title: "Attendance marked",
    message: "Your attendance has been marked successfully.",
    senderName: "System",
    opened: true,
    type: "attendance",
    redirectPath: "/attendance",
    createdAt: "2026-01-05T04:50:00.000Z",
  },

  // HR-EMP-00008 (Isuru)
  {
    id: "NOTI-0016",
    userId: "HR-EMP-00008",
    title: "Shift assignment added",
    message: "You have been assigned to Shift B starting tomorrow.",
    senderName: "HR Office",
    opened: false,
    type: "shift",
    redirectPath: "/shift-assignment",
    createdAt: "2026-01-05T13:15:00.000Z",
  },
  {
    id: "NOTI-0017",
    userId: "HR-EMP-00008",
    title: "Holiday reminder",
    message: "Upcoming holiday: Duruthu Full Moon Poya (in 2 days).",
    senderName: "System",
    opened: true,
    type: "holiday",
    redirectPath: "/holiday",
    createdAt: "2026-01-04T07:00:00.000Z",
  },

  // HR-EMP-00009 (Mihiri)
  {
    id: "NOTI-0018",
    userId: "HR-EMP-00009",
    title: "Task due soon",
    message: "Your task “Design banner set” is due in 24 hours.",
    senderName: "Task Bot",
    opened: false,
    type: "task",
    redirectPath: "/tasks",
    createdAt: "2026-01-06T08:10:00.000Z",
  },

  // HR-EMP-00010 (Shehan)
  {
    id: "NOTI-0019",
    userId: "HR-EMP-00010",
    title: "Attendance warning",
    message: "Late check-in detected twice this week.",
    senderName: "System",
    opened: true,
    type: "attendance",
    redirectPath: "/attendance",
    createdAt: "2025-12-28T05:20:00.000Z",
  },
  {
    id: "NOTI-0020",
    userId: "HR-EMP-00010",
    title: "New feed post",
    message: "A new post was added: “Safety checklist update”.",
    senderName: "Admin",
    opened: false,
    type: "general",
    redirectPath: "/feeds",
    createdAt: "2026-01-02T09:35:00.000Z",
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
