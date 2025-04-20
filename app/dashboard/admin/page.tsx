'use client';

import { useState, useEffect } from 'react';
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
  Bell, 
  Users, 
  UserCog,
  Database,
  Settings,
  LogOut,
  Shield,
  Activity,
  Server,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Mock admin profile
const adminProfile = {
  id: 'ADM001',
  name: 'Admin User',
  email: 'admin@university.edu',
  role: 'System Administrator',
};

// Mock system stats
const systemStats = {
  totalUsers: 248,
  activeUsers: 187,
  totalProjects: 42,
  pendingApprovals: 6,
  systemHealth: 98,
  storageUsed: 68,
  lastBackup: '2023-10-20 03:15 AM',
  activeTeachers: 12,
  activeStudents: 175,
};

// Mock user accounts for management
const userAccounts = [
  {
    id: 'TCH001',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    role: 'Teacher',
    department: 'Computer Science',
    status: 'Active',
    lastLogin: '2023-10-21 09:45 AM',
  },
  {
    id: 'TCH002',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@university.edu',
    role: 'Teacher',
    department: 'Electrical Engineering',
    status: 'Active',
    lastLogin: '2023-10-20 02:30 PM',
  },
  {
    id: 'ST001',
    name: 'John Doe',
    email: 'john.doe@university.edu',
    role: 'Student',
    department: 'Computer Science',
    status: 'Active',
    lastLogin: '2023-10-21 11:20 AM',
  },
  {
    id: 'ST002',
    name: 'Jane Smith',
    email: 'jane.smith@university.edu',
    role: 'Student',
    department: 'Computer Science',
    status: 'Inactive',
    lastLogin: '2023-10-15 04:10 PM',
  },
  {
    id: 'ADM002',
    name: 'Alex Wilson',
    email: 'alex.wilson@university.edu',
    role: 'Admin',
    department: 'IT Services',
    status: 'Active',
    lastLogin: '2023-10-21 08:05 AM',
  },
];

// Mock system logs
const systemLogs = [
  {
    id: 'LOG001',
    timestamp: '2023-10-21 10:15:22',
    level: 'INFO',
    message: 'User TCH001 logged in successfully',
    source: 'Authentication Service',
  },
  {
    id: 'LOG002',
    timestamp: '2023-10-21 09:45:10',
    level: 'WARNING',
    message: 'High CPU usage detected (85%)',
    source: 'System Monitor',
  },
  {
    id: 'LOG003',
    timestamp: '2023-10-21 09:30:45',
    level: 'ERROR',
    message: 'Database connection timeout after 30s',
    source: 'Database Service',
  },
  {
    id: 'LOG004',
    timestamp: '2023-10-21 09:15:33',
    level: 'INFO',
    message: 'Backup completed successfully',
    source: 'Backup Service',
  },
  {
    id: 'LOG005',
    timestamp: '2023-10-21 08:50:19',
    level: 'INFO',
    message: 'New project PRJ005 submitted by Team Epsilon',
    source: 'Project Service',
  },
];

// Status color mapping
const getStatusColor = (status: string) => {
  const colors = {
    Active: 'bg-green-500',
    Inactive: 'bg-gray-500',
    Pending: 'bg-yellow-500',
    Suspended: 'bg-red-500',
  };
  return colors[status as keyof typeof colors] || 'bg-gray-500';
};

// Log level color mapping
const getLogLevelColor = (level: string) => {
  const colors = {
    INFO: 'bg-blue-500',
    WARNING: 'bg-yellow-500',
    ERROR: 'bg-red-500',
    CRITICAL: 'bg-red-700',
  };
  return colors[level as keyof typeof colors] || 'bg-gray-500';
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  
  // Filtered users based on search and filters
  const filteredUsers = userAccounts.filter(user => {
    const matchesSearch = 
      searchQuery === '' || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = 
      roleFilter === 'All' || 
      user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  // Handle logout
  const handleLogout = () => {
    // In a real app, this would clear auth tokens/session
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 shadow-md h-screen p-4 fixed">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
              <Shield className="h-4 w-4" />
            </div>
            <h1 className="text-xl font-bold">Admin Portal</h1>
          </div>
          
          <div className="space-y-1">
            <Link href="/admin/dashboard" passHref>
              <Button variant="ghost" className="w-full justify-start text-white">
                <Activity className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/users" passHref>
              <Button variant="ghost" className="w-full justify-start text-white">
                <Users className="mr-2 h-4 w-4" />
                User Management
              </Button>
            </Link>
            <Link href="/admin/projects" passHref>
              <Button variant="ghost" className="w-full justify-start text-white">
                <FileText className="mr-2 h-4 w-4" />
                Projects
              </Button>
            </Link>
            <Link href="/admin/system" passHref>
              <Button variant="ghost" className="w-full justify-start text-white">
                <Server className="mr-2 h-4 w-4" />
                System Status
              </Button>
            </Link>
            <Link href="/admin/settings" passHref>
              <Button variant="ghost" className="w-full justify-start text-white">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-400" 
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <Card className="bg-gray-700 border-gray-600">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/avatars/admin.png" alt={adminProfile.name} />
                    <AvatarFallback className="bg-red-700">{adminProfile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{adminProfile.name}</p>
                    <p className="text-xs text-gray-400">{adminProfile.role}</p>
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
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="icon" className="border-gray-700 text-gray-300">
                  <Bell className="h-4 w-4" />
                </Button>
                <div className="text-sm text-gray-400">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg font-medium text-gray-400">Total Users</h3>
                    <p className="text-3xl font-bold">{systemStats.totalUsers}</p>
                    <div className="text-sm text-gray-500 mt-1">
                      {systemStats.activeUsers} active
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg font-medium text-gray-400">Projects</h3>
                    <p className="text-3xl font-bold">{systemStats.totalProjects}</p>
                    <div className="text-sm text-gray-500 mt-1">
                      {systemStats.pendingApprovals} pending approval
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg font-medium text-gray-400">System Health</h3>
                    <p className="text-3xl font-bold text-green-500">{systemStats.systemHealth}%</p>
                    <div className="text-sm text-gray-500 mt-1">
                      All services operational
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg font-medium text-gray-400">Storage</h3>
                    <p className="text-3xl font-bold text-blue-500">{systemStats.storageUsed}%</p>
                    <div className="text-sm text-gray-500 mt-1">
                      Last backup: {systemStats.lastBackup}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Dashboard Tabs */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="bg-gray-800 border-gray-700">
                <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700">Overview</TabsTrigger>
                <TabsTrigger value="users" className="data-[state=active]:bg-gray-700">User Management</TabsTrigger>
                <TabsTrigger value="logs" className="data-[state=active]:bg-gray-700">System Logs</TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-gray-700">System Settings</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle>User Distribution</CardTitle>
                      <CardDescription className="text-gray-400">Breakdown of system users by role</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 flex items-center justify-center">
                        <div className="w-64 h-64 rounded-full border-8 border-gray-700 relative">
                          {/* Teacher segment (30%) */}
                          <div className="absolute inset-0 bg-blue-500" style={{ 
                            clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 30%, 50% 50%)'
                          }}></div>
                          
                          {/* Student segment (60%) */}
                          <div className="absolute inset-0 bg-green-500" style={{ 
                            clipPath: 'polygon(50% 50%, 100% 30%, 100% 100%, 20% 100%, 50% 50%)'
                          }}></div>
                          
                          {/* Admin segment (10%) */}
                          <div className="absolute inset-0 bg-red-500" style={{ 
                            clipPath: 'polygon(50% 50%, 20% 100%, 0% 100%, 0% 0%, 50% 0%, 50% 50%)'
                          }}></div>
                          
                          {/* Center circle */}
                          <div className="absolute inset-0 m-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center">
                            <span className="text-lg font-bold">{systemStats.totalUsers}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-around mt-4">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                          <span className="text-sm">Teachers ({systemStats.activeTeachers})</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-sm">Students ({systemStats.activeStudents})</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                          <span className="text-sm">Admins (3)</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle>System Health</CardTitle>
                      <CardDescription className="text-gray-400">Current status of system components</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>CPU Usage</span>
                            <span className="font-medium">42%</span>
                          </div>
                          <Progress value={42} className="h-2 bg-gray-700"/>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Memory Usage</span>
                            <span className="font-medium">58%</span>
                          </div>
                          <Progress value={58} className="h-2 bg-gray-700"/>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Storage Usage</span>
                            <span className="font-medium">{systemStats.storageUsed}%</span>
                          </div>
                          <Progress value={systemStats.storageUsed} className="h-2 bg-gray-700"/>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Network Load</span>
                            <span className="font-medium">35%</span>
                          </div>
                          <Progress value={35} className="h-2 bg-gray-700"/>
                        </div>
                      </div>
                      
                      <div className="mt-6 space-y-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span>Database Service: Operational</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span>Authentication Service: Operational</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span>File Storage Service: Operational</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                          <span>Email Service: Degraded Performance</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-800 border-gray-700 md:col-span-2">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription className="text-gray-400">Latest system events and user actions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {systemLogs.slice(0, 5).map((log) => (
                          <div key={log.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-700">
                            <Badge className={`${getLogLevelColor(log.level)} self-start mt-0.5`}>
                              {log.level}
                            </Badge>
                            <div className="flex-1">
                              <p className="text-sm">{log.message}</p>
                              <div className="flex justify-between mt-1">
                                <span className="text-xs text-gray-400">{log.source}</span>
                                <span className="text-xs text-gray-400">{log.timestamp}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-700">
                        View All Logs
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              {/* User Management Tab */}
              <TabsContent value="users">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>User Management</CardTitle>
                      <CardDescription className="text-gray-400">Manage system users and permissions</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Input 
                        placeholder="Search users..." 
                        className="w-64 bg-gray-700 border-gray-600 text-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <select 
                        className="px-3 py-2 rounded-md bg-gray-700 border-gray-600 text-white"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                      >
                        <option value="All">All Roles</option>
                        <option value="Admin">Admin</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Student">Student</option>
                      </select>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Add User
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader className="bg-gray-700">
                        <TableRow className="hover:bg-gray-700 border-gray-600">
                          <TableHead className="text-gray-300">ID</TableHead>
                          <TableHead className="text-gray-300">Name</TableHead>
                          <TableHead className="text-gray-300">Email</TableHead>
                          <TableHead className="text-gray-300">Role</TableHead>
                          <TableHead className="text-gray-300">Department</TableHead>
                          <TableHead className="text-gray-300">Status</TableHead>
                          <TableHead className="text-gray-300">Last Login</TableHead>
                          <TableHead className="text-gray-300">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((user) => (
                          <TableRow key={user.id} className="hover:bg-gray-700 border-gray-600">
                            <TableCell className="font-medium">{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge className={
                                user.role === 'Admin' ? 'bg-red-500' : 
                                user.role === 'Teacher' ? 'bg-blue-500' : 
                                'bg-green-500'
                              }>
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell>{user.department}</TableCell>
                            <TableCell>
                              <Badge
                                className={`${getStatusColor(user.status)} text-white`}
                              >
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{user.lastLogin}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                                  Edit
                                </Button>
                                <Button variant="outline" size="sm" className="border-gray-600 text-red-400 hover:bg-gray-700 hover:text-red-300">
                                  Suspend
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-gray-700 pt-4">
                    <div className="text-sm text-gray-400">
                      Showing {filteredUsers.length} of {userAccounts.length} users
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                        Previous
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                        Next
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* System Logs Tab */}
              <TabsContent value="logs">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>System Logs</CardTitle>
                    <CardDescription className="text-gray-400">Monitor system events and activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                          All Levels
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-600 text-blue-400">
                          Info
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-600 text-yellow-400">
                          Warning
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-600 text-red-400">
                          Error
                        </Button>
                      </div>
                      <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                        Export Logs
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {systemLogs.map((log) => (
                        <div key={log.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-700">
                          <Badge className={`${getLogLevelColor(log.level)} self-start mt-0.5`}>
                            {log.level}
                          </Badge>
                          <div className="flex-1">
                            <p className="text-sm">{log.message}</p>
                            <div className="flex justify-between mt-1">
                              <span className="text-xs text-gray-400">{log.source}</span>
                              <span className="text-xs text-gray-400">{log.timestamp}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center border-t border-gray-700 pt-4">
                    <Button variant="outline" className="border-gray-600 text-gray-300">
                      Load More Logs
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* System Settings Tab */}
              <TabsContent value="settings">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                    <CardDescription className="text-gray-400">Configure system parameters and behavior</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">General Settings</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm text-gray-400">System Name</label>
                            <Input 
                              value="Project Allocation System" 
                              className="bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm text-gray-400">Institution Name</label>
                            <Input 
                              value="University of Technology" 
                              className="bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm text-gray-400">Academic Year</label>
                            <Input 
                              value="2023-2024" 
                              className="bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm text-gray-400">Time Zone</label>
                            <select className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white">
                              <option>UTC (GMT+0)</option>
                              <option>Eastern Time (GMT-5)</option>
                              <option>Pacific Time (GMT-8)</option>
                              <option>Central European Time (GMT+1)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Email Configuration</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm text-gray-400">SMTP Server</label>
                            <Input 
                              value="smtp.university.edu" 
                              className="bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm text-gray-400">SMTP Port</label>
                            <Input 
                              value="587" 
                              className="bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm text-gray-400">Sender Email</label>
                            <Input 
                              value="noreply@university.edu" 
                              className="bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm text-gray-400">Email Authentication</label>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="email-auth" className="rounded bg-gray-700 border-gray-600" checked />
                              <label htmlFor="email-auth" className="text-sm">Enable SMTP Authentication</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Security Settings</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm text-gray-400">Session Timeout (minutes)</label>
                            <Input 
                              type="number"
                              value="30" 
                              className="bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm text-gray-400">Password Policy</label>
                            <select className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white">
                              <option>Strong (8+ chars, mixed case, numbers, symbols)</option>
                              <option>Medium (8+ chars, mixed case, numbers)</option>
                              <option>Basic (8+ characters)</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm text-gray-400">Failed Login Attempts</label>
                            <Input 
                              type="number"
                              value="5" 
                              className="bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm text-gray-400">Two-Factor Authentication</label>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="2fa" className="rounded bg-gray-700 border-gray-600" checked />
                              <label htmlFor="2fa" className="text-sm">Require for Admin Accounts</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Backup & Maintenance</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm text-gray-400">Automatic Backups</label>
                            <select className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white">
                              <option>Daily</option>
                              <option>Weekly</option>
                              <option>Monthly</option>
                              <option>Disabled</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm text-gray-400">Backup Retention (days)</label>
                            <Input 
                              type="number"
                              value="30" 
                              className="bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm text-gray-400">Maintenance Window</label>
                            <Input 
                              value="Sunday, 02:00 - 04:00" 
                              className="bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm text-gray-400">Log Retention (days)</label>
                            <Input 
                              type="number"
                              value="90" 
                              className="bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2 border-t border-gray-700 pt-4">
                    <Button variant="outline" className="border-gray-600 text-gray-300">
                      Cancel
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
                