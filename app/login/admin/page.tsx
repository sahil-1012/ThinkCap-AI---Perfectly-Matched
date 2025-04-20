'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would validate admin credentials against a backend
    // For demo purposes, we'll just redirect to the admin dashboard
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-500/20 rounded-full">
              <ShieldAlert className="h-10 w-10 text-red-500" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Admin Portal
          </h1>
          <p className="text-gray-400">
            Sign in to access system administration
          </p>
        </div>

        <Card className="w-full shadow-xl border-0 bg-gray-800 text-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Administrator Login</CardTitle>
            <CardDescription className="text-gray-400">
              Secure access for system administrators only
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Admin email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-gray-700 border-gray-600 text-white"
                    required
                  />
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
                
                <div className="relative">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 bg-gray-700 border-gray-600 text-white"
                    required
                  />
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <Button type="submit" className="w-full h-12 bg-red-600 hover:bg-red-700">
                Secure Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="flex space-x-4 text-sm text-gray-400">
              <Link href="/teacher/login" className="hover:text-white">Teacher Login</Link>
              <span>•</span>
              <Link href="/login" className="hover:text-white">Student Login</Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}