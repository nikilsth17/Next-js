"use client";

import Intro from "@/components/pageComponent/Intro";
import Sidebar from "@/components/pageComponent/Sidebar";
import React from "react";

function MainPage() {
    return (
        <>
            <div className="grid grid-cols-12 h-screen">
                <Sidebar />
                <Intro />
                
            </div>

        </>


    );
}

export default MainPage;
