
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
          Project Allocation System
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Intelligent project allocation for students, teachers, and administrators
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="text-center">
            <div className="mx-auto bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <GraduationCap className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle>Student Portal</CardTitle>
            <CardDescription>For students to select and manage projects</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">
              Submit project preferences, form groups, and track your project status
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/login" passHref>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Student Login
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="text-center">
            <div className="mx-auto bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle>Teacher Portal</CardTitle>
            <CardDescription>For faculty to review and approve projects</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">
              Review project submissions, provide feedback, and manage student groups
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/teacher/login" passHref>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Teacher Login
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="text-center">
            <div className="mx-auto bg-red-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle>Admin Portal</CardTitle>
            <CardDescription>For system administrators</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">
              Manage users, configure system settings, and monitor system health
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/admin/login" passHref>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Admin Login
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-16 text-center text-gray-500 text-sm">
        <p>© 2023 Project Allocation System. All rights reserved.</p>
      </div>
    </div>
  );
}