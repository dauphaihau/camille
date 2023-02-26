'use client'

import React from "react";
import { Button, Icons, Row } from "core/components";
import { DashboardNav } from "./sidebar/nav";
import { dashboardConfig } from "../../config/dashboard";

export default function DashboardSidebar() {
    return (
      <aside className="w-[330px] flex-col md:flex p-4 bg-[#fafafa] h-screen space-y-4">
        {/*<Row align='center' gap={2}>*/}
        {/*  <div className='avatar bg-[#e9e9e8] px-2 rounded text-[#777572]'>*/}
        {/*    J*/}
        {/*  </div>*/}
        {/*  <p>John</p>*/}
        {/*</Row>*/}
        {/*<p>Search</p>*/}
        {/*<p>Settings</p>*/}
        {/*<DashboardNav items={dashboardConfig.sidebarNav}/>*/}
      </aside>
    );
}
