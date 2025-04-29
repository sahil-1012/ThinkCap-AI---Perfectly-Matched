'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { User, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'pass1012') {
      router.push('/dashboard/student');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h1>
          <p className="text-gray-600">
            Sign in to your student project portal
          </p>
        </div>

        <Card className="w-full shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
            <CardDescription>
              Enter your student ID and password to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Student ID"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                    <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Link 
                  href="/forgot-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full h-12">
                Sign in
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-2 text-muted-foreground">
                  New to the portal?
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push('/signup')}
            >
              Create an account
            </Button>
            <p className="text-sm text-gray-500">
              Not a student? <Link href="/login/teacher" className="text-primary hover:underline">Teacher login</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}