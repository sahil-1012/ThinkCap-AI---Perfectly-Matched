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
  BookOpen, 
  Calendar, 
  ChevronRight, 
  MessageSquare, 
  Search, 
  Star, 
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  BarChart2,
  Settings,
  LogOut
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock teacher profile
const teacherProfile = {
  id: 'TCH001',
  name: 'Dr. Sarah Johnson',
  email: 'sarah.johnson@university.edu',
  department: 'Computer Science',
  position: 'Associate Professor',
  expertise: ['Machine Learning', 'Natural Language Processing', 'Computer Vision'],
};

// Mock project submissions
const projectSubmissions = [
  {
    id: 'PRJ001',
    title: 'AI-Powered Learning Platform',
    domain: 'AI/ML',
    submittedBy: 'Team Alpha',
    teamMembers: [
      { id: 'ST001', name: 'John Doe' },
      { id: 'ST002', name: 'Jane Smith' },
    ],
    submissionDate: '2023-10-15',
    status: 'Pending',
    matchScore: 87,
    description: 'An adaptive learning platform that uses machine learning to personalize educational content based on student performance and learning patterns.',
    technicalRequirements: ['Python', 'TensorFlow', 'React', 'Node.js'],
    mlRecommendation: 'Approve',
    mlConfidence: 92,
    mlReasoning: 'High alignment with team skills and department resources. Project scope is achievable within the timeframe.',
  },
  {
    id: 'PRJ002',
    title: 'Blockchain-Based Voting System',
    domain: 'Blockchain',
    submittedBy: 'Team Beta',
    teamMembers: [
      { id: 'ST003', name: 'Michael Brown' },
      { id: 'ST004', name: 'Emily Davis' },
    ],
    submissionDate: '2023-10-14',
    status: 'Approved',
    matchScore: 92,
    description: 'A secure and transparent voting system using blockchain technology to ensure vote integrity and prevent fraud.',
    technicalRequirements: ['Solidity', 'Ethereum', 'React', 'Web3.js'],
    mlRecommendation: 'Approve',
    mlConfidence: 95,
    mlReasoning: 'Excellent match with team expertise. Project has clear objectives and technical feasibility.',
  },
  {
    id: 'PRJ003',
    title: 'IoT-Based Smart Agriculture System',
    domain: 'IoT',
    submittedBy: 'Team Gamma',
    teamMembers: [
      { id: 'ST005', name: 'David Wilson' },
      { id: 'ST006', name: 'Sarah Martinez' },
    ],
    submissionDate: '2023-10-13',
    status: 'Rejected',
    matchScore: 45,
    description: 'A system using IoT sensors to monitor soil moisture, temperature, and other parameters to optimize irrigation and crop management.',
    technicalRequirements: ['Arduino', 'Raspberry Pi', 'Python', 'MQTT', 'React Native'],
    mlRecommendation: 'Reject',
    mlConfidence: 78,
    mlReasoning: 'Team lacks experience with hardware components. Project scope is too broad for the given timeframe.',
  },
  {
    id: 'PRJ004',
    title: 'AR Navigation for Campus',
    domain: 'AR/VR',
    submittedBy: 'Team Delta',
    teamMembers: [
      { id: 'ST007', name: 'Robert Taylor' },
      { id: 'ST008', name: 'Jennifer Anderson' },
    ],
    submissionDate: '2023-10-12',
    status: 'Pending',
    matchScore: 72,
    description: 'An augmented reality application to help students and visitors navigate the university campus with interactive directions and information.',
    technicalRequirements: ['Unity', 'ARCore', 'ARKit', 'C#', 'Geolocation'],
    mlRecommendation: 'Consider with Revisions',
    mlConfidence: 65,
    mlReasoning: 'Team has some AR experience but project scope may need to be reduced. Suggest focusing on specific buildings rather than entire campus.',
  },
  {
    id: 'PRJ005',
    title: 'Sentiment Analysis for Student Feedback',
    domain: 'NLP',
    submittedBy: 'Team Epsilon',
    teamMembers: [
      { id: 'ST009', name: 'Thomas Clark' },
      { id: 'ST010', name: 'Lisa Rodriguez' },
    ],
    submissionDate: '2023-10-11',
    status: 'Approved',
    matchScore: 94,
    description: 'A natural language processing system to analyze student feedback and identify patterns and sentiments to improve course delivery.',
    technicalRequirements: ['Python', 'NLTK', 'SpaCy', 'Transformers', 'Flask'],
    mlRecommendation: 'Approve',
    mlConfidence: 97,
    mlReasoning: 'Perfect match with team skills and department focus. Project has clear methodology and evaluation metrics.',
  },
];

// Mock allocation statistics
const allocationStats = {
  totalProjects: 42,
  approved: 28,
  rejected: 8,
  pending: 6,
  domainDistribution: [
    { domain: 'AI/ML', count: 15 },
    { domain: 'Web Development', count: 10 },
    { domain: 'Mobile Apps', count: 8 },
    { domain: 'IoT', count: 5 },
    { domain: 'Blockchain', count: 4 },
  ],
  averageMatchScore: 78,
};

// Status color mapping
const getStatusColor = (status: string) => {
  const colors = {
    Approved: 'bg-green-500',
    Rejected: 'bg-red-500',
    Pending: 'bg-yellow-500',
  };
  return colors[status as keyof typeof colors] || 'bg-gray-500';
};

// Match score color mapping
const getMatchScoreColor = (score: number) => {
  if (score >= 85) return 'text-green-600';
  if (score >= 70) return 'text-blue-600';
  if (score >= 50) return 'text-yellow-600';
  return 'text-red-600';
};

// ML recommendation icon mapping
const getRecommendationIcon = (recommendation: string) => {
  if (recommendation === 'Approve') return <CheckCircle className="h-5 w-5 text-green-500" />;
  if (recommendation === 'Reject') return <XCircle className="h-5 w-5 text-red-500" />;
  return <AlertCircle className="h-5 w-5 text-yellow-500" />;
};

export default function TeacherDashboardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [domainFilter, setDomainFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  // Filtered projects based on search and filters
  const filteredProjects = projectSubmissions.filter(project => {
    const matchesSearch = 
      searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.submittedBy.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'All' || 
      project.status === statusFilter;
    
    const matchesDomain = 
      domainFilter === 'All' || 
      project.domain === domainFilter;
    
    return matchesSearch && matchesStatus && matchesDomain;
  });

  // Get unique domains for filter
  const domains = ['All', ...Array.from(projectSubmissions.map(p => p.domain))];

  // Handle project approval
  const handleApproveProject = (projectId: string) => {
    // In a real app, this would make an API call
    console.log(`Approving project ${projectId}`);
    // Update local state for demo purposes
    const updatedProjects = projectSubmissions.map(p => 
      p.id === projectId ? { ...p, status: 'Approved' } : p
    );
    // Close dialog
    setSelectedProject(null);
  };

  // Handle project rejection
  const handleRejectProject = (projectId: string) => {
    // In a real app, this would make an API call
    console.log(`Rejecting project ${projectId}`);
    // Update local state for demo purposes
    const updatedProjects = projectSubmissions.map(p => 
      p.id === projectId ? { ...p, status: 'Rejected' } : p
    );
    // Close dialog
    setSelectedProject(null);
  };

  // Handle logout
  const handleLogout = () => {
    // In a real app, this would clear auth tokens/session
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md h-screen p-4 fixed">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 rounded-full bg-blue-600"></div>
            <h1 className="text-xl font-bold">Project Allocator</h1>
          </div>
          
          <div className="space-y-1">
            <Link href="/teacher/dashboard" passHref>
              <Button variant="ghost" className="w-full justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/teacher/projects" passHref>
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Project Submissions
              </Button>
            </Link>
            <Link href="/teacher/students" passHref>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Student Groups
              </Button>
            </Link>
            <Link href="/teacher/analytics" passHref>
              <Button variant="ghost" className="w-full justify-start">
                <BarChart2 className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </Link>
            <Link href="/teacher/messages" passHref>
              <Button variant="ghost" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
              </Button>
            </Link>
            <Link href="/teacher/settings" passHref>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
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
                    <AvatarImage src="/avatars/teacher.png" alt={teacherProfile.name} />
                    <AvatarFallback>{teacherProfile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{teacherProfile.name}</p>
                    <p className="text-xs text-gray-500">{teacherProfile.position}</p>
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
              <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg font-medium text-gray-500">Total Projects</h3>
                    <p className="text-3xl font-bold">{allocationStats.totalProjects}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg font-medium text-gray-500">Approved</h3>
                    <p className="text-3xl font-bold text-green-600">{allocationStats.approved}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg font-medium text-gray-500">Rejected</h3>
                    <p className="text-3xl font-bold text-red-600">{allocationStats.rejected}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg font-medium text-gray-500">Pending</h3>
                    <p className="text-3xl font-bold text-yellow-600">{allocationStats.pending}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Dashboard Tabs */}
            <Tabs defaultValue="submissions">
              <TabsList className="mb-4">
                <TabsTrigger value="submissions">Project Submissions</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="students">Student Groups</TabsTrigger>
              </TabsList>
              
              {/* Project Submissions Tab */}
              <TabsContent value="submissions">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Project Submissions</CardTitle>
                      <CardDescription>Review and approve student project proposals</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Input 
                        placeholder="Search projects..." 
                        className="w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>                          <SelectItem value="All">All Status</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Approved">Approved</SelectItem>
                          <SelectItem value="Rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={domainFilter} onValueChange={setDomainFilter}>
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Domain" />
                        </SelectTrigger>
                        <SelectContent>
                          {domains.map(domain => (
                            <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Project Title</TableHead>
                          <TableHead>Domain</TableHead>
                          <TableHead>Team</TableHead>
                          <TableHead>Submission Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Match Score</TableHead>
                          <TableHead>ML Recommendation</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProjects.map((project) => (
                          <TableRow key={project.id}>
                            <TableCell className="font-medium">{project.title}</TableCell>
                            <TableCell>{project.domain}</TableCell>
                            <TableCell>{project.submittedBy}</TableCell>
                            <TableCell>{project.submissionDate}</TableCell>
                            <TableCell>
                              <Badge
                                className={`${getStatusColor(project.status)} text-white`}
                              >
                                {project.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className={`font-semibold ${getMatchScoreColor(project.matchScore)}`}>
                                {project.matchScore}%
                              </span>
                            </TableCell>
                            <TableCell className="flex items-center space-x-1">
                              {getRecommendationIcon(project.mlRecommendation)}
                              <span>{project.mlRecommendation}</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedProject(project)}
                                >
                                  View Details
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
              
              {/* Analytics Tab */}
              <TabsContent value="analytics">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Domain Distribution</CardTitle>
                      <CardDescription>Projects by domain area</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {allocationStats.domainDistribution.map((item) => (
                          <div key={item.domain} className="space-y-2">
                            <div className="flex justify-between">
                              <span>{item.domain}</span>
                              <span className="font-medium">{item.count} projects</span>
                            </div>
                            <Progress 
                              value={(item.count / allocationStats.totalProjects) * 100} 
                              className="h-2"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Allocation Status</CardTitle>
                      <CardDescription>Overview of project approvals</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center space-y-6">
                        <div className="w-48 h-48 rounded-full border-8 border-blue-100 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600">
                              {Math.round((allocationStats.approved / allocationStats.totalProjects) * 100)}%
                            </div>
                            <div className="text-sm text-gray-500">Approval Rate</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 w-full gap-4 text-center">
                          <div className="p-4 bg-green-50 rounded-lg">
                            <div className="text-xl font-bold text-green-600">{allocationStats.approved}</div>
                            <div className="text-sm text-gray-500">Approved</div>
                          </div>
                          <div className="p-4 bg-red-50 rounded-lg">
                            <div className="text-xl font-bold text-red-600">{allocationStats.rejected}</div>
                            <div className="text-sm text-gray-500">Rejected</div>
                          </div>
                          <div className="p-4 bg-yellow-50 rounded-lg">
                            <div className="text-xl font-bold text-yellow-600">{allocationStats.pending}</div>
                            <div className="text-sm text-gray-500">Pending</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Match Score Distribution</CardTitle>
                      <CardDescription>Project match scores based on ML algorithm</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 flex items-end space-x-2">
                        {[
                          { range: '90-100', count: 12, color: 'bg-green-500' },
                          { range: '80-89', count: 18, color: 'bg-green-400' },
                          { range: '70-79', count: 8, color: 'bg-blue-500' },
                          { range: '60-69', count: 5, color: 'bg-blue-400' },
                          { range: '50-59', count: 3, color: 'bg-yellow-500' },
                          { range: '0-49', count: 2, color: 'bg-red-500' },
                        ].map((bar) => (
                          <div key={bar.range} className="flex flex-col items-center flex-1">
                            <div 
                              className={`${bar.color} w-full rounded-t-md`} 
                              style={{ height: `${(bar.count / 20) * 100}%` }}
                            ></div>
                            <div className="text-xs mt-2">{bar.range}</div>
                            <div className="text-sm font-medium">{bar.count}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Student Groups Tab */}
              <TabsContent value="students">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Groups</CardTitle>
                    <CardDescription>Teams formed for project allocation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {projectSubmissions.map((project) => (
                        <Card key={project.id} className="overflow-hidden">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg">{project.submittedBy}</CardTitle>
                              <Badge
                                className={`${getStatusColor(project.status)} text-white`}
                              >
                                {project.status}
                              </Badge>
                            </div>
                            <CardDescription>{project.title}</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="space-y-2">
                              <div>
                                <h4 className="text-sm font-medium mb-1">Team Members:</h4>
                                <div className="space-y-1">
                                  {project.teamMembers.map((member) => (
                                    <div key={member.id} className="flex items-center space-x-2">
                                      <Avatar className="h-6 w-6">
                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <span className="text-sm">{member.name}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Domain:</h4>
                                <Badge variant="outline">{project.domain}</Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Match Score:</span>
                                <span className={`font-semibold ${getMatchScoreColor(project.matchScore)}`}>
                                  {project.matchScore}%
                                </span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-2">
                            <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={() => setSelectedProject(project)}
                            >
                              View Details
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Project Details Dialog */}
      {selectedProject && (
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedProject.title}</DialogTitle>
              <DialogDescription>
                Submitted by {selectedProject.submittedBy} on {selectedProject.submissionDate}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="col-span-2 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Project Description</h3>
                  <p className="mt-1">{selectedProject.description}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Technical Requirements</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedProject.technicalRequirements.map((tech: string) => (
                      <Badge key={tech} variant="outline">{tech}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Team Members</h3>
                  <div className="mt-1 space-y-2">
                    {selectedProject.teamMembers.map((member: any) => (
                      <div key={member.id} className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.id}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 border-l pl-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <Badge
                    className={`${getStatusColor(selectedProject.status)} text-white mt-1`}
                  >
                    {selectedProject.status}
                  </Badge>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Match Score</h3>
                  <div className="mt-1">
                    <span className={`text-xl font-bold ${getMatchScoreColor(selectedProject.matchScore)}`}>
                      {selectedProject.matchScore}%
                    </span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">ML Recommendation</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    {getRecommendationIcon(selectedProject.mlRecommendation)}
                    <span className="font-medium">{selectedProject.mlRecommendation}</span>
                    <span className="text-sm text-gray-500">
                      ({selectedProject.mlConfidence}% confidence)
                    </span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">ML Reasoning</h3>
                  <p className="mt-1 text-sm">{selectedProject.mlReasoning}</p>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Decision</h3>
                  {selectedProject.status === 'Pending' ? (
                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1" 
                        onClick={() => handleApproveProject(selectedProject.id)}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1" 
                        onClick={() => handleRejectProject(selectedProject.id)}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-2 border rounded-md">
                      <p className="text-gray-500">
                        This project has already been {selectedProject.status.toLowerCase()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedProject(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}