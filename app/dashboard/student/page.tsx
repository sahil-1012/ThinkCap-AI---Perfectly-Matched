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
import { Group, Project, Student } from '../../types';
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
  Users 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import Image from 'next/image';

// Hardcoded data
const defaultGroupData: Group = {
  id: '1',
  name: 'Tech Innovators',
  members: [
    {
      id: 'ST001',
      name: 'John Doe',
      panel: 'Panel A',
      roll: 1,
      domains: ['Web Development', 'AI/ML'],
    },
    {
      id: 'ST002',
      name: 'Jane Smith',
      panel: 'Panel A',
      roll: 2,
      domains: ['Mobile Development', 'Cloud Computing'],
    },
  ],
};

const projectsData: Project[] = [
  {
    id: '1',
    name: 'AI-Powered Learning Platform',
    domain: 'AI/ML',
    status: 'Approved',
    reviews: {
      review1: 'Completed',
      review2: 'Completed',
      review3: 'In-progress',
    },
  },
  {
    id: '2',
    name: 'Smart IoT Home System',
    domain: 'IoT',
    status: 'Rejected',
    reviews: {
      review1: '-',
      review2: '-',
      review3: '-',
    },
  },
  {
    id: '3',
    name: 'Blockchain-Based Voting System',
    domain: 'Blockchain',
    status: 'Rejected',
    reviews: {
      review1: '-',
      review2: '-',
      review3: '-',
    },
  },
];

const recommendedProjects = [
  {
    id: '4',
    name: 'Natural Language Processing for Academic Papers',
    domain: 'AI/ML',
    faculty: 'Dr. Sarah Johnson',
    matchScore: 95,
    reason: 'Matches your AI/ML expertise and academic interests',
  },
  {
    id: '5',
    name: 'Cloud-Based Healthcare System',
    domain: 'Cloud Computing',
    faculty: 'Prof. Michael Chen',
    matchScore: 87,
    reason: 'Aligns with your cloud computing skills',
  },
  {
    id: '6',
    name: 'Progressive Web App Framework',
    domain: 'Web Development',
    faculty: 'Dr. Lisa Wong',
    matchScore: 82,
    reason: 'Matches your web development background',
  },
];

const upcomingDeadlines = [
  {
    id: '1',
    title: 'Project Preference Submission',
    date: '2023-11-15',
    daysLeft: 5,
  },
  {
    id: '2',
    title: 'First Review Preparation',
    date: '2023-12-01',
    daysLeft: 21,
  },
  {
    id: '3',
    title: 'Progress Report Submission',
    date: '2023-12-15',
    daysLeft: 35,
  },
];

// Default student profile (fallback)
const defaultStudentProfile = {
  id: 'ST001',
  name: 'John Doe',
  email: 'john.doe@university.edu',
  department: 'Computer Science',
  year: 4,
  gpa: 3.8,
  skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'TensorFlow'],
  domainInterests: ['AI/ML', 'Web Development', 'Cloud Computing'],
  completedAllocation: false,
};

const getStatusColor = (status: string) => {
  const colors = {
    Approved: 'bg-green-500',
    Rejected: 'bg-red-500',
    Pending: 'bg-yellow-500',
    Completed: 'bg-green-500',
    'In-progress': 'bg-blue-500',
    pending: 'bg-yellow-500',
    '-': 'bg-gray-300',
  };
  return colors[status as keyof typeof colors] || 'bg-gray-500';
};

const getMatchScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-600';
  if (score >= 75) return 'text-blue-600';
  if (score >= 60) return 'text-yellow-600';
  return 'text-gray-600';
};

export default function DashboardPage() {
  const [projectPreferences, setProjectPreferences] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [studentProfile, setStudentProfile] = useState(defaultStudentProfile);
  const [groupData, setGroupData] = useState(defaultGroupData);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const loadUserData = () => {
      try {
        setIsLoading(true);
        const userData = localStorage.getItem('userData');
        
        if (userData) {
          const parsedData = JSON.parse(userData);
          
          // Update student profile with user data
          setStudentProfile(prev => ({
            ...prev,
            name: parsedData.name || prev.name,
            email: parsedData.email || prev.email,
            department: parsedData.department || prev.department,
            year: parsedData.year || prev.year,
          }));
          
          // Update group data if available
          if (parsedData.group) {
            setGroupData({
              id: '1', // Generate a proper ID in a real app
              name: parsedData.group.name,
              members: parsedData.group.members.map((member: any, index: number) => ({
                id: `ST${index + 1}`.padStart(5, '0'),
                name: member.name,
                panel: 'Panel A', // Default panel
                roll: parseInt(member.roll) || index + 1,
                domains: ['Web Development', 'AI/ML'], // Default domains
              })),
            });
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const addToPreferences = (projectId: string) => {
    if (!projectPreferences.includes(projectId)) {
      setProjectPreferences([...projectPreferences, projectId]);
    }
  };

  const removeFromPreferences = (projectId: string) => {
    setProjectPreferences(projectPreferences.filter(id => id !== projectId));
  };

  // Show loading state while fetching user data
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

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
            <Link href="/dashboard" passHref>
              <Button variant="ghost" className="w-full justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/projects" passHref>
              <Button variant="ghost" className="w-full justify-start">
                <Search className="mr-2 h-4 w-4" />
                Explore Projects
              </Button>
            </Link>
            <Link href="/preferences" passHref>
              <Button variant="ghost" className="w-full justify-start">
                <Star className="mr-2 h-4 w-4" />
                My Preferences
              </Button>
            </Link>
            <Link href="/group" passHref>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                My Group
              </Button>
            </Link>
            <Link href="/messages" passHref>
              <Button variant="ghost" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
              </Button>
            </Link>
            <Link href="/timeline" passHref>
              <Button variant="ghost" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Timeline
              </Button>
            </Link>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/avatars/01.png" alt={studentProfile.name} />
                    <AvatarFallback>{studentProfile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{studentProfile.name}</p>
                    <p className="text-xs text-gray-500">{studentProfile.department}</p>
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
              <h1 className="text-2xl font-bold">Student Dashboard</h1>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
            
            {/* Allocation Status Card */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Project Allocation Status</h2>
                    <p className="text-gray-600 mb-4">
                      {studentProfile.completedAllocation 
                        ? "Your project has been allocated successfully!" 
                        : "Complete your project preferences to get allocated"}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Progress value={projectPreferences.length ? 60 : 20} className="w-64" />
                      <span className="text-sm text-gray-500">
                        {projectPreferences.length ? "60%" : "20%"} Complete
                      </span>
                    </div>
                  </div>
                  <Button>
                    {studentProfile.completedAllocation 
                      ? "View Allocation" 
                      : "Complete Preferences"}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Main Dashboard Tabs */}
            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                <TabsTrigger value="group">Group</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Profile Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>My Profile</CardTitle>
                      <CardDescription>Your academic profile and skills</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src="/avatars/01.png" alt={studentProfile.name} />
                            <AvatarFallback>{studentProfile.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-lg">{studentProfile.name}</h3>
                            <p className="text-gray-500">{studentProfile.email}</p>
                            <p className="text-gray-500">{studentProfile.department}, Year {studentProfile.year}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {studentProfile.skills.map(skill => (
                              <Badge key={skill} variant="secondary">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Domain Interests</h4>
                          <div className="flex flex-wrap gap-2">
                            {studentProfile.domainInterests.map(domain => (
                              <Badge key={domain} variant="outline" className="bg-blue-50">{domain}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">Edit Profile</Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Deadlines Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Deadlines</CardTitle>
                      <CardDescription>Important dates to remember</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingDeadlines.map(deadline => (
                          <div key={deadline.id} className="flex justify-between items-center p-3 rounded-lg border">
                            <div>
                              <h4 className="font-medium">{deadline.title}</h4>
                              <p className="text-sm text-gray-500">{deadline.date}</p>
                            </div>
                            <Badge variant={deadline.daysLeft < 7 ? "destructive" : "outline"}>
                              {deadline.daysLeft} days left
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full">View All Deadlines</Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Project Preferences Card */}
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>My Project Preferences</CardTitle>
                      <CardDescription>Projects you've selected in order of preference</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {projectPreferences.length > 0 ? (
                        <div className="space-y-3">
                          {projectPreferences.map((projectId, index) => {
                            const project = [...projectsData, ...recommendedProjects].find(p => p.id === projectId);
                            return project ? (
                              <div key={project.id} className="flex justify-between items-center p-3 rounded-lg border">
                                <div className="flex items-center">
                                  <Badge className="mr-3">{index + 1}</Badge>
                                  <div>
                                    <h4 className="font-medium">{project.name}</h4>
                                    <p className="text-sm text-gray-500">{project.domain}</p>
                                  </div>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => removeFromPreferences(project.id)}
                                >
                                  Remove
                                </Button>
                              </div>
                            ) : null;
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <p>You haven't added any project preferences yet.</p>
                          <p className="mt-2">Explore recommended projects and add them to your preferences.</p>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Reset Preferences</Button>
                      <Button disabled={projectPreferences.length === 0}>Submit Preferences</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Projects Tab */}
              <TabsContent value="projects">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Projects</CardTitle>
                      <CardDescription>Your project status and reviews</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Input 
                        placeholder="Search projects..." 
                        className="w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button>Add Project</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Project Name</TableHead>
                          <TableHead>Domain</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Review 1</TableHead>
                          <TableHead>Review 2</TableHead>
                          <TableHead>Review 3</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projectsData
                          .filter(project => 
                            searchQuery === '' || 
                            project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            project.domain.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((project) => (
                          <TableRow key={project.id}>
                            <TableCell className="font-medium">{project.name}</TableCell>
                            <TableCell>{project.domain}</TableCell>
                            <TableCell>
                              <Badge
                                className={`${getStatusColor(project.status)} text-white`}
                              >
                                {project.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={`${getStatusColor(
                                  project.reviews.review1
                                )} text-white`}
                              >
                                {project.reviews.review1}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={`${getStatusColor(
                                  project.reviews.review2
                                )} text-white`}
                              >
                                {project.reviews.review2}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={`${getStatusColor(
                                  project.reviews.review3
                                )} text-white`}
                              >
                                {project.reviews.review3}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                                {!projectPreferences.includes(project.id) ? (
                                  <Button 
                                    variant="secondary" 
                                    size="sm"
                                    onClick={() => addToPreferences(project.id)}
                                  >
                                    Add to Preferences
                                  </Button>
                                ) : (
                                  <Button
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => removeFromPreferences(project.id)}
                                >
                                  Remove
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
            
            {/* Recommendations Tab */}
            <TabsContent value="recommendations">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Projects</CardTitle>
                  <CardDescription>
                    AI-powered project recommendations based on your profile and interests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recommendedProjects.map(project => (
                      <Card key={project.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          <CardDescription>{project.domain}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Faculty:</span>
                              <span>{project.faculty}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Match Score:</span>
                              <span className={`font-semibold ${getMatchScoreColor(project.matchScore)}`}>
                                {project.matchScore}%
                              </span>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">Why it's recommended:</span>
                              <p className="text-sm mt-1">{project.reason}</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-2">
                          {!projectPreferences.includes(project.id) ? (
                            <Button 
                              className="w-full" 
                              onClick={() => addToPreferences(project.id)}
                            >
                              Add to Preferences
                            </Button>
                          ) : (
                            <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={() => removeFromPreferences(project.id)}
                            >
                              Remove from Preferences
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline">Refresh Recommendations</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Group Tab */}
            <TabsContent value="group">
              <Card>
                <CardHeader>
                  <CardTitle>Group Members</CardTitle>
                  <CardDescription>Your project team members</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {groupData.members.map((member) => (
                      <Card key={member.id}>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center space-x-3">
                                <Avatar>
                                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-medium">{member.name}</h3>
                                  <p className="text-sm text-gray-500">{member.id}</p>
                                </div>
                              </div>
                              <Badge>{member.panel}</Badge>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {member.domains.map((domain) => (
                                <Badge key={domain} variant="outline">
                                  {domain}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex justify-end mt-3">
                              <Button variant="ghost" size="sm">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Message
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Invite Member</Button>
                  <Button>Group Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Timeline Tab */}
            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle>Project Timeline</CardTitle>
                  <CardDescription>Important milestones and deadlines</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    
                    {upcomingDeadlines.map((deadline, index) => (
                      <div key={deadline.id} className="relative pl-10 pb-8">
                        <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                          <h3 className="font-medium">{deadline.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">Due: {deadline.date}</p>
                          <div className="mt-3 flex justify-between items-center">
                            <Badge variant={deadline.daysLeft < 7 ? "destructive" : "outline"}>
                              {deadline.daysLeft} days left
                            </Badge>
                            <Button variant="ghost" size="sm">
                              Set Reminder <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="relative pl-10 pb-8">
                      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center">
                        {upcomingDeadlines.length + 1}
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-dashed">
                        <h3 className="font-medium text-gray-500">Final Project Submission</h3>
                        <p className="text-sm text-gray-400 mt-1">Due: 2024-04-15</p>
                        <div className="mt-3">
                          <Badge variant="outline" className="text-gray-400">
                            145 days left
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Complete Timeline</Button>
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
