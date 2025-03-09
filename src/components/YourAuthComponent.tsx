"use client";

import { useIdentify } from "@veltdev/react";
import { JSX, useEffect, useState } from "react";

// Define TypeScript interfaces
interface VeltUser {
  userId: string;
  organizationId: string;
  name: string;
  email: string;
  photoUrl: string;
  color: string;
  textColor?: string;
}

function generateRandomName(): string {
  const names: string[] =["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Henry", "Isabel", "Jack", "Kate", "Leo", "Maya", "Noah", "Olivia", "Paul", "Quinn", "Ryan", "Sophia", "Tyler", "Uma", "Victor", "Wendy", "Xavier", "Yasmine", "Zach", "Amelia", "Benjamin", "Chloe", "Daniel", "Emma", "Felix", "Gabriella", "Hugo", "Ivy", "James", "Kylie", "Liam", "Madison", "Nathan", "Oscar", "Penny", "Quentin", "Rebecca", "Samuel", "Tara", "Ulysses", "Violet", "William", "Xander", "Yvonne", "Zoe"];
  return names[Math.floor(Math.random() * names.length)];
}

export default function YourAuthComponent(): JSX.Element | null {
  // Initialize state with null, but specify the type
  const [user, setUser] = useState<VeltUser | null>(null);
  
  // Generate a random user when the component mounts
  useEffect(() => {
    const randomUser: VeltUser = {
      userId: Math.random().toString(36).substr(2, 9),
      organizationId: "org-123",
      name: generateRandomName(),
      email: "user@example.com",
      photoUrl: "https://i.pravatar.cc/300",
      color: "#FF5733",
      textColor: "#FFFFFF",
    };
    
    // Store in localStorage to persist across page refreshes (but not across browsers)
    localStorage.setItem('veltUser', JSON.stringify(randomUser));
    
    // Set the user in state
    setUser(randomUser);
    
    // This will ensure a different identity in each browser
    console.log(`User identified as: ${randomUser.name} with ID: ${randomUser.userId}`);
  }, []);
  
  // We only pass the user to useIdentify when it's available
  // The userForIdentify variable is necessary because useIdentify can't accept null
  const userForIdentify = user;
  useIdentify(userForIdentify);
  
  return null;
}

// Optional utility functions you can export from a separate file
export const getStoredUser = (): VeltUser | null => {
  try {
    const storedUser = localStorage.getItem('veltUser');
    if (storedUser) {
      return JSON.parse(storedUser) as VeltUser;
    }
  } catch (error) {
    console.error("Error retrieving stored user:", error);
  }
  return null;
};

export const clearStoredUser = (): void => {
  localStorage.removeItem('veltUser');
};

// You can add this function to a button component if you want to manually change identity
export const regenerateUser = (): VeltUser => {
  const randomUser: VeltUser = {
    userId: Math.random().toString(36).substr(2, 9),
    organizationId: "org-123",
    name: generateRandomName(),
    email: "user@example.com",
    photoUrl: "https://i.pravatar.cc/300",
    color: "#FF5733",
    textColor: "#FFFFFF",
  };
  
  localStorage.setItem('veltUser', JSON.stringify(randomUser));
  return randomUser;
};