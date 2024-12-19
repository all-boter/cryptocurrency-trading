"use client";

import { Dashboard } from '@/components/views/dashboard';
import React from 'react';

export const runtime = 'edge';

const Page: React.FC = () => {
  return <div className="w-full h-full pt-[50px]">
    dashboard test
    <Dashboard />
  </div>
};

export default Page