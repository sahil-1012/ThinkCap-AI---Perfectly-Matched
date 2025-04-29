'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  BookOpen,
  FileText,
  CheckCircle,
  AlertTriangle,
  Search,
  Settings,
  LogOut,
  UserCheck,
  BellRing,
  DownloadCloud
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Admin profile
const adminProfile = {
  id: 'ADM001',
  name: 'Admin User',
  email: 'admin@university.edu',
};

// Project allocation stats
const allocationStats = {
  totalProjects: 42,
  allocatedProjects: 31,
  pendingProjects: 11,
  totalStudents: 175,
  allocatedStudents: 148,
  totalGroups: 38,
  pendingApprovals: 7,
  projectAllocationProgress: 74, // percentage
};

// Projects data
const projects = [
  {
    id: 'PRJ001',
    title: 'Machine Learning for Medical Imaging',
    supervisor: 'Dr. Sarah Johnson',
    department: 'Computer Science',
    studentCount: 4,
    status: 'Allocated',
    allocationDate: '2023-09-15',
  },
  {
    id: 'PRJ002',
    title: 'Smart Grid Security Systems',
    supervisor: 'Prof. Michael Chen',
    department: 'Electrical Engineering',
    studentCount: 3,
    status: 'Allocated',
    allocationDate: '2023-09-15',
  },
  {
    id: 'PRJ003',
    title: 'Blockchain for Supply Chain Management',
    supervisor: 'Dr. Robert Williams',
    department: 'Computer Science',
    studentCount: 0,
    status: 'Pending',
    allocationDate: '-',
  },
  {
    id: 'PRJ004',
    title: 'Autonomous Drone Navigation',
    supervisor: 'Prof. Emily Zhang',
    department: 'Robotics',
    studentCount: 4,
    status: 'Allocated',
    allocationDate: '2023-09-16',
  },
  {
    id: 'PRJ005',
    title: 'Neural Networks for Natural Language Processing',
    supervisor: 'Dr. James Wilson',
    department: 'Computer Science',
    studentCount: 0,
    status: 'Pending',
    allocationDate: '-',
  },
];

// Student groups data
const studentGroups = [
  {
    id: 'GRP001',
    name: 'Team Alpha',
    members: ['John Doe', 'Jane Smith', 'Alex Johnson', 'Maria Garcia'],
    projectId: 'PRJ001',
    department: 'Computer Science',
    status: 'Allocated',
  },
  {
    id: 'GRP002',
    name: 'Innovators',
    members: ['David Chen', 'Sarah Williams', 'Robert Brown'],
    projectId: 'PRJ002',
    department: 'Electrical Engineering',
    status: 'Allocated',
  },
  {
    id: 'GRP003',
    name: 'Team Byte',
    members: ['Michael Park', 'Lisa Wong', 'James Taylor', 'Emma Davis'],
    projectId: 'PRJ004',
    department: 'Robotics',
    status: 'Allocated',
  },
  {
    id: 'GRP004',
    name: 'Data Wizards',
    members: ['Thomas Anderson', 'Sophia Martinez', 'Daniel Lee'],
    projectId: null,
    department: 'Computer Science',
    status: 'Waiting',
  },
  {
    id: 'GRP005',
    name: 'Circuit Masters',
    members: ['Olivia Johnson', 'William Brown', 'Ethan Davis', 'Ava Wilson'],
    projectId: null,
    department: 'Electrical Engineering',
    status: 'Waiting',
  },
];

// Faculty data
const facultyMembers = [
  {
    id: 'FAC001',
    name: 'Dr. Sarah Johnson',
    department: 'Computer Science',
    projectsOffered: 3,
    projectsAllocated: 2,
    projectsSupervising: 2,
    students: 8,
  },
  {
    id: 'FAC002',
    name: 'Prof. Michael Chen',
    department: 'Electrical Engineering',
    projectsOffered: 2,
    projectsAllocated: 1,
    projectsSupervising: 1,
    students: 3,
  },
  {
    id: 'FAC003',
    name: 'Dr. Robert Williams',
    department: 'Computer Science',
    projectsOffered: 4,
    projectsAllocated: 2,
    projectsSupervising: 2,
    students: 7,
  },
  {
    id: 'FAC004',
    name: 'Prof. Emily Zhang',
    department: 'Robotics',
    projectsOffered: 3,
    projectsAllocated: 2,
    projectsSupervising: 2,
    students: 8,
  },
  {
    id: 'FAC005',
    name: 'Dr. James Wilson',
    department: 'Computer Science',
    projectsOffered: 2,
    projectsAllocated: 0,
    projectsSupervising: 0,
    students: 0,
  },
];

// Recent approval requests
const approvalRequests = [
  {
    id: 'REQ001',
    type: 'Project Proposal',
    title: 'IoT for Smart Agriculture',
    submittedBy: 'Dr. Emily Zhang',
    department: 'Robotics',
    submissionDate: '2023-10-18',
    status: 'Pending',
  },
  {
    id: 'REQ002',
    type: 'Group Formation',
    title: 'Team Phoenix',
    submittedBy: 'Linda Chen (Student)',
    department: 'Computer Science',
    submissionDate: '2023-10-19',
    status: 'Pending',
  },
  {
    id: 'REQ003',
    type: 'Project Assignment',
    title: 'Team Quantum to Blockchain Project',
    submittedBy: 'System (Auto-allocation)',
    department: 'Computer Science',
    submissionDate: '2023-10-20',
    status: 'Pending',
  },
  {
    id: 'REQ004',
    type: 'Project Proposal',
    title: 'Renewable Energy Management Systems',
    submittedBy: 'Prof. Michael Chen',
    department: 'Electrical Engineering',
    submissionDate: '2023-10-17',
    status: 'Approved',
  },
];

// Status color mapping
const getStatusColor = (status: string) => {
  const colors = {
    Allocated: 'bg-green-500',
    Pending: 'bg-yellow-500',
    Waiting: 'bg-blue-500',
    Approved: 'bg-green-500',
    Rejected: 'bg-red-500',
  };
  return colors[status as keyof typeof colors] || 'bg-gray-500';
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  
  // Filter projects based on search and department filter
  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.supervisor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = 
      departmentFilter === 'All' || 
      project.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  // Handle logout
  const handleLogout = () => {
    router.push('/login');
  };

  // Handle allocation generation
  const handleGenerateAllocation = () => {
    alert('Project allocation process initiated. This may take a few minutes...');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md h-screen p-4 fixed">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-bold">Project Admin</h1>
          </div>
          
          <div className="space-y-1">
            <Link href="/admin/dashboard" passHref>
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Projects Overview
              </Button>
            </Link>
            <Link href="/admin/students" passHref>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Student Groups
              </Button>
            </Link>
            <Link href="/admin/faculty" passHref>
              <Button variant="ghost" className="w-full justify-start">
                <UserCheck className="mr-2 h-4 w-4" />
                Faculty Members
              </Button>
            </Link>
            <Link href="/admin/approvals" passHref>
              <Button variant="ghost" className="w-full justify-start">
                <CheckCircle className="mr-2 h-4 w-4" />
                Approval Requests
              </Button>
            </Link>
            <Link href="/admin/settings" passHref>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Allocation Settings
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-600" 
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/avatars/admin.png" alt={adminProfile.name} />
                    <AvatarFallback className="bg-indigo-600 text-white">{adminProfile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{adminProfile.name}</p>
                    <p className="text-xs text-gray-500">Project Administrator</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Main content */}
        <div className="ml-64 flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header with notifications */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Project Allocation Dashboard</h1>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <BellRing className="h-4 w-4" />
                  <span className="bg-red-500 text-white text-xs rounded-full px-1.5">
                    {approvalRequests.filter(req => req.status === 'Pending').length}
                  </span>
                </Button>
                <div className="text-sm text-gray-500">
                  Academic Year: 2023-2024
                </div>
              </div>
            </div>
            
            {/* Allocation stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg font-medium text-gray-500">Projects</h3>
                    <p className="text-3xl font-bold">{allocationStats.totalProjects}</p>
                    <div className="text-sm text-gray-500 mt-1">
                      {allocationStats.allocatedProjects} allocated
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg font-medium text-gray-500">Students</h3>
                    <p className="text-3xl font-bold">{allocationStats.totalStudents}</p>
                    <div className="text-sm text-gray-500 mt-1">
                      {allocationStats.allocatedStudents} assigned to projects
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg font-medium text-gray-500">Groups</h3>
                    <p className="text-3xl font-bold">{allocationStats.totalGroups}</p>
                    <div className="text-sm text-gray-500 mt-1">
                      {studentGroups.filter(g => g.status === 'Waiting').length} waiting for assignment
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg font-medium text-gray-500">Allocation Progress</h3>
                    <p className="text-3xl font-bold text-indigo-600">
                      {allocationStats.projectAllocationProgress}%
                    </p>
                    <div className="w-full mt-2">
                      <Progress value={allocationStats.projectAllocationProgress} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Generate allocation button */}
            <Card className="bg-indigo-50 border-indigo-100">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div className="max-w-lg">
                    <h3 className="text-lg font-medium text-indigo-900">Project Allocation System</h3>
                    <p className="text-indigo-700 mt-1">
                      Generate intelligent project allocations based on student preferences, faculty capacities, and project requirements.
                    </p>
                  </div>
                  <Button 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
                    onClick={handleGenerateAllocation}
                  >
                    <CheckCircle className="h-4 w-4" />
                    Generate Allocation
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Main Dashboard Tabs */}
            <Tabs defaultValue="projects" className="space-y-4">
              <TabsList>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="students">Student Groups</TabsTrigger>
                <TabsTrigger value="faculty">Faculty</TabsTrigger>
                <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
              </TabsList>
              
              {/* Projects Tab */}
              <TabsContent value="projects">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Project Management</CardTitle>
                      <CardDescription>
                        View and manage all projects in the system
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Input 
                        placeholder="Search projects..." 
                        className="w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <select 
                        className="px-3 py-2 rounded-md border"
                        value={departmentFilter}
                        onChange={(e) => setDepartmentFilter(e.target.value)}
                      >
                        <option value="All">All Departments</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electrical Engineering">Electrical Engineering</option>
                        <option value="Robotics">Robotics</option>
                      </select>
                      <Button className="bg-indigo-600 hover:bg-indigo-700">
                        Add Project
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Project Title</TableHead>
                          <TableHead>Supervisor</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Students</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Allocation Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProjects.map((project) => (
                          <TableRow key={project.id}>
                            <TableCell className="font-medium">{project.id}</TableCell>
                            <TableCell>{project.title}</TableCell>
                            <TableCell>{project.supervisor}</TableCell>
                            <TableCell>{project.department}</TableCell>
                            <TableCell>{project.studentCount} / 4</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(project.status)}>
                                {project.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{project.allocationDate}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                                <Button variant="outline" size="sm">
                                Edit
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-gray-500">
                      Showing {filteredProjects.length} of {projects.length} projects
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <DownloadCloud className="h-4 w-4" />
                      Export Projects
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Student Groups Tab */}
              <TabsContent value="students">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Group Management</CardTitle>
                    <CardDescription>
                      View and manage student groups and their project assignments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-4">
                      <Input 
                        placeholder="Search groups..." 
                        className="w-64"
                      />
                      <div className="flex space-x-2">
                        <select className="px-3 py-2 rounded-md border">
                          <option value="All">All Departments</option>
                          <option value="Computer Science">Computer Science</option>
                          <option value="Electrical Engineering">Electrical Engineering</option>
                          <option value="Robotics">Robotics</option>
                        </select>
                        <Button className="bg-indigo-600 hover:bg-indigo-700">
                          Manage Groups
                        </Button>
                      </div>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Group ID</TableHead>
                          <TableHead>Group Name</TableHead>
                          <TableHead>Members</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Project</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {studentGroups.map((group) => (
                          <TableRow key={group.id}>
                            <TableCell className="font-medium">{group.id}</TableCell>
                            <TableCell>{group.name}</TableCell>
                            <TableCell>
                              <div className="flex -space-x-2 overflow-hidden">
                                {group.members.map((member, index) => (
                                  <Avatar key={index} className="border-2 border-white w-8 h-8">
                                    <AvatarFallback className="text-xs bg-indigo-100 text-indigo-800">
                                      {member.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                                <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-white text-xs font-medium">
                                  {group.members.length}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{group.department}</TableCell>
                            <TableCell>
                              {group.projectId ? 
                                group.projectId + ' - ' + 
                                projects.find(p => p.id === group.projectId)?.title.substring(0, 20) + '...' : 
                                'Not assigned'}
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(group.status)}>
                                {group.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                                {group.status === 'Waiting' && (
                                  <Button variant="outline" size="sm" className="text-indigo-600">
                                    Assign
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Faculty Tab */}
              <TabsContent value="faculty">
                <Card>
                  <CardHeader>
                    <CardTitle>Faculty Management</CardTitle>
                    <CardDescription>
                      View faculty members and their project supervision load
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-4">
                      <Input 
                        placeholder="Search faculty..." 
                        className="w-64"
                      />
                      <div className="flex space-x-2">
                        <select className="px-3 py-2 rounded-md border">
                          <option value="All">All Departments</option>
                          <option value="Computer Science">Computer Science</option>
                          <option value="Electrical Engineering">Electrical Engineering</option>
                          <option value="Robotics">Robotics</option>
                        </select>
                        <Button className="bg-indigo-600 hover:bg-indigo-700">
                          Add Faculty
                        </Button>
                      </div>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Projects Offered</TableHead>
                          <TableHead>Projects Allocated</TableHead>
                          <TableHead>Supervising</TableHead>
                          <TableHead>Students</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {facultyMembers.map((faculty) => (
                          <TableRow key={faculty.id}>
                            <TableCell className="font-medium">{faculty.id}</TableCell>
                            <TableCell>{faculty.name}</TableCell>
                            <TableCell>{faculty.department}</TableCell>
                            <TableCell>{faculty.projectsOffered}</TableCell>
                            <TableCell>{faculty.projectsAllocated}</TableCell>
                            <TableCell>{faculty.projectsSupervising}</TableCell>
                            <TableCell>{faculty.students}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  View Projects
                                </Button>
                                <Button variant="outline" size="sm">
                                  Contact
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Approvals Tab */}
              <TabsContent value="approvals">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Approvals</CardTitle>
                    <CardDescription>
                      Review and manage pending approval requests
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {approvalRequests.map((request) => (
                        <Card key={request.id} className={
                          request.status === 'Pending' ? 'border-yellow-200 bg-yellow-50' : 'border'
                        }>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center space-x-2">
                                  <Badge className={
                                    request.type === 'Project Proposal' ? 'bg-blue-500' :
                                    request.type === 'Group Formation' ? 'bg-purple-500' :
                                    'bg-green-500'
                                  }>
                                    {request.type}
                                  </Badge>
                                  <h3 className="font-medium">{request.title}</h3>
                                </div>
                                <div className="mt-2 space-y-1 text-sm text-gray-500">
                                  <p>Submitted by: {request.submittedBy}</p>
                                  <p>Department: {request.department}</p>
                                  <p>Date: {request.submissionDate}</p>
                                </div>
                              </div>
                              
                              <div className="flex space-x-2">
                                <Badge className={getStatusColor(request.status)}>
                                  {request.status}
                                </Badge>
                                {request.status === 'Pending' && (
                                  <div className="flex space-x-2">
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                      Approve
                                    </Button>
                                    <Button size="sm" variant="outline" className="text-red-600">
                                      Reject
                                    </Button>
                                  </div>
                                )}
                                {request.status === 'Approved' && (
                                  <Button size="sm" variant="outline">
                                    View Details
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-gray-500">
                      Showing {approvalRequests.filter(r => r.status === 'Pending').length} pending approvals
                    </div>
                    <Button variant="outline" size="sm">
                      View Approval History
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
            
            {/* Department Analytics Card */}
            <Card>
              <CardHeader>
                <CardTitle>Department Project Distribution</CardTitle>
                <CardDescription>
                  Overview of project allocation by department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Computer Science Department */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Computer Science</h3>
                      <span className="text-sm text-gray-500">
                        {projects.filter(p => p.department === 'Computer Science').length} projects,
                        {' '}
                        {projects.filter(p => p.department === 'Computer Science' && p.status === 'Allocated').length} allocated
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ 
                            width: `${(projects.filter(p => p.department === 'Computer Science' && p.status === 'Allocated').length / 
                                    projects.filter(p => p.department === 'Computer Science').length) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">
                        {Math.round((projects.filter(p => p.department === 'Computer Science' && p.status === 'Allocated').length / 
                                  projects.filter(p => p.department === 'Computer Science').length) * 100)}%
                      </span>
                    </div>
                  </div>
                  
                  {/* Electrical Engineering Department */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Electrical Engineering</h3>
                      <span className="text-sm text-gray-500">
                        {projects.filter(p => p.department === 'Electrical Engineering').length} projects,
                        {' '}
                        {projects.filter(p => p.department === 'Electrical Engineering' && p.status === 'Allocated').length} allocated
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-purple-600 h-2.5 rounded-full" 
                          style={{ 
                            width: `${(projects.filter(p => p.department === 'Electrical Engineering' && p.status === 'Allocated').length / 
                                    projects.filter(p => p.department === 'Electrical Engineering').length) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">
                        {Math.round((projects.filter(p => p.department === 'Electrical Engineering' && p.status === 'Allocated').length / 
                                  projects.filter(p => p.department === 'Electrical Engineering').length) * 100)}%
                      </span>
                    </div>
                  </div>
                  
                  {/* Robotics Department */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Robotics</h3>
                      <span className="text-sm text-gray-500">
                        {projects.filter(p => p.department === 'Robotics').length} projects,
                        {' '}
                        {projects.filter(p => p.department === 'Robotics' && p.status === 'Allocated').length} allocated
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-green-600 h-2.5 rounded-full" 
                          style={{ 
                            width: `${(projects.filter(p => p.department === 'Robotics' && p.status === 'Allocated').length / 
                                    projects.filter(p => p.department === 'Robotics').length) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">
                        {Math.round((projects.filter(p => p.department === 'Robotics' && p.status === 'Allocated').length / 
                                  projects.filter(p => p.department === 'Robotics').length) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Generate Department Reports
                </Button>
              </CardFooter>
            </Card>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Manual Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Manually assign projects to student groups or individual students.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Start Manual Allocation
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Export Allocations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Download current project allocations in various formats.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <DownloadCloud className="h-4 w-4" />
                    Export Data
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Notify Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Send notifications to students and faculty about project allocations.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Send Notifications
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
