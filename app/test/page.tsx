"use client";

import { useEffect, useRef, useState } from "react";

function Test() {
  const refUsername = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    refUsername.current?.focus();
  }, []);

  return (
    <div className="p-6">
      <input
        ref={refUsername}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div>username: {username}</div>
    </div>
  );
}

export default Test;
