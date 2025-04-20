'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, Users, BookOpen, GraduationCap, Hash, ArrowRight, Plus, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function GroupRegistrationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    department: '',
    year: '',
    rollNumber: '',
    createGroup: false,
    groupName: '',
  });

  const [groupMembers, setGroupMembers] = useState<{ name: string; email: string; roll: string }[]>([]);
  const [newMember, setNewMember] = useState({ name: '', email: '', roll: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, createGroup: checked }));
  };

  const handleNewMemberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMember(prev => ({ ...prev, [name]: value }));
  };

  const addGroupMember = () => {
    if (newMember.name && newMember.email && newMember.roll) {
      setGroupMembers(prev => [...prev, { ...newMember }]);
      setNewMember({ name: '', email: '', roll: '' });
    }
  };

  const removeGroupMember = (index: number) => {
    setGroupMembers(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create complete user profile
    const userProfile = {
      email,
      name: `${formData.firstName} ${formData.lastName}`,
      department: formData.department,
      year: parseInt(formData.year || '1'),
      rollNumber: formData.rollNumber,
      // Add default values for other fields
      skills: ['JavaScript', 'TypeScript', 'React'],
      domainInterests: ['Web Development', 'AI/ML'],
      completedAllocation: false,
      // Group information
      group: formData.createGroup ? {
        name: formData.groupName,
        members: [
          {
            name: `${formData.firstName} ${formData.lastName}`,
            email: email,
            roll: formData.rollNumber,
          },
          ...groupMembers
        ]
      } : null
    };
    
    // Store in localStorage
    localStorage.setItem('userData', JSON.stringify(userProfile));
    
    // Redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-primary/10 rounded-full">
              <User className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Complete Your Profile
          </h1>
          <p className="text-gray-600">
            Set up your account and create or join a project group
          </p>
        </div>

        <Card className="w-full shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Student Information</CardTitle>
            <CardDescription>
              This information will be used for project allocation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                  <div className="relative">
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  name="email"
                  value={email}
                  disabled
                  className="bg-gray-50"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="department" className="text-sm font-medium">Department</label>
                <div className="relative">
                  <Input
                    id="department"
                    name="department"
                    placeholder="e.g., Computer Science"
                    value={formData.department}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                  <BookOpen className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="year" className="text-sm font-medium">Year of Study</label>
                  <div className="relative">
                    <Select 
                      onValueChange={(value) => handleSelectChange('year', value)}
                      value={formData.year}
                    >
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">First Year</SelectItem>
                        <SelectItem value="2">Second Year</SelectItem>
                        <SelectItem value="3">Third Year</SelectItem>
                        <SelectItem value="4">Fourth Year</SelectItem>
                      </SelectContent>
                    </Select>
                    <GraduationCap className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 z-10" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="rollNumber" className="text-sm font-medium">Roll Number</label>
                  <div className="relative">
                    <Input
                      id="rollNumber"
                      name="rollNumber"
                      placeholder="e.g., CS2001"
                      value={formData.rollNumber}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                    <Hash className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-medium">Create a Project Group</h3>
                    <p className="text-sm text-gray-500">
                      Create a new group or join an existing one later
                    </p>
                  </div>
                  <Switch 
                    checked={formData.createGroup}
                    onCheckedChange={handleSwitchChange}
                  />
                </div>
                
                {formData.createGroup && (
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <label htmlFor="groupName" className="text-sm font-medium">Group Name</label>
                      <div className="relative">
                        <Input
                          id="groupName"
                          name="groupName"
                          placeholder="Enter a name for your group"
                          value={formData.groupName}
                          onChange={handleChange}
                          className="pl-10"
                          required={formData.createGroup}
                        />
                        <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-md font-medium">Add Group Members (Optional)</h4>
                      
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <Input
                            placeholder="Member Name"
                            name="name"
                            value={newMember.name}
                            onChange={handleNewMemberChange}
                          />
                        </div>
                        <div>
                          <Input
                            placeholder="Member Email"
                            name="email"
                            type="email"
                            value={newMember.email}
                            onChange={handleNewMemberChange}
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Roll Number"
                            name="roll"
                            value={newMember.roll}
                            onChange={handleNewMemberChange}
                          />
                          <Button 
                            type="button" 
                            size="icon" 
                            onClick={addGroupMember}
                            disabled={!newMember.name || !newMember.email || !newMember.roll}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {groupMembers.length > 0 && (
                        <div className="border rounded-md overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {groupMembers.map((member, index) => (
                                <tr key={index}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.email}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.roll}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      onClick={() => removeGroupMember(index)}
                                      className="text-red-600 hover:text-red-900"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <Button type="submit" className="w-full h-12 mt-6">
                Complete Setup & Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}