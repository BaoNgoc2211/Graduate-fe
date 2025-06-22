// const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
//   return <div className="">{children}</div>;
// };

// export default AuthLayout;
// app/auth/layout.tsx
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>; // hoặc <div>{children}</div> cũng được
};

export default AuthLayout;

// export default function AuthLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return <>{children}</>; // chỉ wrap chứ không tạo html/body mới
// }
