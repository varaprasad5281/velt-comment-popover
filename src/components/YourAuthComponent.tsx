"use client";

import { useIdentify } from "@veltdev/react";

export default function YourAuthComponent() {
  const userService = () => ({
    uid: "123",
    organizationId: "org-123",
    displayName: "Bob",
    email: "bob@gmail.com",
    photoURL: "https://i.pravatar.cc/300",
    color: "#FF5733",
    textColor: "#FFFFFF",
  });

  const yourAuthenticatedUser = userService();

  const { uid, displayName, email, photoURL, organizationId, color } = yourAuthenticatedUser;

  const user = {
    userId: uid,
    organizationId,
    name: displayName,
    email,
    photoUrl: photoURL,
    color,
  };

  useIdentify(user); 
  return null; 
}
