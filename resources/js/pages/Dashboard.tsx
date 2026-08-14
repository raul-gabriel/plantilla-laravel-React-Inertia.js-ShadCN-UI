import React from 'react';
import {
  WelcomeSection,
  StatsGrid,
  ActivitySection,
  QuickActions
} from '@/Components/Layouts/DashboardComponents';
import AdminLayout from '@/Layouts/AdminLayout';

const Dashboard: React.FC = () => {
  return (
    <>
      <AdminLayout>


      
        <WelcomeSection />
        <StatsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivitySection />
          <QuickActions />
        </div>
      </AdminLayout>

    </>
  );
};

export default Dashboard;