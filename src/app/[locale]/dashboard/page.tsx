"use client";

import { Dashboard } from '@/components/views/dashboard';
import React from 'react';

export const runtime = 'edge';

const Page: React.FC = () => {
  return <div className="w-full h-full mx-10 pt-[50px]">
    <Dashboard />
  </div>
};

export default Page