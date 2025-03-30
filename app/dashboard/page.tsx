'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Group, Project, Student } from '../types';

// Hardcoded data
const groupData: Group = {
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


const getStatusColor = (status: string) => {
  const colors = {
    Approved: 'bg-green-500',
    Rejected: 'bg-red-500',
    Pending: 'bg-yellow-500',
    Completed: 'bg-green-500',
    'In-progress': 'bg-blue-500',
    pending: 'bg-yellow-500',
  };
  return colors[status as keyof typeof colors] || 'bg-gray-500';
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
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
                        <div>
                          <h3 className="font-medium">{member.name}</h3>
                          <p className="text-sm text-gray-500">{member.id}</p>
                        </div>
                        <Badge>{member.panel}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {member.domains.map((domain) => (
                          <Badge key={domain} variant="outline">
                            {domain}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Your project status and reviews</CardDescription>
            </div>
            <Button>Add Project</Button>
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
                {projectsData.map((project) => (
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
                      <Button variant="outline" size="sm">
                        View Project
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}