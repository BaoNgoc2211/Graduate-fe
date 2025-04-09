// export async function login({ userId, password }: { userId: string; password: string }) {
//   const res = await fetch('http://localhost:3001/auth/login', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ userId, password }),
//   });

//   if (!res.ok) throw new Error('Login failed');
//   return await res.json();
// }
